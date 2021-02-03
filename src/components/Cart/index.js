import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

import CartContext from 'context/CartContext';

import { CartWrapper } from './styles';

export function Cart() {
  const { checkout } = React.useContext(CartContext);
  let totalQuantity = 0;
  if (checkout) {
    totalQuantity = checkout.lineItems.reduce((curr, next) => curr + next.quantity, 0)
  }

  return <CartWrapper>
    <FaShoppingCart size="1.5em"/>
    <div>
      {totalQuantity} item(s) / CA${checkout?.totalPrice || 0.00}
    </div>
  </CartWrapper>
}
