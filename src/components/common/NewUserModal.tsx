import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { BASE_URL } from '../../static/api';
import { UserProps } from "../../utils/types";



const initialUserData: UserProps = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
}

type NewUserModalProps = {
    notify: (message: string) => void
    setUserList: React.Dispatch<React.SetStateAction<UserProps[] | undefined>>;
}


export default function NewUserModal({ notify, setUserList }: NewUserModalProps) {
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
            // const username = `${user.first_name.toLowerCase()}.${user.last_name.toLowerCase()}`;
            try {
                let response = await fetch(`${BASE_URL}/register/`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                   // body: JSON.stringify({ ...user, username })
                    body: JSON.stringify(user)
                })
                if (response.ok) {
                   // const newUser = { ...user, username }
                   //  const newUser = { user }
                    const newUser = await response.json();
                    setUserList(prev => (prev ? [...prev, newUser] : [newUser]))
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
                    required
                    id="outlined-password-input"
                    label="Vorname"
                    type="text"
                    name="first_name"
                    value={user.first_name}
                    onChange={(e) => handleChange(e)}
                />
                <TextField
                    required
                    id="outlined-password-input"
                    label="Nachname"
                    type="text"
                    name="last_name"
                    value={user.last_name}
                    onChange={(e) => handleChange(e)}
                />
                <TextField
                    required
                    id="outlined-password-input"
                    label="E-Mail"
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={(e) => handleChange(e)}
                />
                <TextField
                    required
                    id="outlined-password-input"
                    label="Passwort"
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={(e) => handleChange(e)}
                />
                <TextField
                    required
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
