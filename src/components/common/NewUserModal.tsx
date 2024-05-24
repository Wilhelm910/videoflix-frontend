import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { BASE_URL } from '../../static/api';



type UserProps = {
    username: string
    first_name: string
    last_name: string
    email: string
    password: string
}

const initialUserData: UserProps = {
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
}

type NewUserModalProps = {
    notify: (message:string) => void
}


export default function NewUserModal({ notify }: NewUserModalProps) {
    const [user, setUser] = useState<UserProps>(initialUserData)
    const [confirmPassword, setConfirmPassword] = useState<string>("")


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.name == "confirmPassword") {
            setConfirmPassword(e.target.value)
        } else {
            setUser(prev => ({
                ...prev,
                [e.target.name]: e.target.value
            }))
        }
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (confirmPassword === user.password) {
            const username = `${user.first_name.toLowerCase()}.${user.last_name.toLowerCase()}`;
            try {
                let response = await fetch(`${BASE_URL}/auth/`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ ...user, username })
                })
                if (response.ok) {
                    setUser(initialUserData)
                    setConfirmPassword("")
                    notify("Benutzer erfolgreich angelegt")
                } else {
                    const errorResponse = await response.json()
                    console.log(errorResponse)
                }
            } catch (error) {
                console.log(error)
            }
        }

    }


    return (
        <form>
            <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                    id="outlined-password-input"
                    label="Vorname"
                    type="text"
                    name="first_name"
                    value={user.first_name}
                    onChange={(e) => handleChange(e)}
                />
                <TextField
                    id="outlined-password-input"
                    label="Nachname"
                    type="text"
                    name="last_name"
                    value={user.last_name}
                    onChange={(e) => handleChange(e)}
                />
                <TextField
                    id="outlined-password-input"
                    label="E-Mail"
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={(e) => handleChange(e)}
                />
                <TextField
                    id="outlined-password-input"
                    label="Passwort"
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={(e) => handleChange(e)}
                />
                <TextField
                    id="outlined-password-input"
                    label="Bestätige dein Passwort"
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => handleChange(e)}
                />
                <Button onClick={(e) => handleSubmit(e)} variant="contained">Account anlegen</Button>
            </Box>
        </form>
    )
}
