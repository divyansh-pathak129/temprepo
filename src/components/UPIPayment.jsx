import React, { useState } from 'react';
import Image from 'next/image';

const UPIPayment = ({ amount }) => {
  const [selectedOption, setSelectedOption] = useState('qr');

  const upiApps = [
    {
      id: 'google-pay',
      name: 'Google Pay',
      icon: '/images/gpay.svg'
    },
    {
      id: 'phonepe',
      name: 'PhonePe',
      icon: '/images/phonepe.svg'
    },
    {
      id: 'paytm',
      name: 'Paytm',
      icon: '/images/paytm.svg'
    }
  ];

  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Pay with UPI</h2>
      
      <div className="space-y-6">
        {/* QR Code Section */}
        <div className={`border rounded-lg p-4 ${selectedOption === 'qr' ? 'border-pink-500 bg-pink-50' : 'border-gray-200'}`}>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="qr-option"
              name="payment-option"
              checked={selectedOption === 'qr'}
              onChange={() => setSelectedOption('qr')}
              className="w-4 h-4 text-pink-500"
            />
            <label htmlFor="qr-option" className="ml-2 font-medium">Scan QR Code</label>
          </div>
          
          {selectedOption === 'qr' && (
            <div className="text-center">
              <div className="mb-4">
                <p className="text-gray-600 mb-2">Use any UPI app on your phone</p>
                <div className="flex justify-center gap-4">
                  {upiApps.map(app => (
                    <Image
                      key={app.id}
                      src={app.icon}
                      alt={app.name}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-100 p-4 rounded-lg inline-block mb-4">
                <Image
                  src="/images/qr-code.svg"
                  alt="QR Code"
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </div>
              
              <button className="w-full bg-pink-500 text-white py-3 rounded-md hover:bg-pink-600 transition-colors">
                Scan & Pay ₹{amount}
              </button>
            </div>
          )}
        </div>

        <div className="text-center text-gray-500">or</div>

        {/* UPI Apps Section */}
        <div>
          {upiApps.map(app => (
            <div
              key={app.id}
              className={`flex items-center p-4 border rounded-lg mb-3 cursor-pointer ${
                selectedOption === app.id ? 'border-pink-500 bg-pink-50' : 'border-gray-200'
              }`}
              onClick={() => setSelectedOption(app.id)}
            >
              <input
                type="radio"
                id={app.id}
                name="payment-option"
                checked={selectedOption === app.id}
                onChange={() => setSelectedOption(app.id)}
                className="w-4 h-4 text-pink-500"
              />
              <label htmlFor={app.id} className="flex items-center ml-2 cursor-pointer flex-1">
                <Image
                  src={app.icon}
                  alt={app.name}
                  width={32}
                  height={32}
                  className="object-contain"
                />
                <span className="ml-2">{app.name}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UPIPayment; 