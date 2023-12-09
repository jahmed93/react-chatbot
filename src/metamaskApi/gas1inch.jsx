import { getChainId } from '../utils/index';
import axios from 'axios';

export const gas1inch = async (chain) => {
  const chainId = getChainId(chain.toLowerCase());
  const gasData = await axios
    .post('http://localhost:8181/gasPrice', {
      chainId: parseInt(chainId.slice(2), 16),
    })
    .then((res) => res.data);
  console.log('gasData:', gasData);
};
