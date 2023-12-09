import json

def read_json_file(file_path):
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
            print(data)
            # Convert JSON data to a string with newlines separated by \n
            json_string = '\\n'.join(json.dumps(data, indent=4).split('\n'))
            return json_string
    except FileNotFoundError:
        return "File not found."
    except json.JSONDecodeError:
        return "Invalid JSON format in the file."

# Replace 'file.json' with your JSON file's path
file_path = 'tools.json'
result = read_json_file(file_path)
print(('\\"'.join(result.split('"')) ))
