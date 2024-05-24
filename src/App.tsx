import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/auth/Login'
import Home from './pages/Home'
import { createTheme, ThemeProvider } from '@mui/material'



const theme = createTheme({
  palette: {
    primary: {
      main: "#ad1c1c"
    }
  }
})


function App() {


  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home/" element={<Home />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  )
}

export default App
