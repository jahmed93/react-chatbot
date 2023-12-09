import { swapUsing1inch } from './swap1inch';
import { chainsfor1inch } from '../utils/maps';
import { sendTransaction } from './sendTransaction';

export const swap = async (amount, token1, token2) => {
  const chainId = await window.ethereum.request({ method: 'eth_chainId' });
  if (token1.toLowerCase() === chainsfor1inch.get(chainId).native) {
    const unwrapHash = await sendTransaction(chainsfor1inch.get(chainId).wrappedAddress, amount);
    console.log(unwrapHash);

    const swapHash = await swapUsing1inch(amount, chainsfor1inch.get(chainId).wrapped, token2);
    console.log(swapHash);
  } else {
    const swapHash = await swapUsing1inch(amount, token1, token2);
    console.log(swapHash);
  }
};
