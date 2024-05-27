import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { BASE_URL } from "../../static/api";
import { useNavigate } from "react-router-dom";

type UserProps = {
    username: string
    password: string
}

const initialUserData = (username: string): UserProps => ({
    username: username,
    password: ""
})

type UserLoginProps = {
    username: string
    notify: (message: string) => void
}

export default function UserLogin({ username, notify }: UserLoginProps) {
    const [user, setUser] = useState<UserProps>(initialUserData(username))
    const navigate = useNavigate()


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUser(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
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
                setUser(initialUserData(username))
                navigate("/home/")
            } else {
                console.log(response)
                notify("Falsches Passwort")
            }
        } catch (error) {
            console.log(error)
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
