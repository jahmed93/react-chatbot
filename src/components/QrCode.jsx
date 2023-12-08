import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { useEffect } from 'react';

const QrCodeGenerator = ({ jsonData }) => {
  const [qrCodeValue, setQrCodeValue] = useState('');

  // Assuming jsonData is a valid JSON string
  useEffect(() => {
    setQrCodeValue(jsonData);
  }, [jsonData]);

  return (
    <div>{qrCodeValue == '' || qrCodeValue == null ? <></> : <QRCode value={qrCodeValue} />}</div>
  );
};

export default QrCodeGenerator;
