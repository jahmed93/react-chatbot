import React from 'react';
import { formatChainAsNum } from '../utils/index';

const WalletInfo = ({ accounts, balance, chainId }) => {
  return (
    <>
      <div>Wallet Accounts: {accounts[0]}</div>
      <div>Wallet Balance: {balance}</div>
      <div>Hex ChainId: {chainId}</div>
      <div>Numeric ChainId: {formatChainAsNum(chainId)}</div>
    </>
  );
};

export default WalletInfo;
