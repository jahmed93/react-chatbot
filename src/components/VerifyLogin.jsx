import React from 'react';
import { useState, useEffect } from 'react';
import QrCodeGenerator from './QrCode';
import { useNavigate } from 'react-router-dom';

const VerifyLogin = ({ setUserID, setIsAuth }) => {
  const [qrCodeData, setQrCodeData] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const base_url = 'http://52.172.254.231:11000';
  const Navigate = useNavigate();
  // const base_url = 'http://localhost:8080';

  useEffect(() => {
    setIsButtonDisabled(true);
    fetch(base_url + '/api/sign-in')
      .then((response) =>
        Promise.all([Promise.resolve(response.headers.get('x-id')), response.json()]),
      )
      .then(([id, data]) => {
        console.log(data);
        setQrCodeData(data);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsButtonDisabled(false));
  }, []);

  const checkVerificationStatus = () => {
    // Query the backend to confirm verification
    // if (verified) {
    //     setUserID('something');
    // setIsAuth(true);
    localStorage.setItem('<userid>', true);
    localStorage.setItem('user', '<userid>');
    console.log('Authenticated');
    window.location.href = '/chat';
    // }
  };

  return (
    <>
      <div
        className="VerifyMain"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          className="QrContainer"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <QrCodeGenerator jsonData={qrCodeData} />
        </div>

        <div>
          <br></br>
          <button className="button" onClick={checkVerificationStatus}>
            Wallet Verified ID
          </button>
        </div>
      </div>
    </>
  );
};

export default VerifyLogin;
