import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {GiftedChat,Send,InputToolbar  } from 'react-native-gifted-chat';
import ConnectyCube from 'react-native-connectycube';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ChatHeader from './ChatHeader';
const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={{ marginBottom:10 , marginRight: 10 }}>
          <Ionicons name="send" size={24} color="#0084ff" />
        </View>
      </Send>
    );
  }
  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          borderTopWidth: 1,
          borderTopColor: '#e6e6e6',
          padding: 5,
        }}
      />
    );
  };

const ChatScreen = ({route,navigation}) => {
  const {recipient} = route?.params;
  const user = useSelector(state => state?.Auth?.user);
  const [messages, setMessages] = useState([]);

  const sender_id = "12326874"
  const recipient_id = "12326870"

  useEffect(() => {
    initConnectyCube();
    return () => {
      unsubscribeFromChat();
    };
  }, []);

  const initConnectyCube = () => {
    const connectyCubeConfig = {
      appId: '7761',
      authKey: 'Vy9JRVRdGuHeF3S',
      authSecret: '5kzSSgk5b3uTDhn',
    };
    ConnectyCube.init(connectyCubeConfig);
    const userCredentials = {};

    ConnectyCube.createSession(sender_id, "Password")
      .then(session => {
        console.log('logged in successfully');
        console.log('session',session);
        const sessionCreds = {
            userId: sender_id,
            password: "Password",
          };
          
          ConnectyCube.chat
            .connect(sessionCreds)
            .then(() => {
              // connected
              console.log('connected')
            })
            .catch((error) => {});
        subscribeToChat();
      })
      .catch(error => {
        console.log('ConnectyCube login error:', error);
      });
  };
  const subscribeToChat = () => {
    // Subscribe to chat events using ConnectyCube
    ConnectyCube.chat.onMessageListener = onReceiveMessage;
  };

  const unsubscribeFromChat = () => {
    // Unsubscribe from chat events
    ConnectyCube.chat.onMessageListener = null;
  };

  const onReceiveMessage = (userId, message) => {
    // Handle incoming messages
    const newMessage = {
      _id: message.id,
      text: message.body,
      createdAt: new Date(message.date_sent * 1000),
      user: {
        _id: message.sender_id,
      },
    };
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessage),
    );
  };

  const onSend = (newMessages = []) => {
    console.log('newMessages', newMessages);
    newMessages?.forEach(message => {
      const chatMessage = {
        type: 'chat',
        body: message.text,
        extension: {
          save_to_history: 1,
        },
      };
    
      ConnectyCube.chat.send(recipient_id, chatMessage, (error, messageId) => {
        if (error) {
          console.log('Error sending message:', error);
        } else {
          console.log('Message sent successfully:', messageId);
        }
      });
    });
  
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages),
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
    <ChatHeader name={`${recipient.firstName} ${recipient.lastName}`} navigation={navigation}  />
    <GiftedChat
      messages={messages}
      onSend={onSend}
      renderSend={renderSend}
      user={{
        _id: user,
      }}
    />
    </View>
  );
};

export default ChatScreen;
