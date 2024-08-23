import { useEffect, useState } from "react";
import Header from "../components/common/Header";
import { useNavigate } from "react-router-dom";
import Videos from "../components/common/Videos";
import Footer from "../components/common/Footer";



const outerContainerStyle = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",  // Vollständige Höhe des Viewports
  margin: 0,
};

const innerContainerStyle = {
  flex: 1,  // Füllt den restlichen Platz
  padding: "0 40px",
};

const footerContainerStyle = {
  padding: "10px 40px",
}


export default function Home() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState<string>("")


  const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value
    setSearchTerm(value)
  }

  useEffect(() => {
    const token = sessionStorage.getItem("token")
    if (!token) {
      navigate("/login")
      return
    }
  }, [])


  return (
    <div style={outerContainerStyle}>
      <div style={innerContainerStyle}>
        <Header handleSearch={handleSearch} searchTerm={searchTerm} />
        <Videos searchTerm={searchTerm} />
      </div>
      <div style={footerContainerStyle}>
        <Footer />
      </div>
    </div>
  )
}
