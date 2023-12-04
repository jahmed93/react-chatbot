export const changeChain = async (chainName) => {
  const chainMap = new Map([
    ['ethereum_mainnet', '0x1'],
    ['sepolia', '0xaa36a7'],
    ['rinkeby', '0x4'],
    ['ropsten', '0x3'],
    ['goerli', '0x5'],
    ['mumbai_testnet', '0x13881'],
    ['scroll', '0x82750'],
    ['arbitrum', '0xA4B1'],
  ]);
  const getChainID = (chainName) => {
    return chainMap.get(chainName.toLowerCase());
  };
  var Accounts = [];
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
