import React from 'react';
import { useState, useEffect } from 'react';
import '../style/AuthPage.css';
import { QRCode } from 'react-qr-svg';

const VerifyLogin = ({ closeLoginPopup }) => {
  const [qrCodeData, setQrCodeData] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const base_url = 'http://52.172.254.231:11000';
  // const base_url = 'http://localhost:8080';

  const handleButtonClick = () => {
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
  };
  return (
    <>
      <div className="VerifyQR">
        <button
          className={`btn-qr ${isButtonDisabled ? 'disabled' : ''}`}
          id="button"
          onClick={handleButtonClick}
        >
          Generate QR Code
        </button>

        {qrCodeData && (
          <div style={{ display: 'block' }}>
            <QRCode
              value={JSON.stringify(qrCodeData)}
              size={450}
              bgColor="#e9e9e9"
              fgColor="#000"
              level="L"
            />
          </div>
        )}
      </div>

      <button className="closeButton" onClick={closeLoginPopup}>
        Close Login
      </button>
    </>
  );
};

export default VerifyLogin;
