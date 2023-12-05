import { ethers } from 'ethers';
const { utils } = ethers;

const erc20AddressMap = new Map([
  [
    '0x1',
    {
      usdc: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      dai: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      uni: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
      link: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
    },
  ],
]);
// map of chain id to erc20 token address

const tokenDecimalMap = new Map([
  ['usdc', 6],
  ['dai', 18],
  ['uni', 18],
  ['link', 18],
]);
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

  const amountInUSDC = utils.parseUnits(amount, tokenDecimalMap.get(tokenName.toLowerCase()));

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
