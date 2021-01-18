import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import './NotFound.css';

interface NotFoundProps {
    location: string
}

interface Props extends RouteComponentProps<NotFoundProps> {}

const NotFound = ({ location: { pathname } }: Props) => (
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
