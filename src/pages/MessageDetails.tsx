import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserMessagesContext } from '../context/MessageContext';
import useMessageReadStatus from '../hooks/useMessageReadStatus';

const MessageDetails: React.FC = () => {
  const { messageId } = useParams<{ messageId: string }>();
  // @ts-expect-error
  const { updateMessageReadStatus } = useMessageReadStatus(messageId);

  useEffect(() => {
    updateMessageReadStatus();
  }, []);

  const navigate = useNavigate(); 
  const { messages, loading, error } = useUserMessagesContext();

  const message = messages.find(msg => msg._id === messageId);

  const goBack = () => {
    navigate('/inbox');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!message) {
    return <div>Message not found</div>;
  }

  return (
    <div>
      <h2>Message Details</h2>
      <p>Sender: {message.sender}</p>
      <p>Receiver: {message.receiver}</p>
      <p>Subject: {message.subject}</p>
      <p>Content: {message.content}</p>
      {/* Add a back button */}
      <button onClick={goBack}>Go Back</button>
    </div>
  );
};

export default MessageDetails;
