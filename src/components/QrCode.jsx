import React, { useState } from 'react';
// import QRCode from 'qrcode.react';
import { QRCode } from 'react-qr-svg';
import { useEffect } from 'react';

const QrCodeGenerator = ({ jsonData }) => {
  const [qrCodeValue, setQrCodeValue] = useState('');

  // Assuming jsonData is a valid JSON string
  useEffect(() => {
    setQrCodeValue(jsonData);
    console.log(jsonData);
  }, [jsonData]);

  return (
    <div>
      {qrCodeValue == '' || qrCodeValue == null ? (
        <></>
      ) : (
        <QRCode level="Q" style={{ width: 256 }} value={JSON.stringify(jsonData)} />
      )}
    </div>
  );
};

export default QrCodeGenerator;
