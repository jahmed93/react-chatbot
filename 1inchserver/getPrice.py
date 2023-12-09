import requests

def getAllTokenPrices():
    url = "https://api.1inch.dev/price/v1.1/1"

    response = requests.get(url,  headers={'Authorization': f'8RXFovUQwV8dc05bPX7LZfBv9qzeOorh'})
    if response.status_code == 200:
        prices = response.json()
        print("Prices for whitelisted tokens:")
        for token_address, price in prices.items():
            print(f"{token_address}: {price}")
    else:
        print("Failed to fetch token prices.")

def getPriceForTokens(addresses):
    url = f"https://api.1inch.dev/price/v1.1/1/{','.join(addresses)}"

    response = requests.get(url, headers={'Authorization': f'8RXFovUQwV8dc05bPX7LZfBv9qzeOorh'})
    if response.status_code == 200:
        prices = response.json()
        print("Prices for requested tokens:")
        for token_address, price in prices.items():
            print(f"{token_address}: {price}")
    else:
        print("Failed to fetch token prices.")

addresses_to_fetch = ["0x111111111117dc0aa78b770fa6a738034120c302", "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"]
getPriceForTokens(addresses_to_fetch)