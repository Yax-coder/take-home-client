import { Container, Row, Col, ListGroup, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useUserMessagesContext } from '../context/MessageContext';



const InboxPage = () => {
  const { messages } = useUserMessagesContext();


  return (
    <Container className="mt-5">
      {
        messages?.length < 1 ? "You Have No Message" : (
          <Row className="justify-content-center">
            <Col xs={8}>
              <h1>Inbox</h1>
              <ListGroup>
                {messages.map((message) => (
                  <Link key={message._id} to={`/inbox/${message._id}`} className="list-group-item list-group-item-action">
                    <ListGroup.Item>
                      <h5>{message.subject}</h5>
                      <p>{message.content}</p>
                      {message.isRead ? (
                        <Badge variant="success">Read</Badge>
                      ) : (
                        <Badge variant="danger">Unread</Badge>
                      )}
                    </ListGroup.Item>
                  </Link>
                ))}
              </ListGroup>
            </Col>
          </Row>
        )
      }
    </Container>
  );
};

export default InboxPage;
