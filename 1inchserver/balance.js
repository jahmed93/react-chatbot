async function getTokenBalances(walletAddress) {
  const endpoint = `https://api.1inch.dev/balance/v1.2/1/balances/${walletAddress}`;
  const tokenBalances = await fetch(endpoint, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer 8RXFovUQwV8dc05bPX7LZfBv9qzeOorh',
    },
  });

  if (tokenBalances.ok) {
    const balances = await tokenBalances.json();
    return balances;
  } else {
    console.error(`Failed to fetch token balances. Error code: ${tokenBalances.status}`);
    return null;
  }
}

async function fetchTokenBalances(walletAddress) {
  const tokenBalances = await getTokenBalances(walletAddress);

  if (tokenBalances) {
    console.log(`Token balances for wallet address ${walletAddress}:`);
    for (const [token, balance] of Object.entries(tokenBalances)) {
      if (balance != 0) {
        console.log(`${token}: ${balance}`);
      }
    }
  } else {
    console.log('Token balance fetch failed. Please check your wallet address.');
  }
}

fetchTokenBalances(walletAddress);
