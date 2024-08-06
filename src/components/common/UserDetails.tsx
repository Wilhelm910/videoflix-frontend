import { useEffect, useState } from "react"
import { BASE_URL } from "../../static/api"
import { Box, Button, TextField, Typography } from "@mui/material"
import { UserProps } from "../../utils/types"

export default function UserDetails() {

    const [user, setUser] = useState<UserProps | null>()
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")

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


    const handleChange = () => {

    }


    const handleSubmit = () => {

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
                        onChange={(e) => handleChange(e)}
                    />
                    <TextField
                        fullWidth
                        required
                        id="outlined-password-input"
                        label="Wiederhole dein neues Passwort"
                        type="password"
                        name="confirmNewPassword"
                        value={confirmNewPassword}
                        onChange={(e) => handleChange(e)}
                    />
                    <TextField
                        fullWidth
                        required
                        id="outlined-password-input"
                        label="Bestätige mit deinem alten Passwort"
                        type="password"
                        name="password"
                        value={user?.password}
                        onChange={(e) => handleChange(e)}
                    />
                    <Button onClick={(e) => handleSubmit(e)} variant="contained">Speichern</Button>
                </Box>
            </form>
        </Box>
    )
}
