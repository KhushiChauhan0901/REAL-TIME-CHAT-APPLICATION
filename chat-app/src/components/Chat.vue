<html> 
<head> 
</head>
<body>
<template>
  <div class="chat-container">
    <div class="message-history" ref="messageHistory">
      <div v-for="(msg, index) in messages" :key="index" class="message">
        <strong>{{ msg.sender }}:</strong> {{ msg.text }}
      </div>
    </div>
    <input
      type="text"
      v-model="messageInput"
      @keyup.enter="sendMessage"
      placeholder="Type a message..."
    />
    <button @click="sendMessage">Send</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messageInput: "",
      messages: [],
    };
  },
  methods: {
    sendMessage() {
      if (this.messageInput.trim()) {
        this.messages.push({
          sender: "You",
          text: this.messageInput,
        });
        this.messageInput = ""; // Clear input
        this.$nextTick(() => {
          // Scroll to the bottom after the message is added
          this.$refs.messageHistory.scrollTop = this.$refs.messageHistory.scrollHeight;
        });
      }
    },
  },
};
</script>

<style scoped>
.chat-container {
  width: 400px;
  height: 500px;
  border: 1px solid #ccc;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  background-color: white;
}

.message-history {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.message {
  margin-bottom: 10px;
}

.message input {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
</body>
</html>