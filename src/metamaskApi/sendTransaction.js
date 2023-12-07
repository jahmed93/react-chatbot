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
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: Accounts[0],
          to: address,
          value: hexNum(amount),
          gasLimit: '0x5028',
          maxPriorityFeePerGas: '0x3b9aca00',
          maxFeePerGas: '0x2540be400',
        },
      ],
    });
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
