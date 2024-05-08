import { useContext } from "react"
import { ChatContext } from "../context/ChatContext";
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useUserMessagesContext } from "../context/MessageContext";

const Home = () => {
  // @ts-ignore
  const navigate = useNavigate()

  const { user } = useContext(AuthContext)
  const { messages } = useUserMessagesContext();

  const unreadMessages = messages?.filter(message => message.isRead === false);
  console.log(unreadMessages);
  
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={7}>
          <div className="border rounded p-4 text-center">
            <h2>Hello, {user?.name}!</h2>
            {unreadMessages.length === 0 ? (
              <p>Welcome to your Inbox</p>
            ) : (
              <p>
                You have{' '}
                <strong>
                  <Badge variant="danger">{unreadMessages.length}</Badge>
                </strong>{' '}
                unread messages out of {messages.length}.
              </p>
            )}

            <Button onClick={() => navigate('/inbox')} variant="primary">View Messages</Button>
          </div>
        </Col>
      </Row>
    </Container>

  )
}

export default Home