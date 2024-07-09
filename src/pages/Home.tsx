import { useEffect } from "react";
import Header from "../components/common/Header";
import { useNavigate } from "react-router-dom";
import Videos from "../components/common/Videos";


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
      <Videos />
    </>
  )
}
