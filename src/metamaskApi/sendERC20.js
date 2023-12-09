import { ethers } from 'ethers';
import { erc20AddressMap, tokenDecimalMap } from '../utils/maps';
import { toBase } from '../utils/index';
import detectEthereumProvider from '@metamask/detect-provider';

var Accounts = [];
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

  const amountInUSDC = toBase(amount, tokenDecimalMap.get(tokenName.toLowerCase()));

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
  const userAccounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });

  Accounts = userAccounts;

  const tokenAddressesforChain = erc20AddressMap.get(chain);
  var tokenAddress;

  if (tokenName.toLowerCase() === 'usdc') {
    tokenAddress = tokenAddressesforChain.usdc;
  } else if (tokenName.toLowerCase() === 'dai') {
    tokenAddress = tokenAddressesforChain.dai;
  } else if (tokenName.toLowerCase() === 'uni') {
    tokenAddress = tokenAddressesforChain.uni;
  } else if (tokenName.toLowerCase() === 'link') {
    tokenAddress = tokenAddressesforChain.link;
  }

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
