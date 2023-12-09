import { getTokenAddress } from '../utils/index';
import { chainsfor1inch } from '../utils/maps';
import axios from 'axios';

export const swapUsing1inch = async (amount, token1, token2) => {
  var response='';
  const chain = await window.ethereum.request({ method: 'eth_chainId' });
  const chainId = chainsfor1inch.get(chain).chainId;
  const srcAddress = getTokenAddress(chain, token1);
  const dstAddress = getTokenAddress(chain, token2);
  const rpcURL = chainsfor1inch.get(chain).rpc;

  const accounts = await window.ethereum.request({ method: 'eth_accounts' });
  const walletAddress = accounts[0];
  // console.log((parseInt(amount)*(10**18)).toString())
  const swapParams = {
    src: srcAddress, // Token address of 1INCH
    dst: dstAddress, // Token address of DAI
    amount: (parseFloat(amount) * 10 ** 18).toString(), // Amount of 1INCH to swap (in wei)
    from: walletAddress,
    slippage: 1, // Maximum acceptable slippage percentage for the swap (e.g., 1 for 1%)
    disableEstimate: false, // Set to true to disable estimation of swap details
    allowPartialFill: false, // Set to true to allow partial filling of the swap order
  };
  const approveTxnBody = {
    chainId: chainId,
    web3RpcUrl: rpcURL,
    tokenAddress: srcAddress,
    walletAddress: walletAddress,
  };
  const txnforApprove = await axios
    .post('http://localhost:8181/buildApprovetxn', approveTxnBody)
    .then((res) => res.data);
  console.log('txnApprove:', txnforApprove);

  const txnA = await window.ethereum.request({
    method: 'eth_sendTransaction',
    params: [
      {
        data: txnforApprove.data,
        gasPrice: parseInt(txnforApprove.gasPrice).toString(16),
        to: txnforApprove.to,
        from: walletAddress,
        value: '0x0',
        gasLimit: parseInt(txnforApprove.gasLimit).toString(16),
      },
    ],
  });

  response+='Approve txn Hash: '+txnA+"\n";

  const swapTxnBody = {
    chainId: chainId,
    web3RpcUrl: rpcURL,
    swapParams: swapParams,
    walletAddress: walletAddress,
  };
  const { tx } = await axios
    .post('http://localhost:8181/buildSwaptxn', swapTxnBody)
    .then((res) => res.data);
  console.log('txnSwap:', tx);

  const txnS = await window.ethereum.request({
    method: 'eth_sendTransaction',
    params: [
      {
        data: tx.data,
        gasPrice: parseInt(tx.gasPrice).toString(16),
        to: tx.to,
        from: walletAddress,
        value: '0x0',
        gasLimit: parseInt(tx.gasLimit).toString(16),
      },
    ],
  });
  response+='Swap txn Hash: '+txnS+"\n";

  return response;
};
