/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe,
} from '@stripe/react-stripe-js';
import emailJs, { init } from 'emailjs-com';
import {
  StripeCardCvcElementChangeEvent,
  StripeCardExpiryElementChangeEvent, StripeCardNumberElementChangeEvent,
} from '@stripe/stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import SuccessfulPayment from './SuccessfulPayment';
import { ReducerState } from '../../Redux/reducers';
import { ConfirmationFormState } from '../../Redux/reducers/ConfirmationFormReducer';
import { get, post } from '../../Helpers/Requests';
import ErrorModal from '../Modals/ErrorModal';
import { _setModalsDisplay } from '../../Redux/actions';
import { AvailabilityReducerState } from '../../Redux/reducers/AvailabilityReducer';
import { _formatDate } from '../../Helpers/Date';

interface CheckoutFormProps {
  back: () => void;
}
init('user_NZ9AngoKPS2Lb7NFOpI8I');
const CheckoutForm = ({ back }: CheckoutFormProps) => {
  const { service, name, email } = useSelector((state: ReducerState):ConfirmationFormState => state.confirmForm);
  const { stylist, selectedDate } = useSelector((state: ReducerState):AvailabilityReducerState => state.availability);
  const stripe = useStripe();
  const elements = useElements();
  const [succeeded, setSucceeded] = useState<boolean>(false);
  const [errorOccurred, setError] = useState<string>('');
  const [processing, setProcessing] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [clientSecret, setClientSecret] = useState<string>('');
  const [ready, setReady] = useState<boolean>(false);
  const [intentId, setIntentId] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const url = 'payments/create_payment_intent';
    if (!ready) {
      post({
        url,
        body: { items: [{ id: service }], email },
      }).then((data) => {
        setClientSecret(data.clientSecret);
        setIntentId(data.intentId);
      });
      setReady(true);
    }
  }, []);

  // eslint-disable-next-line max-len
  const handleChange = async (event: StripeCardNumberElementChangeEvent|StripeCardCvcElementChangeEvent|StripeCardExpiryElementChangeEvent) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setProcessing(true);
    // check if client exists
    const existingClient = await get({ url: `clients/getClient/${email}` });
    // if client exists, set stripe id - else create client and set stripe id
    let stripeId = '';
    let clientId = '';
    if (!existingClient.error) {
      stripeId = existingClient.stripeId;
      clientId = existingClient.client?._id;
    } else {
      const newClient = await post({
        url: 'clients/newClient',
        body: {
          name,
          email,
        },
      });
      stripeId = newClient.stripeId;
      clientId = newClient.client?._id;
    }

    // update payment intent with stripe id as this wasn't available in the use effect
    await post({
      url: 'payments/update_payment_intent',
      body: {
        customer: stripeId,
        intentId,
      },
    });

    // get card from form and trigger error if not available
    const card = elements?.getElement(CardNumberElement);
    if (!card) {
      setError('Card not declared');
      setProcessing(false);
      return;
    }
    // confirm the card payment
    const payload = await stripe?.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
      },
    });
    // error handling
    if (!payload) {
      setError('Payment failed');
      setProcessing(false);
    } else if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
      dispatch(_setModalsDisplay({ display: true, type: 'payment' }));
    } else {
      // if successful complete the journey and set succeeded to true to show banner
      const id = payload.paymentIntent ? payload.paymentIntent.id : '';
      setError('');
      const body = {
        clientId,
        stylistId: stylist?._id,
        date: selectedDate,
        serviceId: service,
      };
      const newBooking = await post({
        url: 'bookings/newBooking',
        body,
      });
      if (newBooking.error) {
        setError(`Failed to create Booking: ${newBooking.message}`);
        setProcessing(false);
        return;
      }
      if (selectedDate) {
        // check to make sure I dont go over free plan of email service used (since demo account, I haven't integrated
        // any actual email service, just using front-end library
        const bookingsCreatedThisMonth = await get({
          url: `bookings/bookingsCreatedThisMonth/${new Date().getMonth()}`,
        });
        if (bookingsCreatedThisMonth.bookings?.length >= 125) {
          setEmailError(true);
          setProcessing(false);
          return;
        }
        const emailBody = `Thank you for your booking.\nWe will see you on ${_formatDate({ date: selectedDate })}!`;
        await emailJs.send('gmail', 'template_one', {
          email_body: emailBody,
          subject: 'Booking Confirmation @ Shigs Salon',
          from_email: 'stephen.higgins1995@gmail.com',
          recipient_email: email,
        });
      }
      setProcessing(false);
      setSucceeded(true);
    }
  };

  const elementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: 'rgb(255, 166, 202)',
        '::placeholder': {
          color: 'rgba(255, 166, 202, 0.5)',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };
  return (
    <form onSubmit={handleSubmit} id="payment_page">
      <div className="title">
        <h1>Client Information</h1>
      </div>
      <div className="default_number">
        <div>
          <p>Default Card Number For Testing:</p>
          <p style={{ marginLeft: 20 }}>4242 4242 4242 4242</p>
        </div>
        <div>
          <p>Default CSV For Testing:</p>
          <p style={{ marginLeft: 20 }}>123</p>
        </div>
        <div>
          <p>Default Expiry For Testing:</p>
          <p style={{ marginLeft: 20 }}>12/25</p>
        </div>
      </div>
      <div className="elements">
        <div className="element el0">
          <p>Card Number</p>
          <CardNumberElement
            className="card_element"
            options={elementOptions}
            onChange={handleChange}
            onReady={(element) => {
              element.focus();
              // setReady(true);
            }}
          />
        </div>
        <div className="element el1">
          <p>Expiry Date</p>
          <CardExpiryElement
            className="card_expiry"
            options={elementOptions}
            onChange={handleChange}
          />
        </div>
        <div className="element el2">
          <p>Security Code</p>
          <CardCvcElement
            className="card_security"
            options={elementOptions}
            onChange={handleChange}
            // onReady={() => setReady(true)}
          />
        </div>
      </div>
      <div className="footer">
        <button type="button" onClick={back}>Back</button>
        <button type="button" onClick={handleSubmit}>Submit</button>
      </div>
      <ErrorModal message={errorOccurred} display={errorOccurred !== '' && !emailError} />
      {
        (succeeded || emailError) && (
        <SuccessfulPayment display={succeeded} emailError={emailError} />
        )
}
    </form>
  );
};
export default CheckoutForm;
