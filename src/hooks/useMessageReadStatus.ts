import { useState } from 'react';
import { baseUrl } from '../utils/services';
import { useUserMessagesContext } from '../context/MessageContext';

const useMessageReadStatus = (messageId: string) => {
  const [isRead, setIsRead] = useState<boolean | null>(null);
  const { fetchMessages } = useUserMessagesContext();

  const updateMessageReadStatus = async () => {
    try {
      const response = await fetch(`${baseUrl}/messages/update/${messageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isRead: true })
      });
      if (!response.ok) {
        throw new Error('Failed to update message read status');
      }
      setIsRead(true);
      fetchMessages()
    } catch (error) {
      console.error(error);
    }
  };


  return { isRead, updateMessageReadStatus };
};

export default useMessageReadStatus;
