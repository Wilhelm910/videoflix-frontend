import { useEffect, useState } from "react";
import Header from "../components/common/Header";
import { useNavigate } from "react-router-dom";
import Videos from "../components/common/Videos";



const containerStyling = {
  padding: "0 40px"
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
    <>
      <div style={containerStyling}>
        <Header handleSearch={handleSearch} searchTerm={searchTerm} />
        <Videos searchTerm={searchTerm} />
      </div>
    </>
  )
}
