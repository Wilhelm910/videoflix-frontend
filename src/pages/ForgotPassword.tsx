
import { useState } from "react";
import Modal from "../components/Modal";
import SendButton from "../components/SendButton";
import { ForgotPasswordButtonProps } from "../ui/ButtonProps.ui";
import { BASE_URL } from "../static/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function ForgotPassword() {
  const [userEmail, setUserEmail] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUserEmail(e.target.value)
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`${BASE_URL}/password-reset/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: userEmail }),
      })
      if (response.ok) {
        toast.success("Email sent. Please check your Emails.")
      }
    } catch (error) {
      console.log(error)
      toast.error(`${error}`)
    }

  }

  return (
    <Modal title={"Forgot your password?"}>
      <p>We will send you an email with instructions to reset your password.</p>
      <form onSubmit={handleSubmit} className="pl-10 pr-10 flex flex-col items-center text-center gap-5 w-96">
        <input onChange={handleChange} value={userEmail} name="email" className="placeholder-blue-500 w-full p-2 border border-gray-300 rounded-lg ring-2 ring-blue-500" placeholder="Enter your Email Adress" />
        <SendButton type="submit" props={ForgotPasswordButtonProps} />
      </form>
    </Modal>
  )
}
