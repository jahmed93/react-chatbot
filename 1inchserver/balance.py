import requests

def get_token_balances(wallet_address):
    endpoint = f'https://api.1inch.dev/balance/v1.2/1/balances/{wallet_address}'
    response = requests.get(endpoint, headers={'Authorization': f'Bearer 8RXFovUQwV8dc05bPX7LZfBv9qzeOorh'})

    if response.status_code == 200:
        return response.json()
    else:
        print(f"Failed to fetch token balances. Error code: {response.status_code}")
        return None

def main():
    # Replace '0xYourWalletAddress' with the Ethereum wallet address you want to check
    wallet_address = '0xbF35B747A41f39Ad9BEc1DC84f2fEBd42c1d94e1'
    token_balances = get_token_balances(wallet_address)

    if token_balances:
        print(f"Token balances for wallet address {wallet_address}:")
        for token, balance in token_balances.items():
            print(f"{token}: {balance}")
    else:
        print("Token balance fetch failed. Please check your wallet address.")

if __name__ == '__main__':
    main()