import { changeChain } from './changeChain';
import { sendTransaction } from './sendTransaction';

export const transact = async (object) => {
  object.forEach((element) => {
    if (element.Tool === 'changeChain') {
      changeChain(element.Args[0].Value);
    } else if (element.Tool === 'sendTransaction') {
      sendTransaction(element.Args[1].Value, element.Args[0].Value);
    }
  });
};
