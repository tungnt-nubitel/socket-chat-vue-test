<template>
  <div>
    <p v-if="isConnected">We're connected to the server!</p>
    <p>Message from server: "{{ socketMessage }}"</p>
    <button @click="newSession()">New Session</button>
    <button @click="newMessage()">New Message</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isConnected: false,
      socketMessage: "",
    };
  },

  sockets: {
    connect() {
      // Fired when the socket connects.
      this.isConnected = true;

      const data = {
        campaignId: "794ad291-f0c7-415b-823b-6bcbd7dd79b4",
        senderFrom: "test.client@email.com", // email
      };
      this.$socket.emit("socketClientStart", data);
    },

    disconnect() {
      this.isConnected = false;
    },

    // Fired when the server sends something on the "messageChannel" channel.
    newChatMessageToSocket(data) {
      this.socketMessage = data?.text;
    },
  },

  methods: {
    newSession() {
      // Send the "newSession" event to the server.
      const data = {
        campaignId: "794ad291-f0c7-415b-823b-6bcbd7dd79b4",
        conversationId: `794ad291-f0c7-415b-823b-6bcbd7ddtung`, // uuid unique
        senderFrom: "test.client@email.com", // email
        senderName: "Sender Name 1",
        createdAt: new Date(),
        chatChannel: "webChat", //whatsapp, telegram, app
        conversation: [
          {
            id: "message1",
            time: "2022-08-31T08:48:50.797Z",
            user: "client",
            type: "text",
            text: " Nhan text test tả 31356",
          },
          {
            id: "comessage2",
            time: "2022-08-31T08:48:50.797Z",
            user: "client",
            type: "image",
            text: "text test 2",
            fileUrl:
              "https://media.smooch.io/apps/6098d720bf936900d3066c73/conversations/d1ea195846b6150c0f5946ce/pt9-UALnt7NziBIg17O7R8zq/d8DebwWkjFKeBEfZgmUlzzbb.jpeg",
            fileType: "image/jpeg",
            fileName: "fileName tung",
          },
        ],
      };
      this.$socket.emit("addNewChatSession", data);
    },
    newMessage() {
      // Send the "newMessage" event to the server.
      const data = {
        campaignId: "794ad291-f0c7-415b-823b-6bcbd7dd79b4",
        conversationId: `794ad291-f0c7-415b-823b-6bcbd7ddtung`, // uuid unique
        senderFrom: "test.client@email.com",
        id: "messageUniqId",
        time: new Date(),
        user: "client",
        type: "text",
        text: "text new message",
      };
      this.$socket.emit("addNewChatMessage", data);
    },
  },
};
</script>