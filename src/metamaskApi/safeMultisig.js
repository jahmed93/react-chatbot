import Web3 from 'web3';
// import { Web3Adapter } from '@safe-global/protocol-kit'
import {
  Safe,
  SafeFactory,
  SafeAccountConfig,
  SafeTransactionOptionalProps,
} from '@safe-global/protocol-kit';
// import {SafeApiKit} from '@safe-global/api-kit'
// import { MetaTransactionData } from '@safe-global/safe-core-sdk-types'
// const Web3 = require('web3')

const getEthAdapter = async (safeOwner) => {
  const web3Provider = 'https://sepolia.infura.io/v3/087274a375d54c7a9d316110ead80cc9';
  const provider = new Web3.providers.HttpProvider(web3Provider);
  const web3 = new Web3(provider);
  const ethAdapter = new Web3Adapter({
    web3,
    signerAddress: safeOwner,
  });
  return ethAdapter;
};

export const makeSafe = async (owner, owners, threshold) => {
  const ethAdapter = await getEthAdapter(owner);
  const safeFactory = await SafeFactory.create({ ethAdapter });
  const safeAccountConfig = {
    owners: owners,
    threshold: threshold,
  };
  const safeSdk = await safeFactory.deploySafe({ safeAccountConfig });
  let safeAddress = await safeSdk.getAddress();

  return safeAddress;
};

export const createTransaction = async (owner, safeAddress, to, data, value) => {
  const ethAdapter = await getEthAdapter(owner);
  const safeSdk = await Safe.create({ ethAdapter, safeAddress });
  const transaction = [
    {
      to: to,
      data: data,
      value: value,
      operation: 0,
    },
  ];
  const safeTransaction = await safeSdk.createTransaction({ transaction });

  // propose transaction to others
  const safeTxHash = await safeSdk.getTransactionHash(safeTransaction);
  const senderSignature = await safeSdk.signTransactionHash(safeTxHash);
  await safeService.proposeTransaction({
    safeAddress,
    safeTransactionData: safeTransaction.data,
    safeTxHash,
    owner,
    senderSignature: senderSignature.data,
  });
};

export const getPendingTransactions = async (chainId) => {
  const safeService = new SafeApiKit({ chainId });
  const pendingTxs = await safeService.getPendingTransactions(safeAddress);
  return pendingTxs;
};

export const confirmTransaction = async (txHash) => {
  try {
    let signature = await safeSdk.signTransactionHash(txHash);
    await safeService.confirmTransaction(txHash, signature.data);
    const tx = await safeService.getTransaction(txHash);
    let isTransExec = isTransactionExecutable(tx.confirmationsRequired, tx);

    if (isTransExec) {
      // execute the transaction
      const executeTxResponse = await safeSdk.executeTransaction(tx);
      const receipt =
        executeTxResponse.transactionResponse &&
        (await executeTxResponse.transactionResponse.wait());
      const isValidTx = await safeSdk.isValidTransaction(tx);

      if (isValidTx) {
        return {
          message: 'Transaction Signed and Executed',
          receipt: receipt,
        };
      } else {
        return {
          message: 'Transaction failed to execute',
          receipt: receipt,
        };
      }
    }

    return {
      message: 'Transaction signed',
    };
  } catch {
    return {
      message: 'Error in signing',
    };
  }
};

const isTransactionExecutable = (safeThreshold, transaction) => {
  return transaction.confirmations.length >= safeThreshold;
};
