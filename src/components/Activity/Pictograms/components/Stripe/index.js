import React from 'react';

import StripeItem from '../StripeItem';
import StripeItemPlaceholder from '../StripeItemPlaceHolder';

import './styles.css';

const Stripe = ({ className, stripe }) => (
  <div className={`pic-stripe-container ${className}`}>
    <div className='pic-stripe'>
      {stripe && stripe.map((p) => <StripeItem picto={p} />)}
      {stripe && !stripe.length && <StripeItemPlaceholder className='pic-stripe-placeholder' />}
    </div>
  </div>
);

export default Stripe;
