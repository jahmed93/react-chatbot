import { erc20AddressMap, tokenDecimalMap } from '../utils/maps';
import { toBase } from '../utils/index';
import Web3 from 'web3';
import { chainsfor1inch } from '../utils/maps';

const getTokenAddress = (chain, token) => {
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
  }
};

export const swapUsing1inch = async (amount, token1, token2) => {
  const chainId = await window.ethereum.request({
    method: 'eth_chainId',
    params: [],
  });
  var account;
  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
    params: [],
  });
  account = accounts[0];

  const swapParams = {
    src: getTokenAddress(chainId, token1),
    dst: getTokenAddress(chainId, token2),
    amount: toBase(amount, tokenDecimalMap.get(token1)),
    from: account,
    slippage: 1,
    disableEstimate: false,
    allowPartialFill: false,
  };

  const broadcastApiUrl =
    'https://api.1inch.dev/tx-gateway/v1.1/' + chainsfor1inch.get(chainId).chainId + '/broadcast';
  const apiBaseUrl = 'https://api.1inch.dev/swap/v5.2/' + chainsfor1inch.get(chainId).chainId;
  const web3 = new Web3(chainsfor1inch.get(chainId).rpc);
  const header = new Headers();
  header.append('Authorization', 'Bearer 5AsU5gLFkW6zKJX4iiDq4oowWh44BtsX');
  header.append('Accept', 'application/json');
  const reqinfo = {
    headers: header,
  };

  // Construct full API request URL
  function apiRequestUrl(methodName, queryParams) {
    return apiBaseUrl + methodName + '?' + new URLSearchParams(queryParams).toString();
  }
  const headers2 = new Headers();
  headers2.append('Content-Type', 'application/json');
  headers2.append('Authorization', 'Bearer 5AsU5gLFkW6zKJX4iiDq4oowWh44BtsX');
  // Post raw transaction to the API and return transaction hash
  async function broadCastRawTransaction(rawTransaction) {
    return fetch(broadcastApiUrl, {
      method: 'post',
      body: JSON.stringify({ rawTransaction }),
      headers: headers2,
    })
      .then((res) => res.json())
      .then((res) => {
        return res.transactionHash;
      });
  }

  // Sign and post a transaction, return its hash
  async function signAndSendTransaction(transaction) {
    const { rawTransaction } = await window.ethereum.request({
      method: 'eth_signTransaction',
      params: [transaction],
    });

    return await broadCastRawTransaction(rawTransaction);
  }

  async function buildTxForApproveTradeWithRouter(tokenAddress, amount) {
    const url = apiRequestUrl(
      '/approve/transaction',
      amount ? { tokenAddress, amount } : { tokenAddress },
    );
    const transaction = await fetch(url, reqinfo).then((res) => res.json());

    const gasLimit = await web3.eth.estimateGas({
      ...transaction,
      from: account,
    });

    return {
      ...transaction,
      gas: gasLimit,
    };
  }

  const transactionForSign = await buildTxForApproveTradeWithRouter(swapParams.src);
  console.log('Transaction for approve: ', transactionForSign);

  const approveTxHash = await signAndSendTransaction(transactionForSign);
  console.log('Approve tx hash: ', approveTxHash);

  async function buildTxForSwap(swapParams) {
    const url = apiRequestUrl('/swap', swapParams);

    // Fetch the swap transaction details from the API
    return fetch(url, reqinfo)
      .then((res) => res.json())
      .then((res) => res.tx);
  }

  const swapTransaction = await buildTxForSwap(swapParams);
  console.log('Transaction for swap: ', swapTransaction);

  const swapTxHash = await signAndSendTransaction(swapTransaction);
  console.log('Swap tx hash: ', swapTxHash);
};
