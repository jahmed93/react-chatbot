from flask import Flask, request, jsonify
import logging
from openai import OpenAI
from flask_cors import CORS
import json
from web3 import Web3

client = OpenAI(
    api_key="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",
)

logging.basicConfig(filename='record.log', level=logging.DEBUG)
app = Flask(__name__)
CORS(app)

def reply(prompt):
    response = client.chat.completions.create(
        model="gpt-4-1106-preview",
        messages=[
            {
                "role": "system",
                "content": "You are an AI assistant at an organisation. that organisation has the following toolset at its disposal.Before any transaction always check the chain if chain is specified  and check the current balance [\n    {\n        \"Tool\": \"sendTransaction\",\n        \"Description\": \"Send a particular amount to a particular address on the same chain\",\n        \"Args\": [\n            {\n                \"Name\": \"amount\",\n                \"Description\": \"Amount to send\",\n                \"Type\": \"Number\"\n            },\n            {\n                \"Name\": \"address\",\n                \"Description\": \"Address to send to\",\n                \"Type\": \"Address\"\n            }\n        ]\n    },\n    {\n        \"Tool\": \"changeChain\",\n        \"Description\": \"Change the chain that the node is connected to\",\n        \"Args\": [\n            {\n                \"Name\": \"chain\",\n                \"Description\": \"Chain to connect to\",\n                \"Type\": \"String\"\n            }\n        ]\n    },\n    {\n        \"Tool\": \"sendERC20Token\",\n        \"Description\": \"send an amount to an address on same chain if the token to be the sent is not the native token of the chain to be sent. The native token of ethereum is eth , polygon is matic\",\n        \"Args\": [\n            {\n                \"Name\": \"amount\",\n                \"Description\": \"Amount to send\",\n                \"Type\": \"Number\"\n            },\n            {\n                \"Name\": \"address\",\n                \"Description\": \"Address to send to\",\n                \"Type\": \"Address\"\n            },\n            {\n                \"Name\": \"tokenName\",\n                \"Description\": \"Name of the token to send\",\n                \"Type\": \"String\"\n            }\n        ]\n    },\n    {\n        \"Tool\": \"getBalance\",\n        \"Description\": \"get the balance of the current user to see if transaction is possible\",\n        \"Args\": []\n    },\n    {\n        \"Tool\": \"getChainId\",\n        \"Description\": \"get the current chain on which the user is present\",\n        \"Args\": []\n    },\n    {\n        \"Tool\": \"swapCurrency\",\n        \"Description\": \"Exchange one token for another different token\",\n        \"Args\": [\n            {\n                \"Name\": \"amount\",\n                \"Description\": \"Amount to send\",\n                \"Type\": \"Number\"\n            },\n            {\n                \"Name\": \"tokenName\",\n                \"Description\": \"Name of the token to send\",\n                \"Type\": \"String\"\n            },\n            {\n                \"Name\": \"tokenName2\",\n                \"Description\": \"Name of the token to exchange with\",\n                \"Type\": \"String\"\n            }\n        ]\n    },\n    {\n        \"Name\": \"callContractFunction\",\n        \"Description\": \"Call a contract function at a particular address with particular values of the same type as present in the function signature and return the function signature given in the prompt\",\n        \"Args\": [\n            {\n                \"Name\": \"contractAddress\",\n                \"Description\": \"contractAddress to call\",\n                \"Type\": \"string\"\n            },\n            {\n                \"Name\": \"contractfunction\",\n                \"Description\": \"The function signature\",\n                \"Type\": \"string\"\n            },\n            {\n                \"Name\": \"Values\",\n                \"Description\": \"Arguments for the function\",\n                \"Type\": \"Array\"\n            },\n            {\n                \"Name\": \"valueTypes\",\n                \"Description\": \"datatype of the arguments\",\n                \"Type\": \"Array\"\n            }\n        ]\n    }\n] Return response like this only without any backticks and other verbose [{\"Tool\": \"changeChain\", \"Args\": [{\"Name\": \"chain\", \"Value\": \"sepolia\"}]}, {\"Tool\": \"sendTransaction\", \"Args\": [{\"Name\": \"amount\", \"Value\": 5}]}]"

            },
            {
                "role": "user",
                "content": f"{prompt}"
            }
        ],
        temperature=0.1,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )
    return response.choices[0].message.content


def json_func(json_array):
  json_array = json.loads(json_array)
  response = client.chat.completions.create(
          model="gpt-4-1106-preview",
          messages=[
              {
                  "role": "system",
                  "content" : "Give me the json of the function. The output shoul be of format [{\"Name\": \"\",\"Parameters\":[{\"Name\": \"\",\"Type\": \"\"} ]}] without any triple backticks , any other verbose and any other statement in output"

              },
              {
                  "role": "user",
                  "content": json_array[0]['Args'][1]['Value']
              }
          ],
          temperature=0.1,
      top_p=1,
      frequency_penalty=0,
      presence_penalty=0
      )
  output = json.loads(response.choices[0].message.content)
  func_name = str(output[0]['Name']) +'('
  for i in range(len(output[0]['Parameters'])):
    if i == len(output[0]['Parameters'])-1:
      func_name += str(output[0]['Parameters'][i]['Type']) + ')'
    else:
      func_name += str(output[0]['Parameters'][i]['Type']) + ','
  print(func_name)
  byte = Web3.keccak(text=func_name)
  hash = byte.hex()
  print(hash)
  return (hash[0:10])




def check_format(reply):
    with open("tools.json", 'r') as file:
        format = json.load(file)
    try:
        reply = json.loads(reply)

        for tool in reply:
            print(tool)
            for tool_format in format:
                if tool['Tool'] == tool_format['Tool']:
                    print(tool_format['Tool'])
                    if len(tool_format['Args']) != 0:
                        if len(tool_format['Args']) != len(tool['Args']):
                            return False
                        for i in range(len(tool_format['Args'])):
                            if 'Value' not in tool['Args'][i]:
                                return False
    except Exception as e:
        return True

    return True

            
# #reply ="[{\"Tool\": \"changeChain\", \"Args\": [{\"Name\": \"chain\", \"Value\": \"sepolia\"}]}, {\"Tool\": \"sendTransaction\", \"Args\": [{\"Name\": \"amount\", \"Value\": 5}, {\"Name\": \"address\"}]}]"
# reply = "Hello"
# print(reply)
# json_reply = json.dumps(reply)
# print(json.loads(json_reply))
# print(type(json_reply))
# print(check_format(reply))

@app.route('/',methods=['POST'])
def prompt():
    data = request.get_json()
    prompt = data.get('prompt') 
    response = reply(prompt)
    logging.info(f"Prompt: {prompt}")
    logging.info(f"Response: {response}")
    check = check_format(response)
    if (check == False):
        response = reply(prompt)
    output = json.loads(response)
    print(output)
    if output[0]["Tool"] == "callContractFunction":
        hex = json_func(response)
        output[0]["Args"].append({"hash" : hex})
    output = json.dumps(output)
    return jsonify(output)

@app.route('/response',methods = ['POST'])
def response():
    data = request.get_json()
    prompt = data.get('prompt') 

    response = client.chat.completions.create(
        model="gpt-4-1106-preview",
        messages=[
            {
                "role": "system",
                "content" : "Rewrite the following prompt in a better way"
            },
            {
                "role": "user",
                "content": f"{prompt}"
            }
        ],
        temperature=0.7,
    )

    logging.info(f"Prompt: {prompt}")
    logging.info(f"Response: {response.choices[0].message.content}")
    
    return jsonify(response.choices[0].message.content)

if __name__ == '__main__':
    app.run()