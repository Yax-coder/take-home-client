import React, { createContext, useContext, useState, useEffect } from 'react';
import { baseUrl } from '../utils/services';

interface Message {
    _id: string;
    sender: string;
    receiver: string;
    content: string;
    subject: string;
    isRead: boolean;
    timestamp: Date;
}

interface UserMessagesContextType {
    messages: Message[];
    messageCount: number;
    loading: boolean;
    error: string | null;
    fetchMessages: () => void;
}

const UserMessagesContext = createContext<UserMessagesContextType | undefined>(undefined);

export const useUserMessagesContext = () => {
    const context = useContext(UserMessagesContext);
    if (!context) {
        throw new Error('useUserMessagesContext must be used within a UserMessagesProvider');
    }
    return context;
};

interface UserMessagesProviderProps {
    userId: string;
    children: React.ReactNode;
}

export const UserMessagesProvider: React.FC<UserMessagesProviderProps> = ({ userId, children }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageCount, setMessageCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const fetchMessages = async () => {
        try {
            const response = await fetch(`${baseUrl}/messages/receiver/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch messages');
            }
            const data: Message[] = await response.json();
            setMessages(data);
            setMessageCount(data.length);
            setLoading(false);
        } catch (error) {
            setError(error.message as string);
            setLoading(false);
        }
    };

    useEffect(() => {

        fetchMessages();
    }, [userId]);

    return (
        <UserMessagesContext.Provider value={{ messages, messageCount, loading, error, fetchMessages }}>
            {children}
        </UserMessagesContext.Provider>
    );
};
