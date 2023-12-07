import { chainMap } from '../utils/maps';
var Accounts = [];
export const changeChain = async (chainName) => {
  const getChainID = (chainName) => {
    const chain = chainName.toLowerCase();
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
    }
  };
  const userAccounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });

  Accounts = userAccounts;

  if (Accounts.length === 0) {
    await getAccount();
  }
  if (Accounts.length > 0) {
    const txHash = await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [
        {
          chainId: getChainID(chainName),
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
