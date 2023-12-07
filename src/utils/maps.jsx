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
  ['eth', 18],
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

export const chainsfor1inch = new Map([
  [
    '0xe708',
    {
      name: 'Linea',
      chainId: 59144,
      rpc: 'https://linea.drpc.org',
    },
  ],

  [
    '0x44d',
    {
      name: 'ZKEVM',
      chainId: 1101,
      rpc: 'https://polygon-zkevm.drpc.org',
    },
  ],
  [
    '0x1',
    {
      name: 'Ethereum',
      chainId: 1,
      rpc: 'https://eth.llamarpc.com',
    },
  ],
  [
    '0xaa36a7',
    {
      name: 'Sepolia',
      chainId: 11155111,
      rpc: 'https://1rpc.io/sepolia',
    },
  ],
  [
    '0xa4b1',
    {
      name: 'Arbitrum',
      chainId: 42161,
      rpc: 'https://1rpc.io/arb',
    },
  ],
  [
    '0x8274f',
    {
      name: 'Scroll Sepolia',
      chainId: 534351,
      rpc: 'https://sepolia-rpc.scroll.io',
    },
  ],
  [
    '0x1388',
    {
      name: 'Mantle',
      chainId: 5000,
      rpc: 'https://1rpc.io/mantle',
    },
  ],
  [
    '0x2105',
    {
      name: 'BASE',
      chainId: 8453,
      rpc: 'https://base.llamarpc.com',
    },
  ],
  [
    '0x32',
    {
      name: 'XDC Network',
      chainId: 50,
      rpc: 'https://rpc.ankr.com/xdc',
    },
  ],
  // polygon
  [
    '0x89',
    {
      name: 'Polygon',
      chainId: 137,
      rpc: 'https://polygon-rpc.com',
    },
  ],
  [
    '0x64',
    {
      name: 'Gnosis Chain',
      chainId: 100,
      rpc: 'https://gnosis.drpc.org',
    },
  ],
]);
