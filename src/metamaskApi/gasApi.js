import axios from 'axios';
import { getChainId } from '../utils/index';
export const gasAPI = async (chain) => {
  const chainId = parseInt(getChainId(chain.toLowerCase()).slice(2), 16);
  const { data } = await axios('http://localhost:8181/gasApi', {
    method: 'POST',
    data: {
      chainId: chainId,
    },
  });
  console.log(data);
  return data;
};
