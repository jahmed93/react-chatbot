export const erc20AddressMap = new Map([
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

export const tokenDecimalMap = new Map([
  ['usdc', 6],
  ['dai', 18],
  ['uni', 18],
  ['link', 18],
]);
// map of erc20tokenName to decimal

export const chainMap = new Map([
  ['ethereum_mainnet', '0x1'],
  ['sepolia', '0xaa36a7'],
  ['goerli', '0x5'],
  ['mumbai_testnet', '0x13881'],
  ['scroll', '0x82750'],
  ['arbitrum', '0xA4B1'],
]);
