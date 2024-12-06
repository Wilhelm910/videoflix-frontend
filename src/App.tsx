import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import EmailVerification from './pages/EmailVerification';
import Layout from './components/Layout';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import SignUp from './pages/SignUp';

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route path="/" element={<Navigate to="/welcome" />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/email-verification" element={<EmailVerification />} />
          </Route >
        </Routes>
      </Router>
    </>
  )
}

export default App