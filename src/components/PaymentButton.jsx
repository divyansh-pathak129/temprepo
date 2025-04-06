import { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentButton = ({ amount, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      console.log('Razorpay script loaded');
      setScriptLoaded(true);
    };
    script.onerror = (error) => {
      console.error('Error loading Razorpay script:', error);
      onError && onError(new Error('Failed to load Razorpay script'));
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [onError]);

  const handlePayment = async () => {
    if (!scriptLoaded) {
      console.error('Razorpay script not loaded');
      onError && onError(new Error('Razorpay script not loaded'));
      return;
    }

    try {
      setLoading(true);
      
      // Create order
      const response = await axios.post('/api/payment/create-order', {
        amount,
      });

      console.log('Order created:', response.data);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: response.data.amount,
        currency: response.data.currency,
        name: "Nykaa Clone",
        description: "Purchase Payment",
        order_id: response.data.id,
        handler: async (response) => {
          try {
            console.log('Payment response:', response);
            // Verify payment
            const verifyResponse = await axios.post('/api/payment/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyResponse.data.success) {
              onSuccess && onSuccess(verifyResponse.data);
            }
          } catch (error) {
            console.error('Payment verification failed:', error);
            onError && onError(error);
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#ff3f6c"
        },
        modal: {
          ondismiss: function() {
            console.log('Payment modal closed');
            setLoading(false);
          }
        }
      };

      console.log('Initializing Razorpay with options:', options);

      if (typeof window !== 'undefined' && window.Razorpay) {
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        throw new Error('Razorpay is not available');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      onError && onError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading || !scriptLoaded}
      className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'Processing...' : !scriptLoaded ? 'Loading...' : 'Pay Now'}
    </button>
  );
};

export default PaymentButton; 