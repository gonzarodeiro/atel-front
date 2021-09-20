import React from 'react';

import './styles.css';

const StripeItemPlaceholder = ({ className }) => (
  <div className={`pic-stripe-item-placeholder ${className}`}>
    <i className='fas fa-plus-circle pic-placeholder-icon' style={{ color: 'white' }}></i>
  </div>
);

export default StripeItemPlaceholder;
