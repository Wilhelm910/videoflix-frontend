import Modal from '../components/Modal'
import SignUpButton from '../components/SendButton'
import { SignUpButtonProps } from '../ui/ButtonProps.ui'
import { useEffect, useState } from 'react'
import { UserProps } from '../types/types'
import { BASE_URL } from '../static/api'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from 'react-router-dom'

const initialUser = {
  email: "",
  password: "",
}

export default function SignUp() {
  const [newUser, setNewUser] = useState<UserProps>(initialUser)
  const [confirmPassword, setConfirmPassword] = useState("")
  const location = useLocation();
  const receivedEmail = location.state?.email;
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    if (receivedEmail) {
      setNewUser((prev) => ({
        ...prev,
        email: receivedEmail
      }))
    }
  }, [receivedEmail])



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.name == "confirmPassword") {
      setConfirmPassword(e.target.value)
    } else {
      setNewUser(prev => ({
        ...prev,
        [e.target.name]: e.target.value
      }))
    }
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (confirmPassword === newUser.password) {
      setDisabled(true)
      toast.success("Trying to register user...")
      try {
        const response = await fetch(`${BASE_URL}/register/`, {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(newUser)
        })
        if (response.ok) {
          setNewUser(initialUser)
          setConfirmPassword("")
          toast.success("User successfull created. Please confirm your Email-Address.")
        } else {
          const data = await response.json()
          if (data.error) {
            toast.error(data.error)
          } else {
            toast.error("An error occured.")
          }
        }
      } catch (error) {
        toast.error(`${error}`)
      }
      setDisabled(false)
    }
    else {
      toast.error("Passwords dont match")
    }
  }

  const isFormValid = !!(newUser.email && newUser.password && confirmPassword);


  return (
    <Modal title={"Sign Up"}>
      <form className="pl-10 pr-10 flex flex-col items-center text-center gap-5 w-96">
        <input
          onChange={(e) => handleChange(e)}
          name="email"
          value={newUser.email}
          type="email"
          className="placeholder-blue-500 w-full p-2 border border-gray-300 rounded-lg ring-2 ring-blue-500"
          placeholder="Email Address" />
        <input
          onChange={(e) => handleChange(e)}
          name="password"
          value={newUser.password}
          type="password"
          className="placeholder-blue-500 w-full p-2 border border-gray-300 rounded-lg ring-2 ring-blue-500"
          placeholder="Enter a password" />
        <input
          onChange={(e) => handleChange(e)}
          name="confirmPassword"
          value={confirmPassword}
          type="password"
          className="placeholder-blue-500 w-full p-2 border border-gray-300 rounded-lg ring-2 ring-blue-500"
          placeholder="Confirm Password" />
        <SignUpButton disabled={disabled} type="submit" buttonClick={(e) => handleSubmit(e)} props={SignUpButtonProps} />
      </form>
    </Modal>
  )
}
