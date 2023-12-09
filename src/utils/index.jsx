export const formatBalance = (rawBalance) => {
  const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2);
  return balance;
};

export const formatChainAsNum = (chainIdHex) => {
  const chainIdNum = parseInt(chainIdHex);
  return chainIdNum;
};

export const hexNum = (amount) => {
  const hexAmount = (parseFloat(amount) * 1000000000000000000).toString(16);
  return hexAmount;
};

export const toBase = async (amount, n) => {
  return (parseFloat(amount) * 10 ** n).toString();
};
import { chainMap } from './maps';
export const getChainId = (chain) => {
  if (
    chain === 'ethereum_mainnet' ||
    chain === 'mainnet' ||
    chain === 'main_net' ||
    chain === 'main-net' ||
    chain === 'eth' ||
    chain === 'ethereum' ||
    chain === 'ethereummainnet' ||
    chain === 'ethereum_mainnet' ||
    chain === 'ethereum-mainnet'
  ) {
    return chainMap.get('ethereum_mainnet');
  } else if (
    chain === 'sepolia' ||
    chain === 'sepolia_testnet' ||
    chain === 'sepoliatestnet' ||
    chain === 'sepolia-testnet' ||
    chain === 'sepolia_test_net' ||
    chain === 'sepoliatest_net' ||
    chain === 'sepolia-test_net' ||
    chain === 'sepolia_test-net' ||
    chain === 'sepoliatest-net' ||
    chain === 'sepolia-test-net'
  ) {
    return chainMap.get('sepolia');
  } else if (
    chain === 'goerli' ||
    chain === 'goerli_testnet' ||
    chain === 'goerlitestnet' ||
    chain === 'goerli-testnet' ||
    chain === 'goerli_test_net' ||
    chain === 'goerlitest_net' ||
    chain === 'goerli-test_net' ||
    chain === 'goerli_test-net' ||
    chain === 'goerlitest-net' ||
    chain === 'goerli-test-net'
  ) {
    return chainMap.get('goerli');
  } else if (
    chain === 'polygon_testnet' ||
    chain === 'polygon_mumbai' ||
    chain === 'polygontestnet' ||
    chain === 'mumbai' ||
    chain === 'mumbai_testnet' ||
    chain === 'mumbaitestnet' ||
    chain === 'mumbai-testnet' ||
    chain === 'mumbai_test_net' ||
    chain === 'mumbaitest_net' ||
    chain === 'mumbai-test_net' ||
    chain === 'mumbai_test-net' ||
    chain === 'mumbaitest-net' ||
    chain === 'mumbai-test-net'
  ) {
    return chainMap.get('mumbai_testnet');
  } else if (
    chain === 'scroll' ||
    chain === 'scroll_chain' ||
    chain === 'scrollchain' ||
    chain === 'scroll-chain' ||
    chain === 'scroll_chain' ||
    chain === 'scrollchain' ||
    chain === 'scroll-chain' ||
    chain === 'scroll_chain' ||
    chain === 'scrollchain' ||
    chain === 'scroll-chain' ||
    chain === 'scroll network' ||
    chain === 'scroll-network' ||
    chain === 'scrollnetwork' ||
    chain === 'scroll_network' ||
    chain === 'scroll_network' ||
    chain === 'scrollnetwork' ||
    chain === 'scroll_network' ||
    chain === 'scrollnetwork' ||
    chain === 'scroll_network' ||
    chain === 'scrollnetwork'
  ) {
    return chainMap.get('scroll');
  } else if (
    chain === 'arbitrum' ||
    chain === 'arbitrum_testnet' ||
    chain === 'arbitrumtestnet' ||
    chain === 'arbitrum-testnet' ||
    chain === 'arbitrum_test_net' ||
    chain === 'arbitrumtest_net' ||
    chain === 'arbitrum-test_net' ||
    chain === 'arbitrum_test-net' ||
    chain === 'arbitrumtest-net' ||
    chain === 'arbitrum-test-net'
  ) {
    return chainMap.get('arbitrum');
  } else if (
    chain === 'xdai' ||
    chain === 'xdai_chain' ||
    chain === 'xdaichain' ||
    chain === 'xdai-chain' ||
    chain === 'xdai_chain' ||
    chain === 'xdaichain' ||
    chain === 'xdai-chain' ||
    chain === 'xdai_chain' ||
    chain === 'xdaichain' ||
    chain === 'xdai-chain' ||
    chain === 'xdai_chain' ||
    chain === 'xdaichain' ||
    chain === 'xdai-chain' ||
    chain === 'xdai_chain' ||
    chain === 'xdaichain' ||
    chain === 'xdai-chain' ||
    chain === 'xdai_chain' ||
    chain === 'xdaichain' ||
    chain === 'xdai-chain'
  ) {
    return chainMap.get('xdai');
  } else if (chain === 'bsc' || chain === 'binance' || chain === 'binance smart chain') {
    return chainMap.get('bsc');
  } else if (chain === 'polgon' || chain === 'polygon-mainnet' || chain === 'polygon mainnet') {
    return chainMap.get('polygon');
  }
};
import { erc20AddressMap } from './maps';

export const getTokenAddress = (chain, token) => {
  switch (token) {
    case 'eth':
      return erc20AddressMap.get(chain).eth;
    case 'usdc':
      return erc20AddressMap.get(chain).usdc;
    case 'dai':
      return erc20AddressMap.get(chain).dai;
    case 'uni':
      return erc20AddressMap.get(chain).uni;
    case 'link':
      return erc20AddressMap.get(chain).link;
    case '1inch':
      return erc20AddressMap.get(chain).oneinch;
    case 'wbnb':
      return erc20AddressMap.get(chain).wbnb;
    case 'weth':
      return erc20AddressMap.get(chain).weth;
    case 'bnb':
      return erc20AddressMap.get(chain).bnb;
  }
};
