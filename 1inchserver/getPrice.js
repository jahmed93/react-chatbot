async function getPriceForTokens(addresses) {
  const url = `https://api.1inch.dev/price/v1.1/1/${addresses.join(',')}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer 8RXFovUQwV8dc05bPX7LZfBv9qzeOorh',
      },
    });

    if (response.ok) {
      const prices = await response.json();
      console.log('Prices for requested tokens:');
      for (const [tokenAddress, price] of Object.entries(prices)) {
        console.log(`${tokenAddress}: ${price}`);
      }
    } else {
      console.log('Failed to fetch token prices.');
    }
  } catch (error) {
    console.error('Error fetching token prices:', error);
  }
}

addresses_to_fetch = [
  '0x111111111117dc0aa78b770fa6a738034120c302',
  '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
];
getPriceForTokens(addresses_to_fetch);
