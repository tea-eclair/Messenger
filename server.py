from flask import Flask, request, render_template, jsonify

app = Flask(__name__)

messages = []

@app.route('/send', methods=['POST'])
def send_message():
    global messages
    data = request.get_json()
    print('Received data:', data)
    if 'username' in data and 'message' in data:
        username = data['username']
        message = data['message']
        messages.append({'username': username, 'message': message})
        return jsonify({"status": "Message sent successfully"})
    else:
        return jsonify({"status": "Message format is incorrect"})

@app.route('/get', methods=['GET'])
def get_messages():
    global messages
    return jsonify(messages=messages)

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html', messages=messages)

if __name__ == '__main__':
    app.run(debug=True)
