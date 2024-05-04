import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Inbox from './pages/Inbox';
import Chat from './pages/Chat';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import NavBar from './components/Navbar';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
  const { user } = useContext(AuthContext)
  console.log(user,'user');
  
  return (
    <>
      <NavBar />
      <Container >
        <Routes>
          <Route path='/' element={user ? <Chat /> : <Login />} />
          <Route path='/login' element={user ? <Chat /> : <Login />} />
          <Route path='/register' element={user ? <Chat /> : <Login />} />
          <Route path='/inbox' element={user ? <Chat /> : <Login />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
