import { useState } from "react";
import Modal from "../components/Modal";
import { LogInButtonProps } from "../ui/ButtonProps.ui";
import { ForgotPasswordLinkProps, SignUpLinkProps } from "../ui/LinkProps.ui";
import { UserProps } from "../types/types";
import SendButton from "../components/SendButton";
import { BASE_URL } from "../static/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import CustomLinkNew from "../components/CustomLinkNew";



const initialUser = {
    email: "",
    password: "",
}

export default function Login() {

    const [user, setUser] = useState<UserProps>(initialUser)
    const [rememberMe, setRememberMe] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUser(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        try {
            toast.success(`Checking credentials...`)
            const response = await fetch(`${BASE_URL}/login/`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(user)
            })
            let data = await response.json()
            if (response.ok) {
                toast.success(`Logging in...`)
                sessionStorage.setItem("token", data.token)
                if (rememberMe) {
                    Cookies.set('token', data.token, { expires: 30, secure: true, sameSite: 'strict' });
                }
                
                navigate("/home")
            } else {
                toast.error(data.error)
            }
        } catch (error) {
            toast.error(`${error}`)
            console.log(error)
        }
    }

    return (
        <>
            <Modal
                title={"Log In"}
            >
                <form className="pl-10 pr-10 flex flex-col items-center text-center gap-5 w-96">
                    <input
                        onChange={(e) => handleChange(e)}
                        name="email"
                        value={user.email}
                        type="email"
                        className="placeholder-blue-500 w-full p-2 border border-gray-300 rounded-lg ring-2 ring-blue-500"
                        placeholder="Email Address" />
                    <input
                        onChange={(e) => handleChange(e)}
                        name="password"
                        value={user.password}
                        type="password"
                        className="placeholder-blue-500 w-full p-2 border border-gray-300 rounded-lg ring-2 ring-blue-500"
                        placeholder="Password" />
                    <div className="flex items-center space-x-2 w-full">
                        <input
                            onChange={(e) => setRememberMe(e.target.checked)}
                            type="checkbox"
                            id="remember"
                            checked={rememberMe}
                            className="w-5 h-5 text-blue-500 border-2 border-blue-500 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <label htmlFor="remember" className="text-gray-700">
                            Remember me
                        </label>
                    </div>
                    <SendButton type="submit" props={LogInButtonProps} buttonClick={(e) => handleSubmit(e)} />
                </form>
                <CustomLinkNew props={ForgotPasswordLinkProps} />
                <div className="flex gap-2" >
                    <p>New to Videoflix?</p>
                    <CustomLinkNew props={SignUpLinkProps} />
                </div>
            </Modal>
        </>
    )
}
