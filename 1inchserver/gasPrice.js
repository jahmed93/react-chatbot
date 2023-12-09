async function gasPrice(chainId) {
  const apiUrl = 'https://api.1inch.dev/gas-price/v1.4/137';
  const url = new URL(apiUrl);

  await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer 8RXFovUQwV8dc05bPX7LZfBv9qzeOorh',
    },
    params: { chain: chainId },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
console.log(gasPrice(1));
