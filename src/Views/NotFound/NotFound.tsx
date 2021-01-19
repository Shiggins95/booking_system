import React from 'react';
import './NotFound.css';
import { MatchProps } from '../../Types';

const NotFound = ({ location: { pathname } }: MatchProps) => (
  <div id="not_found_container">
    <h2>Oops...</h2>
    <h2>
      &quot;
      {pathname}
      &quot;
      {' '}
      Not found
    </h2>
  </div>
);

export default NotFound;
