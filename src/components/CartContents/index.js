import React from 'react';
import CartContext from 'context/CartContext';
import { QuantityAdjuster } from '../QuantityAdjuster'
import { Button } from '../Button'
import { CartItem, CartHeader, CartFooter, Footer } from './styles';
import { RemoveLineItem } from '../RemoveLineItem';
import { navigate } from '@reach/router';

export function CartContents() {
  const { checkout, updateLineItem } = React.useContext(CartContext);

  const handleAdjustQuantity = ({quantity, variantId}) => {
    updateLineItem({ variantId, quantity })
  };

  return (
    <section>
      <h1>
        Your cart
      </h1>
      {checkout?.lineItems.length > 0 &&
        <CartHeader>
          <div>Product</div>
          <div>Unit price</div>
          <div>Quantity</div>
          <div>Amount</div>
        </CartHeader>
      }
      {checkout?.lineItems.map(item => (
        <CartItem key={item.variant.id}>
          <div>
            <div>
              {item.title}
            </div>
            <div>
              {item.variant.title === 'Default Title' ? '' : item.variant.title}
            </div>
          </div>
          <div>
            CA${item.variant.price}
          </div>
          <div>
            <QuantityAdjuster item={item} onAdjust={handleAdjustQuantity} />
          </div>
          <div>
            CA${(item.quantity * item.variant.price).toFixed(2)}
          </div>
          <div>
            <RemoveLineItem lineItemId={item.id} />
          </div>
        </CartItem>
      ))}
      {checkout?.lineItems.length > 0 &&
        <CartFooter>
          <div><strong>Total:</strong></div>
          <div><span>CA${checkout?.totalPrice}</span></div>
        </CartFooter>
      }
      {checkout?.lineItems.length <= 0 && <h4>Your cart is empty</h4>}
      <Footer>
        <div>
          <Button onClick={() => navigate(-1)}>Continue shopping</Button>
        </div>
        <div>
          {checkout?.webUrl && <Button onClick={() => window.location.href = checkout.webUrl}>Checkout</Button>}
        </div>
      </Footer>
    </section>
  );
}
