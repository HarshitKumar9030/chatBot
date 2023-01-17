const chatInput = document.getElementById("chat-input");
const chatButton = document.getElementById("chat-button");
const chatOutput = document.getElementById("chat-output");

const fetchChat = async (message) => {
  const response = await fetch(
    `https://harshitkumar9030-cuddly-invention-pq4g74jqw6r2764w-3000.preview.app.github.dev/chat?query=${message}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
};

chatButton.addEventListener("click", () => {
  const message = chatInput.value;
  chatInput.value = "";

  const userMessage = document.createElement("div");
  userMessage.innerHTML = `<b>You:</b> ${message}`;
  chatOutput.appendChild(userMessage);
  chatOutput.scrollTop = chatOutput.scrollHeight;

  fetchChat(message).then((data) => {
    const typingIndicator = document.createElement("div");
    typingIndicator.classList.add("typing-indicator");
    typingIndicator.innerHTML = "Bot is typing...";
    chatOutput.appendChild(typingIndicator);
    chatOutput.scrollTop = chatOutput.scrollHeight;

    setTimeout(() => {
      typingIndicator.remove();
      // Display bot message
      const botMessage = document.createElement("div");
      botMessage.classList.add("message", "bot");
      botMessage.innerHTML = data.message;
      chatOutput.appendChild(botMessage);
      chatOutput.scrollTop = chatOutput.scrollHeight;
    }, 2000);
  });
});
