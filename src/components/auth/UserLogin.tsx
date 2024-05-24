import { Box, TextField } from "@mui/material";
import { useState } from "react";

type UserProps = {
    username: string
    password: string
}

const initialUserData = {
    username: "",
    password: ""
}

export default function UserLogin() {
    const [user, setuser] = useState<UserProps>(initialUserData)


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setuser(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }


    return (
        <form>
            <Box>
                <TextField
                    id="outlined-password-input"
                    label="Benutzername"
                    type="text"
                    name="username"
                    value={user.first_name}
                    onChange={(e) => handleChange(e)}
                />
                <TextField
                    id="outlined-password-input"
                    label="Passwort"
                    type="password"
                    name="password"
                    value={user.last_name}
                    onChange={(e) => handleChange(e)}
                />
            </Box>
        </form>
    )
}
