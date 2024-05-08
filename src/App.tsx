import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Chat from './pages/Chat';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import NavBar from './components/Navbar';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import InboxPage from './pages/Inbox';
import { UserMessagesProvider } from './context/MessageContext';
import MessageDetails from './pages/MessageDetails';

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <UserMessagesProvider userId={user?._id}>
      <NavBar />
      <Container>
        <Routes>
          <Route path='/' element={isAuthenticated ? <Home /> : <Login />} />
          <Route path='/chat' element={isAuthenticated ? <Chat /> : <Navigate to='/login' />} />
          <Route path='/login' element={!isAuthenticated ? <Login /> : <Navigate to='/' />} />
          <Route path='/register' element={!isAuthenticated ? <Register /> : <Navigate to='/' />} />
          <Route path='/inbox' element={isAuthenticated ? <InboxPage /> : <Navigate to='/login' />} />
          <Route path='/inbox/:messageId' element={isAuthenticated ? <MessageDetails /> : <Navigate to='/login' />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Container>
    </UserMessagesProvider>
  );
}

export default App;
