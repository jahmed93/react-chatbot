import { changeChain } from './changeChain';
import { sendTransaction } from './sendTransaction';
import { sendERC20Token } from './sendERC20';

export const transact = async (object) => {
  for (const element of object) {
    if (element.Tool === 'changeChain') {
      await changeChain(element.Args[0].Value);
    } else if (element.Tool === 'sendTransaction') {
      await sendTransaction(element.Args[1].Value, element.Args[0].Value);
    } else if (element.Tool === 'sendERC20Token') {
      await sendERC20Token(element.Args[1].Value, element.Args[0].Value, element.Args[2].Value);
    }
  }
};
