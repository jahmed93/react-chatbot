import React from 'react';
import { useState } from 'react';
import '../style/AuthPage.css';
import SignupComponent from '../components/SignupComponent';
import VerifyLogin from '../components/VerifyLogin';

const AuthPage = ({ isAuth, setIsAuth, userID, setUserID }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [isVerify, setIsVerify] = useState(false);

  const openSignupPopup = () => {
    setIsVerify(false);
    setIsSignup(true);
  };

  const openLoginPopup = () => {
    setIsVerify(true);
    setIsSignup(false);
  };

  return (
    <div className="mainAuthPage">
      <div className="authPage">
        {!isSignup && !isVerify && (
          <div
            className="Welcome"
            style={{
              alignContent: 'center',
              textAlign: 'center',
            }}
          >
            <span
              className="WelcomeText"
              style={{
                fontSize: '40px',
                color: 'floralwhite',
              }}
            >
              <b>Welcome to Hermes!</b>
            </span>
            <br></br>
            <span className="Description" style={{ fontSize: '23px', color: 'floralwhite' }}>
              Ethereum Chat Bot to interact with the chain just by prompts
            </span>
            <br></br>
            <span style={{ color: 'floralwhite' }}>
              <b>Please Authenticate yourself with PolygonID mobile Wallet</b>
            </span>
            <br></br>

            <button className="button" onClick={openSignupPopup}>
              Get Credentials
            </button>
            <button className="button" onClick={openLoginPopup}>
              Verify
            </button>
          </div>
        )}

        {isSignup && !isVerify && (
          <SignupComponent setIsSignup={setIsSignup} setIsVerify={setIsVerify} />
        )}

        {!isSignup && isVerify && <VerifyLogin setIsAuth={setIsAuth} setUserID={setUserID} />}
      </div>

      <div className="displayAuth"></div>
    </div>
  );
};

export default AuthPage;
