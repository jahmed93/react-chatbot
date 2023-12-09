import { hexNum } from '../utils/index';
var Accounts = [];
export const sendTransaction = async (address, amount) => {
  const userAccounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });

  Accounts = userAccounts;

  if (Accounts.length === 0) {
    await getAccount();
  }
  if (Accounts.length > 0) {
    const gasLimit = await window.ethereum.request({
      method: 'eth_gasPrice',
      params: [],
    });
    console.log(parseInt(gasLimit.slice(2), 16));
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: Accounts[0],
          to: address.toLowerCase(),
          value: hexNum(amount),
          gasPrice: gasLimit,
        },
      ],
    });
    return txHash;
  }
};

const getAccount = async () => {
  try {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    Accounts = accounts;
  } catch (error) {
    console.error(error);
  }
};
