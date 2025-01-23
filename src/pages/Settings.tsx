import { useEffect, useState } from "react"
import SendButton from "../components/SendButton"
import { ResetPasswordButtonProps } from "../ui/ButtonProps.ui"
import { UserProps } from "../types/types"
import { BASE_URL } from "../static/api"
import { toast } from "react-toastify"


type ResponseDataProps = {
    new_password: string[]
    old_password: string[]
}


export default function Settings() {

    const [user, setUser] = useState<UserProps | null>(null)
    const [newPassword, setNewPassword] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const [responseData, setResponseData] = useState<ResponseDataProps | null>(null)


    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await fetch(`${BASE_URL}/current-user/`, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        "Authorization": `Token ${sessionStorage.getItem("token")}`
                    }
                })
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    setUser(data)
                } else {
                    const errorResponse = await response.json()
                    console.log(errorResponse)
                }
            } catch (error) {
                console.log(error)
            }
        }

        loadUser()
    }, [])


    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (newPassword === confirmNewPassword) {
            try {
                const response = await fetch(`${BASE_URL}/change-password/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${sessionStorage.getItem("token")}`
                    },
                    body: JSON.stringify({
                        old_password: oldPassword,
                        new_password: newPassword
                    })
                })
                const data = await response.json()
                setResponseData(data)
                console.log(data)
                if (response.ok) {
                    toast.success("Passwort erfolgreich geändert")
                    setConfirmNewPassword("")
                    setNewPassword("")
                    setOldPassword("")
                } else {
                    toast.error("Fehler beim Ändern des Passworts")
                }

            } catch (error) {
                toast.error("Fehler beim Ändern des Passworts")
            }
        } else {
            toast.error("Passwörter stimmen nicht überein")
        }
    }

    return (
        <div className="bg-white rounded-3xl p-10 shadow-lg flex flex-col items-center text-center gap-5 w-96 fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-3xl font-bold text-blue-500">Change my Password</h1>
            <p className=" text-blue-500">for account <span className="text-black">{user?.email}</span></p>
            <form className="pl-10 pr-10 flex flex-col items-center text-center gap-5 w-96">
                <input
                    onChange={(e) => setOldPassword(e.target.value)}
                    name="password"
                    value={user?.password}
                    type="password"
                    className="placeholder-blue-500 w-full p-2 border border-gray-300 rounded-lg ring-2 ring-blue-500"
                    placeholder="Enter your password" />
                <input
                    onChange={(e) => setNewPassword(e.target.value)}
                    name="confirmPassword"
                    value={newPassword}
                    type="password"
                    className="placeholder-blue-500 w-full p-2 border border-gray-300 rounded-lg ring-2 ring-blue-500"
                    placeholder="Set new Password" />
                <input
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    name="confirmPassword"
                    value={confirmNewPassword}
                    type="password"
                    className="placeholder-blue-500 w-full p-2 border border-gray-300 rounded-lg ring-2 ring-blue-500"
                    placeholder="Confirm new Password" />
                <SendButton type="submit" buttonClick={(e) => handleSubmit(e)} props={ResetPasswordButtonProps} />
            </form>
        </div>
    )
}
