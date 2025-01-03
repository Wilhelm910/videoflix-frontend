import { useState } from 'react'
import Modal from '../components/Modal'
import SendButton from '../components/SendButton'
import { BASE_URL } from '../static/api'
import { ForgotPasswordButtonProps } from '../ui/ButtonProps.ui'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ResetPassword() {
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const location = useLocation()
    const navigate = useNavigate()
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.name == "confirmPassword") {
            setConfirmPassword(e.target.value)
        }
        if (e.target.name == "newPassword") {
            setNewPassword(e.target.value)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch(`${BASE_URL}/password-reset-confirm/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ new_password: newPassword, token: token })
            })
            const data = await response.json()
            console.log(data)
            if (response.ok) {
                console.log(data)
                toast.success(data.message)
                setConfirmPassword("")
                setNewPassword("")
                navigate("/login")
            } else {
                console.log(data.new_password)
                data.new_password.map((message: string) => {
                    toast.error(message)
                })
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Modal title={"Reset password"}>
            <p>Create a new password for your Videoflix account.</p>
            <form onSubmit={handleSubmit} className="pl-10 pr-10 flex flex-col items-center text-center gap-5 w-96">
                <input type='password' onChange={handleChange} value={newPassword} name="newPassword" className="placeholder-blue-500 w-full p-2 border border-gray-300 rounded-lg ring-2 ring-blue-500" placeholder="New Password" />
                <input type='password' onChange={handleChange} value={confirmPassword} name="confirmPassword" className="placeholder-blue-500 w-full p-2 border border-gray-300 rounded-lg ring-2 ring-blue-500" placeholder="Confirm new Password" />
                <SendButton type="submit" props={ForgotPasswordButtonProps} />
            </form>
        </Modal>
    )
}
