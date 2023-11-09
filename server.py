from flask import Flask, request, render_template, jsonify 
 
app = Flask(__name__) 
 
# In-memory storage for messages (Replace with a database in a real project) 
messages = [] 
 
@app.route('/send', methods=['POST']) 
def send_message():
    global messages
    data = request.get_json() 
    if 'message' in data: 
        message = data['message'] 
        messages.append(message) 
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
 
if __name__ == 'main': 
    app.run(debug=True)
