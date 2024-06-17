import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { BASE_URL } from "../../static/api";
import { useNavigate } from "react-router-dom";

type UserProps = {
    email: string
    password: string
}

const initialUserData = (email: string): UserProps => ({
    email: email,
    password: ""
})

type UserLoginProps = {
    is_verified: boolean
    email: string
    notify: (message: string) => void
}


export default function UserLogin({ is_verified, email, notify }: UserLoginProps) {
    const [user, setUser] = useState<UserProps>(initialUserData(email))
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUser(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (is_verified == true) {
            try {
                let response = await fetch(`${BASE_URL}/login/`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(user)
                })
                let data = await response.json()
                if (response.ok) {
                    sessionStorage.setItem("token", data.token)
                    setUser(initialUserData(email))
                    navigate("/home/")
                } else {
                    console.log(response)
                    notify("Falsches Passwort")
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            notify("Bitte verifiziere deine Email.")
        }
    }


    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                    required
                    id="outlined-password-input"
                    label="Passwort"
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={(e) => handleChange(e)}
                />
                <Button variant="contained" type="submit">Einloggen</Button>
            </Box>
        </form>
    )
}
