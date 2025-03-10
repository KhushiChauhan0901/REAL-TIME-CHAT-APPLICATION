// Get elements
const messageInput = document.getElementById("messageInput");
const sendMessageButton = document.getElementById("sendMessageButton");
const messageHistory = document.getElementById("messageHistory");

// Function to send a message
function sendMessage() {
  const messageText = messageInput.value.trim();

  if (messageText === "") return;

  // Create a message element
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");
  messageDiv.innerHTML = `<span class="sender">You:</span> ${messageText}`;

  // Append message to history
  messageHistory.appendChild(messageDiv);

  // Clear the input field
  messageInput.value = "";

  // Scroll to the bottom
  messageHistory.scrollTop = messageHistory.scrollHeight;
}

// Event listener for sending message
sendMessageButton.addEventListener("click", sendMessage);

// Event listener for pressing "Enter" to send a message
messageInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});
