import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTransaction } from '../../redux/actions/cashierActions';

const Checkout = ({ cartItems }) => {
  const [amountPaid, setAmountPaid] = useState('');
  const [change, setChange] = useState(null);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleAmountPaidChange = (e) => {
    setAmountPaid(e.target.value);
  };

  const dispatch = useDispatch();

  const handleCheckout = () => {
    const totalPrice = calculateTotalPrice();
    const paidAmount = parseFloat(amountPaid);

    if (paidAmount >= totalPrice) {
      const changeAmount = (paidAmount - totalPrice).toFixed(2);
      setChange(changeAmount);

      // Assuming you have an action named createTransaction in actions/cashierActions.js
      // Pass the cart items, paid amount, and change amount as the payload to the action
      dispatch(createTransaction(cartItems, paidAmount, parseFloat(changeAmount)));
    } else {
      alert('Insufficient amount. Please provide enough money to complete the transaction.');
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - Quantity: {item.quantity} - Price: {item.price}
          </li>
        ))}
      </ul>
      <p>Total Price: {calculateTotalPrice()}</p>
      <input type="number" value={amountPaid} onChange={handleAmountPaidChange} />
      <button onClick={handleCheckout}>Checkout</button>
      {change !== null && <p>Change: {change}</p>}
    </div>
  );
};

export default Checkout;
