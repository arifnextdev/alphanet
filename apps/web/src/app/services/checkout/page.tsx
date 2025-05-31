'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  // const cart = useSelector((state: RootState) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad'>(
    'bkash',
  );
  const [loading, setLoading] = useState(false);

  const handleBkashPayment = async () => {
    try {
      const res = await fetch('/api/payment/bkash/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 100 }), // mock data
      });

      const data = await res.json();

      if (data?.paymentURL) {
        window.location.href = data.paymentURL; // redirect to bkash gateway
      } else {
        alert('bKash payment failed to initialize.');
      }
    } catch (err) {
      console.error(err);
      alert('Error processing bKash payment');
    }
  };

  const handleNagadPayment = async () => {
    try {
      const res = await fetch('/api/payment/nagad/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 100 }), // mock data
      });

      const data = await res.json();

      if (data?.paymentURL) {
        window.location.href = data.paymentURL; // redirect to nagad gateway
      } else {
        alert('Nagad payment failed to initialize.');
      }
    } catch (err) {
      console.error(err);
      alert('Error processing Nagad payment');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (paymentMethod === 'bkash') {
      await handleBkashPayment();
    } else {
      await handleNagadPayment();
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-md rounded-xl mt-20">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
      <form onSubmit={handleSubmit}>
        {/* Payment Methods */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Select Payment Method:
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="bkash"
                checked={paymentMethod === 'bkash'}
                onChange={() => setPaymentMethod('bkash')}
                className="accent-pink-600"
              />
              <span>bKash</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="nagad"
                checked={paymentMethod === 'nagad'}
                onChange={() => setPaymentMethod('nagad')}
                className="accent-orange-500"
              />
              <span>Nagad</span>
            </label>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white py-2 px-4 rounded transition`}
        >
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
