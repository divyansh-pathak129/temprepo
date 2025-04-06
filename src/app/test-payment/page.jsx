'use client';

import PaymentButton from '@/components/PaymentButton';

export default function TestPayment() {
  const handleSuccess = (data) => {
    console.log('Payment successful:', data);
    alert('Payment successful!');
  };

  const handleError = (error) => {
    console.error('Payment failed:', error);
    alert('Payment failed. Please try again.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Test Payment</h1>
        <div className="space-y-4">
          <p className="text-gray-600">Amount: ₹1000</p>
          <PaymentButton 
            amount={1000}
            onSuccess={handleSuccess}
            onError={handleError}
          />
        </div>
      </div>
    </div>
  );
} 