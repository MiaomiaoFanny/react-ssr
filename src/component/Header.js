import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return <div>
  <h3>
    <Link to="/">Home</Link>
  </h3>
  <h3>
    <Link to="/about">About</Link>
  </h3>
  </div>
}