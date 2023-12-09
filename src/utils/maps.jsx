export const erc20AddressMap = new Map([
  [
    '0x1',
    {
      eth: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      weth: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      usdc: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      dai: '0x6b175474e89094c44da98b954Eedeac495271d0f',
      uni: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
      link: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
    },
  ],
  [
    '0x38',
    {
      usdc: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
      wbnb: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      oneinch: '0x111111111117dC0aa78b770fA6A738034120C302',
      bnb: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    },
  ],
]);
// map of chain id to erc20 token address

export const tokenDecimalMap = new Map([
  ['wbnb', 18],
  ['1inch', 18],
  ['eth', 18],
  ['usdc', 6],
  ['dai', 18],
  ['uni', 18],
  ['link', 18],
]);
// map of erc20tokenName to decimal

export const chainMap = new Map([
  ['linea', '0xe708'],
  ['zkevm', '0x44d'],
  ['bsc', '0x38'],
  ['xdai', '0x64'],
  ['polygon', '0x89'],
  ['gnosis', '0x64'],
  ['base', '0x2105'],
  ['ethereum_mainnet', '0x1'],
  ['sepolia', '0xaa36a7'],
  ['goerli', '0x5'],
  ['mumbai_testnet', '0x13881'],
  ['scroll', '0x82750'],
  ['arbitrum', '0xA4B1'],
]);

export const chainsfor1inch = new Map([
  [
    '0x38',
    {
      wrappedAddress: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      native: 'bnb',
      wrapped: 'wbnb',
      name: 'BSC',
      chainId: 56,
      rpc: 'https://bsc-dataseed.binance.org',
    },
  ],
  [
    '0xe708',
    {
      wrappedAddress: '0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f',
      wrapped: 'weth',
      native: 'eth',
      name: 'Linea',
      chainId: 59144,
      rpc: 'https://linea.drpc.org',
    },
  ],
  [
    '0x1',
    {
      wrappedAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      wrapped: 'weth',
      native: 'eth',
      name: 'Ethereum',
      chainId: 1,
      rpc: 'https://eth.llamarpc.com',
    },
  ],
  [
    '0xa4b1',
    {
      wrappedAddress: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
      wrapped: 'weth',
      native: 'eth',
      name: 'Arbitrum',
      chainId: 42161,
      rpc: 'https://1rpc.io/arb',
    },
  ],
  [
    '0x1388',
    {
      wrappedAddress: '0x78c1b0C915c4FAA5FffA6CAbf0219DA63d7f4cb8',
      wrapped: 'wmnt',
      native: 'mnt',
      name: 'Mantle',
      chainId: 5000,
      rpc: 'https://1rpc.io/mantle',
    },
  ],
  [
    '0x2105',
    {
      wrappedAddress: '0x4200000000000000000000000000000000000006',
      wrapped: 'weth',
      native: 'eth',
      name: 'BASE',
      chainId: 8453,
      rpc: 'https://base.llamarpc.com',
    },
  ],
  [
    '0x32',
    {
      wrappedAddress: 'xdc8A3cc832Bb6B255622E92dc9d4611F2A94d200DA',
      wrapped: 'wxdc',
      native: 'xdc',
      name: 'XDC Network',
      chainId: 50,
      rpc: 'https://rpc.ankr.com/xdc',
    },
  ],
  // polygon
  [
    '0x89',
    {
      wrappedAddress: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
      wrapped: 'wmatic',
      native: 'matic',
      name: 'Polygon',
      chainId: 137,
      rpc: 'https://polygon-rpc.com',
    },
  ],
  [
    '0x64',
    {
      wrappedAddress: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
      wrapped: 'wxdai',
      native: 'xdai',
      name: 'Gnosis Chain',
      chainId: 100,
      rpc: 'https://gnosis.drpc.org',
    },
  ],
]);
