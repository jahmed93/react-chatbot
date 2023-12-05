import { changeChain } from './changeChain';
import { sendTransaction } from './sendTransaction';
import { sendERC20Token } from './sendERC20';

export const transact = async (object) => {
  object.forEach((element) => {
    if (element.Tool === 'changeChain') {
      changeChain(element.Args[0].Value);
    } else if (element.Tool === 'sendTransaction') {
      sendTransaction(element.Args[1].Value, element.Args[0].Value);
    } else if (element.Tool === 'sendERC20Token') {
      sendERC20Token(element.Args[1].Value, element.Args[0].Value, element.Args[2].Value);
    }
  });
};
