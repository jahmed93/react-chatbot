export const formatBalance = (rawBalance) => {
  const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2);
  return balance;
};

export const formatChainAsNum = (chainIdHex) => {
  const chainIdNum = parseInt(chainIdHex);
  return chainIdNum;
};

export const hexNum = (amount) => {
  const hexAmount = (parseFloat(amount) * 1000000000000000000).toString(16);
  return hexAmount;
};

export const toBase = async (amount, n) => {
  return (parseFloat(amount) * 10 ** n).toString();
};
