import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import ConnectyCube from 'react-native-connectycube';

const userCredentials = {
  userId: 12326874,
  password: "Password",
};

const opponentId = 12326870; // The ID of the user you want to chat with

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const connectyCubeConfig = {
        appId: '7761',
        authKey: 'Vy9JRVRdGuHeF3S',
        authSecret: '5kzSSgk5b3uTDhn',
      };
    ConnectyCube.init(connectyCubeConfig); // Your ConnectyCube app credentials

    ConnectyCube.createSession(userCredentials)
      .then(() => ConnectyCube.chat.connect(userCredentials))
      .then(() => {
        ConnectyCube.chat.onMessageListener = onReceiveMessage;
      })
      .catch(error => console.error(error));
    
    return () => {
      ConnectyCube.chat.disconnect();
    };
  }, []);

  const onReceiveMessage = (userId, message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  const sendMessage = () => {
    const msg = {
      type: 'chat',
      body: message,
      extension: {
        save_to_history: 1,
        dialog_id: 'your_dialog_id', // Replace with your actual dialog ID
      },
      markable: 1
    };

    ConnectyCube.chat.send(opponentId, msg);
    setMessage('');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item.body}</Text>}
      />
      <TextInput
        value={message}
        onChangeText={setMessage}
        style={{ borderWidth: 1, width: '80%', marginBottom: 10 }}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

export default Chat;
