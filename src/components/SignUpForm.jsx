import React, { useEffect } from 'react';
import { useState } from 'react';
import '../style/AuthPage.css';
import fetchData from '../utils/queryIssuer';
import QrCodeGenerator from './QrCode';

const SignupComponent = ({ closeSignupPopup }) => {
  const [identifier, setIdentifier] = useState('');
  const [adharNo, setAdharNo] = useState('');
  const [jsonData, setJsonData] = useState('');

  // to store in env in future
  const credentialSchema = 'ipfs://Qmd5Emae7JaJCs4uELDbPptbAFutyXHqaC6M2dBqX1nadf';

  // helper functions
  const handleIdentifierChange = (event) => {
    setIdentifier(event.target.value);
  };
  const handleAdharNoChange = (event) => {
    setAdharNo(event.target.value);
  };
  const isValidUri = (uri) => {
    const uriPattern = /^did:polygonid:polygon:mumbai:[a-zA-Z0-9]+$/;
    return uriPattern.test(uri);
  };
  const isValidAdharno = (AdharNo) => {
    const aadharPattern = /^[2-9]\d{3}\s\d{4}\s\d{4}$/;
    return aadharPattern.test(AdharNo);
  };

  // getting from the issuer
  const handleSignup = async () => {
    console.log('pressed');
    if (isValidAdharno(adharNo) && isValidUri(identifier)) {
      console.log('valid');
      let listCredentials = null;
      try {
        // get the active Credentials to check already logged-in or not
        listCredentials = await fetchData('/v1/credentials', 'GET', null, {
          did: identifier,
          status: 'all',
        });
      } catch (e) {
        console.log('Error in fetching : ', e);
        return;
      }

      let exists = false;
      listCredentials.forEach((e) => {
        if (e['schemaUrl'] === credentialSchema && e['expired'] == false && e['revoked'] == false) {
          exists = true;
        }
      });

      // if(exists) {
      //     // handle on exit
      //     return
      // }

      // if not exist then create new credential and show QR code
      let id = null;
      try {
        id = await fetchData('/v1/credentials', 'POST', {
          credentialSchema: credentialSchema,
          type: 'adharkyc',
          credentialSubject: {
            id: identifier,
            AdharNo: adharNo,
          },
          expiration: '2024-12-10T05:02:26.416Z',
          signatureProof: true,
          mtProof: true,
        });
      } catch (e) {
        console.log('Error in Creating Credentials : ', e);
        return;
      }

      if (!id['id']) {
        // handle failure
        console.log('Failed to create Credentials');
        return;
      }
      console.log('Credentials created : ', id);

      let QRResponse = null;

      try {
        QRResponse = await fetchData('/v1/credentials/' + id['id'] + '/qrcode', 'GET', null, null);
      } catch (e) {
        console.log('Failed to get QR : ', e);
        return;
      }

      if (!QRResponse['qrCodeLink']) {
        console.log('Failed to get QR');
        return;
      }

      console.log(QRResponse);
      setJsonData(QRResponse);
    }
  };

  return (
    <>
      <div className="qrcontainer">
        <QrCodeGenerator jsonData={jsonData} />
      </div>
      <div className="inputContainer">
        <label htmlFor="identifier" style={{ color: 'black' }}>
          Identifier:
        </label>
        <input
          type="text"
          id="identifier"
          placeholder="did:polygonid:polygon:mumbai:xxxxxxxxxxxxxxxxxxxxxxxxxx"
          value={identifier}
          style={{
            width: '30vw',
            backgroundColor: 'lightgray',
            color: 'black',
          }}
          onChange={handleIdentifierChange}
        />
      </div>

      <div className="inputContainer">
        <label htmlFor="adharNo" style={{ color: 'black' }}>
          Adhar No:
        </label>
        <input
          type="text"
          id="adharNo"
          placeholder="XXXX XXXX XXXX"
          value={adharNo}
          // give width of 70%
          style={{
            width: '30vw',
            backgroundColor: 'lightgray',
            color: 'black',
          }}
          onChange={handleAdharNoChange}
        />
      </div>

      <div className="buttonContainer">
        <button onClick={handleSignup}>Submit</button>
      </div>

      <div className="buttonContainer">
        <button onClick={closeSignupPopup}>Cancel</button>
      </div>
    </>
  );
};

export default SignupComponent;
