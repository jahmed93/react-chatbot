import React, { useEffect, useState } from 'react';
import Metamaskwalletbutton from './MetaMaskConnectButton';
import { formatBalance } from '../utils/index';
import WalletInfo from './WalletInfo';
import detectEthereumProvider from '@metamask/detect-provider';

const Setting = () => {
  //=========================
  const [hasProvider, setHasProvider] = useState(null);
  const initialState = { accounts: [], balance: '', chainId: '' };
  const [wallet, setWallet] = useState(initialState);

  useEffect(() => {
    const refreshAccounts = (accounts) => {
      if (accounts.length > 0) {
        updateWallet(accounts);
      } else {
        setWallet(initialState);
      }
    };

    const refreshChain = (chainId) => {
      setWallet((wallet) => ({ ...wallet, chainId }));
    };

    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true, mustBeMetaMask: true });
      setHasProvider(Boolean(provider));

      if (provider) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        refreshAccounts(accounts);
        window.ethereum.on('accountsChanged', refreshAccounts);
        window.ethereum.on('chainChanged', refreshChain);
      }
    };

    getProvider();

    return () => {
      window.ethereum?.removeListener('accountsChanged', refreshAccounts);
      window.ethereum?.removeListener('chainChanged', refreshChain);
    };
  }, []);

  const updateWallet = async (accounts) => {
    const balance = formatBalance(
      await window.ethereum.request({
        method: 'eth_getBalance',
        params: [accounts[0], 'latest'],
      }),
    );
    const chainId = await window.ethereum.request({
      method: 'eth_chainId',
    });
    setWallet({ accounts, balance, chainId });
  };

  const handleConnect = async () => {
    let accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    updateWallet(accounts);
  };

  const handleLogout = () => {
    setWallet(initialState);
    setHasProvider(null);
  };
  //=========================================================================

  return (
    <form className="flex flex-col items-center justify-center gap-2">
      {window.ethereum?.isMetaMask && wallet.accounts.length < 1 && (
        <Metamaskwalletbutton onConnect={handleConnect} />
      )}

      {wallet.accounts.length > 0 && hasProvider && (
        <div>
          <WalletInfo
            accounts={wallet.accounts}
            balance={wallet.balance}
            chainId={wallet.chainId}
          />
          <div> Wallet Connected </div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </form>
  );
};

export default Setting;
