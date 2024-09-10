import { Route, BrowserRouter as Router, Routes, Navigate, } from 'react-router-dom'
import './App.css'
import Login from './components/auth/Login'
import Home from './pages/Home'
import { createTheme, ThemeProvider } from '@mui/material'
import EmailVerification from './components/auth/EmailVerification'



const theme = createTheme({
  palette: {
    primary: {
      main: "#ad1c1c"
    }
  }
})


function App() {

  console.log("app mounted")


  return (
    <>
      <ThemeProvider theme={theme}>
        <Router basename="/videoflix/">
          <Routes>
            <Route path="/" element={<Navigate to="/login/" />} />
            <Route path="/login/" element={<Login />} />
            <Route path="/home/" element={<Home />} />
            <Route path="/email-verification/" element={<EmailVerification />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  )
}

export default App
