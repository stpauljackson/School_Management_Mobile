import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeMessage = async (chatId, message) => {
    try {
        const storedMessages = await AsyncStorage.getItem(chatId);
        const messages = storedMessages ? JSON.parse(storedMessages) : [];
        messages.push(message);
        await AsyncStorage.setItem(chatId, JSON.stringify(messages));
    } catch (e) {
        console.error('Failed to save message.', e);
    }
};

export const getMessages = async (chatId) => {
    try {
        const storedMessages = await AsyncStorage.getItem(chatId);
        return storedMessages ? JSON.parse(storedMessages) : [];
    } catch (e) {
        console.error('Failed to load messages.', e);
        return [];
    }
};
