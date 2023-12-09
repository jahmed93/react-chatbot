import { MetaMaskSDK } from '@metamask/sdk';
import { FusionSDK } from '@1inch/fusion-sdk';
import { erc20AddressMap, tokenDecimalMap } from '../utils/maps';
import { toBase } from '../utils/index';

export const swapUsing1inchFusion = async (amount, token1, token2) => {
  const sdk = new MetaMaskSDK();
  const provider = sdk.getProvider();
  const chainId = await provider.request({
    method: 'eth_chainId',
    params: [],
  });
  var account;
  const connect = async () => {
    try {
      const accounts = await sdk.connect();
      account = accounts[0];
    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  };
  connect();
  // const blockchainProvider = new PrivateKeyProviderConnector(
  //     makerPrivateKey,
  //     new Web3(nodeUrl)
  // )

  const inchsdk = new FusionSDK({
    url: 'https://api.1inch.dev/fusion',
    network: 1,
    blockchainProvider: provider,
  });

  inchsdk
    .placeOrder({
      fromTokenAddress: getTokenAddress(chainId, token1),
      toTokenAddress: getTokenAddress(chainId, token2),
      amount: toBase(amount, tokenDecimalMap.get(token1)),
      walletAddress: account,
    })
    .then(console.log);
};
