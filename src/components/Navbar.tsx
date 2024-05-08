import { useContext } from "react";
import { Badge, Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useUserMessagesContext } from "../context/MessageContext";
const NavBar = () => {
    // @ts-ignore
    const { user, logoutUser } = useContext(AuthContext);
    const { messages } = useUserMessagesContext();
    const unreadMessagesCount = messages.filter(message => !message.isRead).length;

    return (
        <Navbar bg="dark" className='mb-4' style={{ height: '3.75rem' }}>
            <Container>
                <h2>
                    <Link to='/' className="link-light text-decoration-none">Mail Inbox</Link>
                </h2>
                <Nav>
                    <Stack direction="horizontal" gap={3}>
                        {user ?
                            <>
                                <span className="text-warning">{user?.name}</span>
                                <Nav.Link className="text-primary" as={Link} to="/inbox">
                                {unreadMessagesCount === 0 ? "View" : "Unread"}  Messages {` `}
                                    {unreadMessagesCount > 0 && <Badge variant="danger">{unreadMessagesCount}</Badge>}
                                </Nav.Link>
                                <Link to='/inbox' className="link-light text-decoration-none">Inbox</Link>

                                <Link onClick={() => logoutUser()} to='/login' className="link-light text-decoration-none">
                                    Logout
                                </Link>
                            </>

                            : (
                                <>
                                    <Link to='/login' className="link-light text-decoration-none">Login</Link>
                                    <Link to='/register' className="link-light text-decoration-none">Register</Link></>
                            )}


                    </Stack>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar