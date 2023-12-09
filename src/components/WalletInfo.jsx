import React from 'react';
import { formatChainAsNum } from '../utils/index';

const WalletInfo = ({ accounts, balance, chainId }) => {
  return (
    <div className="text-2sxl font-semibold text-gray-900 dark:text-white">
      <center>
        <div className="">Wallet Accounts: {accounts[0]}</div>
        <div>Wallet Balance: {balance}</div>
        <div>Hex ChainId: {chainId}</div>
        <div>Numeric ChainId: {formatChainAsNum(chainId)}</div>
      </center>
    </div>
  );
};

export default WalletInfo;
