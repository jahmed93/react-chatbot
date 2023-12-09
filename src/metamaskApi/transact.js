import { changeChain } from './changeChain';
import { sendTransaction } from './sendTransaction';
import { sendERC20Token } from './sendERC20';
import { swap } from './swap';
import { gas1inch } from './gas1inch';
import { balance1inch } from './getBalances';
import { price1inch } from './price1inch';
import { callContractFunction } from './callContractFunction';

export const transact = async (object) => {
  for (const element of object) {
    if (element.Tool === 'changeChain') {
      await changeChain(element.Args[0].Value);
    } else if (element.Tool === 'sendTransaction') {
      await sendTransaction(element.Args[1].Value, element.Args[0].Value);
    } else if (element.Tool === 'sendERC20Token') {
      await sendERC20Token(element.Args[1].Value, element.Args[0].Value, element.Args[2].Value);
    } else if (element.Tool === 'swapCurrency') {
      await swap(element.Args[0].Value, element.Args[1].Value, element.Args[2].Value);
    } else if (element.Tool === 'gas1inch') {
      await gas1inch(element.Args[0].Value);
    } else if (element.Tool === 'getBalance') {
      await balance1inch();
    } else if (element.Tool === 'price1inch') {
      await price1inch(element.Args[0].Value, element.Args[1].Value);
    } else if (element.Tool === 'gasApi') {
      await gasApi(element.Args[0].Value);
    } else if (element.Tool === 'callContractFunction') {
      await callContractFunction(
        element.Args[0].Value,
        element.Args[2].Value,
        element.Args[3].Value,
        element.Args[4].hash,
      );
    }
  }
};
