import { ethers } from 'ethers';
import { web3 } from 'web3';
import { erc20AddressMap } from '../utils/maps';

var Accounts = [];
const getDataField = async (address, amount) => {
  // const USDC_ABI = [
  //   {
  //     name: 'transfer',
  //     type: 'function',
  //     inputs: [
  //       { name: 'to', type: 'address' },
  //       { name: 'value', type: 'uint256' },
  //     ],
  //     outputs: [{ name: '', type: 'bool' }],
  //   },
  // ];
  var functionName="transfer(address,uint256)";
  var hash = web3.utils.keccak256(functionName).slice(0, 10);
  var types=["address","uint256"];
  var functionArgs=[address,amount*10**18];
  const data = ethers.utils.defaultAbiCoder.encode(types, functionArgs).slice(2);
  const dataFieldValue = hash + data;
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
    return "Hash For ERC20 Token Transfer: " + txHash;
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
