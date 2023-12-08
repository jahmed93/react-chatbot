import React from 'react';
import { useState } from 'react';
import '../style/AuthPage.css';
import SignupComponent from '../components/SignUpForm';
import VerifyLogin from '../components/VerifyLogin';

const AuthPage = ({ isAuth, setIsAuth }) => {
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const openSignupPopup = () => {
    setShowSignupPopup(true);
    setShowLoginPopup(false);
  };

  const closeSignupPopup = () => {
    setShowSignupPopup(false);
    setShowLoginPopup(false);
  };

  const openLoginPopup = () => {
    setShowLoginPopup(true);
    setShowSignupPopup(false);
  };

  const closeLoginPopup = () => {
    setShowLoginPopup(false);
    setShowSignupPopup(false);
  };

  return (
    <>
      <div className="mainAuthPage">
        <div className="authPageImage"></div>

        <div className="authPageForm">
          {!showLoginPopup && !showSignupPopup && (
            <div>
              <button className="signupButton" onClick={openSignupPopup}>
                Sign Up
              </button>
              <button className="loginButton" onClick={openLoginPopup}>
                Login
              </button>
            </div>
          )}

          {showSignupPopup && (
            <div className="popup">
              {/* Signup form content start */}

              <SignupComponent closeSignupPopup={closeSignupPopup} />

              {/* Signup form content end */}
            </div>
          )}

          {showLoginPopup && (
            <div className="popup">
              {/* Login form content */}

              <VerifyLogin closeLoginPopup={closeLoginPopup} />

              {/* Login form content end */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthPage;
