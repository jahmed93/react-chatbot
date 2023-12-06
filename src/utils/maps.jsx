export const erc20AddressMap = new Map([
  [
    '0x1',
    {
      eth: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      usdc: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      dai: '0x6b175474e89094c44da98b954Eedeac495271d0f',
      uni: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
      link: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
    },
  ],
]);
// map of chain id to erc20 token address

export const tokenDecimalMap = new Map([
  ['eth', 18][('usdc', 6)],
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
