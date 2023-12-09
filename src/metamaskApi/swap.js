import { swapUsing1inch } from './swap1inch';
import { chainsfor1inch } from '../utils/maps';
import { sendTransaction } from './sendTransaction';

export const swap = async (amount, token1, token2) => {
  var response='';
  const chainId = await window.ethereum.request({ method: 'eth_chainId' });
  if (token1.toLowerCase() === chainsfor1inch.get(chainId).native) {
    const wrapHash = await sendTransaction(chainsfor1inch.get(chainId).wrappedAddress, amount);
    response+= "Wrap Hash: "+wrapHash+"\n"

    const swapHash = await swapUsing1inch(amount, chainsfor1inch.get(chainId).wrapped, token2);
    response+= "Swap Hash: "+swapHash+"\n"
  } else {
    const swapHash = await swapUsing1inch(amount, token1, token2);
    response+= "Swap Hash: "+swapHash+"\n"
  }
  return response;
};
