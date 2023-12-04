import React from 'react';

const Metamaskwalletbutton = ({ onConnect }) => {
  const handleConnect = async () => {
    try {
      await onConnect();
    } catch (error) {
      console.error('Error connecting MetaMask:', error);
    }
  };

  return <button onClick={handleConnect}>Connect MetaMask</button>;
};

export default Metamaskwalletbutton;
