/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { useSprings, animated, useTransition } from 'react-spring';
import { vw } from '../../Helpers/Dimensions';

interface BookingsComponentProps {
    bookings: Object[]
}
interface DateObject {
    date: string;
    id: number;
}
const BookingsComponent = ({ bookings }: BookingsComponentProps) => {
  const [dates, setDates] = useState<DateObject[]>([]);
  const currentColor = useRef(0);
  const index = useRef(0);
  const colors: string[] = ['CB48B7', '2E2D4D', '337357', '6D9F71', 'EB7BC0', 'EED5C2', 'E94F37'];
  useEffect(() => {
    const _dates: DateObject[] = [];
    const datesRaw: String[] = [];
    const date = new Date();
    let currentIncrement = 0;
    for (let i = 0; i < 5; i++) {
      const currentDate = date;
      currentDate.setDate(currentDate.getDate() + currentIncrement);
      _dates.push(
        { date: currentDate.toUTCString().substring(0, 16), id: currentIncrement },
      );
      datesRaw.push(currentDate.toUTCString().substring(0, 16));
      currentIncrement += 1;
    }
    setDates(_dates);
    console.log(datesRaw);
  }, []);
  const [springs, set] = useSprings(dates.length, (i) => ({ x: vw * i, display: 'block' }));
  console.log(springs);
  const handleClick = (value: number) => {
    index.current += value;
    console.log(index.current);
    debugger;
    // @ts-ignore
    // eslint-disable-next-line consistent-return
    set((i) => {
      if (i < index.current || i > index.current + 1) return { display: 'none' };
      const x = ((i - index.current) * vw) * value;
      return { display: 'block', x };
    });
  };
  const randomColor = () => {
    const currentColorIndex = currentColor.current === colors.length - 1 ? 0 : currentColor.current + 1;
    currentColor.current = currentColorIndex;
    return colors[currentColorIndex];
  };
  return (
    <div>
      <button type="button" onClick={() => handleClick(1)} value={1}>Click 1</button>
      <button type="button" onClick={() => handleClick(-1)} value={-1}>Click -1</button>
      {
          springs.map(({ x, display }, i) => (
            // eslint-disable-next-line max-len,react/no-array-index-key
            <animated.div key={i} style={{ display, transform: x.interpolate((y) => `translateX(${y}px)`), background: `#${randomColor()}` }}>
              {i}
            </animated.div>
          ))
      }
    </div>
  );
};

export default BookingsComponent;
