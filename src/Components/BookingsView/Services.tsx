import React from 'react';
import { useSelector } from 'react-redux';
import { ReducerState } from '../../Redux/reducers';
import { AvailabilityReducerState } from '../../Redux/reducers/AvailabilityReducer';
import './ServicesStyles.css';

const Services = () => {
  const { stylist } = useSelector((state: ReducerState):AvailabilityReducerState => state.availability);
  if (!stylist) return null;
  const { services } = stylist;
  const formatPrice = (price: string|number) => {
    const newPrice = parseFloat(price.toString());
    return newPrice.toFixed(2);
  };
  return stylist ? (
    <div id="services_and_prices_container">
      <div className="services_box">
        <div className="title">
          <h1>Services & Prices</h1>
        </div>
        <div className="price_list">
          {services.map((service) => (
            <div className="service" key={service.name + service.price}>
              <p>{service.name}</p>
              <p>
                £
                {formatPrice(service.price)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : null;
};

export default Services;
