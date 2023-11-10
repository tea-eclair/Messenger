document.addEventListener('DOMContentLoaded', function () {
    var usernameInput = document.getElementById('username');
    var messageInput = document.getElementById('message');
    var sendButton = document.getElementById('send-button');

    sendButton.addEventListener('click', function () {
        sendMessage();
    });

    function sendMessage() {
        var username = usernameInput.value.trim();
        var message = messageInput.value.trim();

        if (message !== '') {
            fetch('/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: username, message: message }),
            })
            .then(response => response.json())
            .then(data => {
                // Handle the server's response, if needed
                updateChat();
            });
            messageInput.value = '';
        }
    }

    // Обновление сообщений на клиенте
    function updateChat() {
        fetch('/get')
            .then(response => response.json())
            .then(data => {
                var messages = data.messages;
                chat.innerHTML = ''; // Очистить чат
                messages.forEach(function (message) {
                    appendMessage(message);
                });
                scrollChatToBottom();
            });
    }

    // Отображение сообщения в чате
    function appendMessage(message) {
        var messageDiv = document.createElement('div');
        messageDiv.textContent = message.username + ': ' + message.message;
        chat.appendChild(messageDiv);
        
    }
    
    function scrollChatToBottom() {
        var chat = document.getElementById('chat');
        chat.scrollTop = chat.scrollHeight;
    }
    
    // Вызов функции для обновления чата при загрузке страницы
    updateChat();
    
});
