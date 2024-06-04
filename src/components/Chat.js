import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import { getMessages, storeMessage } from './Storage';
import messaging from '@react-native-firebase/messaging';

const Chat = ({ recipientToken }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        const loadMessages = async () => {
            const storedMessages = await getMessages(chatId);
            setMessages(storedMessages);
        };
        loadMessages();

        // Listen for FCM messages
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
            if (remoteMessage.data) {
                const { message } = remoteMessage.data;
                const newMessage = { text: message, received: true };
                await storeMessage(chatId, newMessage);
                setMessages(prevMessages => [...prevMessages, newMessage]);
            }
        });

        return unsubscribe;
    }, [chatId]);

    const sendMessage = async () => {
        const newMessage = { text: input, received: false };
        await storeMessage(chatId, newMessage);
        setMessages([...messages, newMessage]);

        // Send a notification to the recipient for every new message
        const notificationMessage = {
            data: {
                chatId: chatId,
                message: input,
            },
            token: recipientToken,
        };

        try {
            await messaging().send(notificationMessage);
        } catch (error) {
            console.error('Failed to send notification message', error);
        }

        // Reset input field
        setInput('');
    };

    return (
        <View>
            <FlatList
                data={messages}
                renderItem={({ item }) => <Text>{item.text}</Text>}
                keyExtractor={(item, index) => index.toString()}
            />
            <TextInput value={input} onChangeText={setInput} />
            <Button title="Send" onPress={sendMessage} />
        </View>
    );
};

export default Chat;
