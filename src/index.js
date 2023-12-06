import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ReactGA from 'react-ga4';
import { MetaMaskProvider } from '@metamask/sdk-react';

ReactGA.initialize(`${process.env.REACT_APP_GOOGLE_ANALYTICS_KEY}`);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        checkInstallationImmediately: false,
        dappMetadata: {
          name: 'Demo React App',
          url: window.location.host,
        },
      }}
    >
      <App />
    </MetaMaskProvider>
  </React.StrictMode>,
);
