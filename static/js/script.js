document.addEventListener('DOMContentLoaded', function () {
    var chat = document.getElementById('chat');
    var messageInput = document.getElementById('message');
    var sendButton = document.getElementById('send-button');
    var usernameInput = document.getElementById('username');

    sendButton.addEventListener('click', function () {
        sendMessage();
    });

    // Отправка сообщения на сервер
    function sendMessage() {
        console.log('sendMessage function called');
        var message = messageInput.value.trim();
        var username = usernameInput.value.trim();
        if (message !== '') {
            fetch('/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message })
            })
            .then(response => response.json())
            .then(data => {
                // Обработка ответа от сервера, если необходимо
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
