import requests

method = "get"
apiUrl = "https://api.1inch.dev/gas-price/v1.4/137"
requestOptions = {
      "headers": {
  "Authorization": "Bearer 8RXFovUQwV8dc05bPX7LZfBv9qzeOorh"
},
      "body": {},
      "params": {}
}

# Prepare request components
headers = requestOptions.get("headers", {})
body = requestOptions.get("body", {})
params = requestOptions.get("params", {100})


response = requests.get(apiUrl, headers=headers, params=params)

print(response.json())