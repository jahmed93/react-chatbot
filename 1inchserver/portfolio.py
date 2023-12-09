import requests,time

def get_token_prices(chain_id, contract_address, currency, from_timestamp, to_timestamp):
    endpoint = 'https://api.1inch.dev/portfolio/v2/token_prices/time_range'
    payload = {
        'chain_id': chain_id,
        'contract_address': contract_address,
        'currency': currency,
        'granularity': 'day',
        'from_timestamp': from_timestamp,
        'to_timestamp': to_timestamp
    }
    print(payload)
    response = requests.post(endpoint, data=payload, headers={'Authorization': 'Bearer 8RXFovUQwV8dc05bPX7LZfBv9qzeOorh'})
    print(response)
    return response.json().get('prices', [])

def calculate_absolute_profit(chain_id, from_timestamp, to_timestamp, addresses):
    endpoint = 'https://api.1inch.dev/portfolio/v2/pnl/tokens_pnl/absolute_profit_by_portfolio_timerange'
    payload = {
        'chain_id': chain_id,
        'from_timestamp': from_timestamp,
        'to_timestamp': to_timestamp,
        'addresses': addresses
    }
    response = requests.post(endpoint, json=payload, headers={'Authorization': f'Bearer {"8RXFovUQwV8dc05bPX7LZfBv9qzeOorh"}'})
    return response.json()

def execute_swap(src, dst, amount, address, slippage=1.0):
    endpoint = 'https://api.1inch.dev/swap/v5.2/1/swap'
    payload = {
        'src': src,
        'dst': dst,
        'amount': amount,
        'from': address,
        'slippage': slippage
    }
    response = requests.post(endpoint, json=payload, headers={'Authorization': f'Bearer 8RXFovUQwV8dc05bPX7LZfBv9qzeOorh'})
    return response.json()

def main():
    # Set up your portfolio details
    chain_id = 1  # Mainnet Ethereum
    contract_address_eth = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'  # Example: Ethereum (ETH)
    contract_address_dai = '0x6B175474E89094C44Da98b954EedeAC495271d0F'  # Example: DAI stablecoin
    currency = 'usd'
    from_timestamp = 1625097600  # Example: July 1, 2021
    to_timestamp = 1627776000    # Example: July 31, 2021
    addresses = [contract_address_eth, contract_address_dai]

    # Get token prices
    eth_prices = get_token_prices(chain_id, contract_address_eth, currency, from_timestamp, to_timestamp)
    time.sleep(1)
    dai_prices = get_token_prices(chain_id, contract_address_dai, currency, from_timestamp, to_timestamp)

    print("Ethereum Prices:")
    print(eth_prices)
    print("DAI Prices:")
    print(dai_prices)

    # Calculate absolute profit
    profit_data = calculate_absolute_profit(chain_id, from_timestamp, to_timestamp, addresses)
    absolute_profit = profit_data.get('absolute_profit', 0)
    profit_currency = profit_data.get('currency', 'USD')

    print(f"Absolute Profit: {absolute_profit} {profit_currency}")

    # Execute a token swap
    from_token_address = contract_address_eth
    to_token_address = contract_address_dai
    amount_to_swap = 1.0  # Replace with the desired amount to swap
    user_address = '0xYourAddress'  # Replace with the user's Ethereum address

    swap_result = execute_swap(from_token_address, to_token_address, amount_to_swap, user_address)
    print("Swap Result:")
    print(swap_result)

if __name__ == '__main__':
    main()
