import axios from 'axios';

export const balance1inch = async () => {
  var account;
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  account = accounts[0];
  const chainId = await window.ethereum.request({
    method: 'eth_chainId',
  });
  const chainIdint = parseInt(chainId.slice(2), 16);
  console.log(chainIdint);

  const balanceData = await axios('http://localhost:8181/tokenBalances', {
    method: 'POST',
    data: {
      chainId: chainIdint,
      walletAddress: account,
    },
  }).then((res) => res.data);

  console.log('balanceData:', balanceData);
};
