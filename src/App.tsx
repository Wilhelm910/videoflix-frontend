import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import EmailVerification from './pages/EmailVerification';
import Layout from './components/Layout';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
import Datenschutz from './pages/Datenschutz';
import Impressum from './pages/Impressum';

function App() {

  const token = sessionStorage.getItem("token")


  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/password-reset" element={<ResetPassword />} />
            <Route path="/signUp" element={<SignUp />} />
            {/* {token && <Route path="/home" element={<Home />} />} */}
            {/* <Route path="/home" element={<Home />} /> */}
            {/* Geschützte Routen */}
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<Home />} />
            </Route>
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            <Route path="/email-verification" element={<EmailVerification />} />
            <Route path="*" element={<Navigate to="/welcome" />} />
          </Route >
        </Routes>
      </Router>
    </>
  )
}

export default App
