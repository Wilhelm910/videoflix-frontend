import { useEffect, useState } from "react"
import { BASE_URL } from "../../static/api"
import { Box, Button, TextField, Typography } from "@mui/material"
import { UserProps } from "../../utils/types"


type UserDetailsProps = {
    notify: (message: string) => void
}

type ResponseDataProps = {
    new_password: string[]
    old_password: string[]
}

export default function UserDetails({ notify }: UserDetailsProps) {

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
                    notify("Passwort erfolgreich geändert")
                } else {
                    notify("Fehler beim Ändern des Passworts")
                }

            } catch (error) {
                notify("Fehler beim Ändern des Passworts")
            }
        } else {
            notify("Passwörter stimmen nicht überein")
        }
    }


    return (
        <Box width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={3}>
            <Typography variant="h6" sx={{ color: "black" }}>Wilkommen, {user?.first_name} </Typography>
            <form>
                <Box width="350px" display="flex" flexDirection="column" alignItems="center" gap={2}>
                    <TextField
                        fullWidth
                        required
                        id="outlined-password-input"
                        label="Neues Passwort"
                        type="password"
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        required
                        id="outlined-password-input"
                        label="Wiederhole dein neues Passwort"
                        type="password"
                        name="confirmNewPassword"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        required
                        id="outlined-password-input"
                        label="Bestätige mit deinem alten Passwort"
                        type="password"
                        name="oldPassword"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <Button onClick={(e) => handleSubmit(e)} variant="contained">Speichern</Button>
                    <Box color="black">
                        {responseData?.new_password && responseData.new_password.map((message, index) => (
                            <Typography key={index}>{message}</Typography>
                        ))}
                        {responseData?.old_password && responseData.old_password.map((message, index) => (
                            <Typography key={index}>{message}</Typography>
                        ))}
                    </Box>
                </Box>
            </form>
        </Box>
    )
}
