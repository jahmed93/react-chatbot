import { ethers } from 'ethers';

const erc20AddressMap = new Map();
// map of chain id to erc20 token address

const tokenDecimalMap = new Map();
// map of erc20tokenName to decimal

const getDataField = async (address, amount, tokenAddress, tokenName) => {
  const USDC_ABI = [
    {
      name: 'transfer',
      type: 'function',
      inputs: [
        { name: 'to', type: 'address' },
        { name: 'value', type: 'uint256' },
      ],
      outputs: [{ name: '', type: 'bool' }],
    },
  ];
  const getProvider = async () => {
    return await detectEthereumProvider({ silent: true, mustBeMetaMask: true });
  };

  const provider = getProvider();
  const signer = provider.getSigner();

  const usdcContract = new ethers.Contract(tokenAddress, USDC_ABI, signer);

  const amountInUSDC = ethers.utils.parseUnits(
    amount,
    tokenDecimalMap.get(tokenName.toLowerCase()),
  );

  const dataFieldValue = usdcContract.interface.encodeFunctionData('transfer', [
    address,
    amountInUSDC,
  ]);

  return dataFieldValue;
};

export const sendERC20Token = async (address, amount, tokenName) => {
  const chain = await window.ethereum.request({
    method: 'eth_chainId',
    params: [],
  });
  var Accounts = [];
  const userAccounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });

  Accounts = userAccounts;

  const tokenAddress = erc20AddressMap.get(chain);

  if (Accounts.length === 0) {
    await getAccount();
  }
  if (Accounts.length > 0) {
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: Accounts[0],
          to: tokenAddress,
          data: getDataField(address, amount, tokenAddress, tokenName),
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
