import { useEffect } from "react";
import Header from "../components/common/Header";
import { useNavigate } from "react-router-dom";


export default function Home() {
  const navigate = useNavigate()


  useEffect(() => {
    const token = sessionStorage.getItem("token")
    if (!token) {
      navigate("/login")
      return
    }
  }, [])


  return (
    <>
      <Header />
    </>
  )
}
