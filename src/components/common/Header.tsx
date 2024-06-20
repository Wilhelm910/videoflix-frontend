import { Box, Button, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../static/api";

export default function Header() {
    const navigate = useNavigate()


    const handleLogout = async () => {
        try {
            const token = sessionStorage.getItem("token");
            console.log(token)
            if (!token) {
                console.log("No token found. Already logged out?");
                navigate("/login/");
                return;
            }
            const response = await fetch(`${BASE_URL}/logout/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`
                }
            })
            if (!response.ok) {
                throw new Error("Logout failed.");
            }
            let data = await response.json()
            console.log("Logout response:", data);
            sessionStorage.removeItem("token")
            navigate("/login/")
        } catch (error) {
            console.log(error)
        }


    }


    return (
        <>
            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" borderBottom="1px solid rgb(237, 232, 232)" >
                <img src="../../src/assets/logo.svg" />
                <Box display="flex" gap={2}>
                    <TextField
                        sx={{
                            borderRadius: "4px",
                            input: { color: 'white' },
                            '& .MuiInputLabel-root': { color: 'rgb(237, 232, 232)' },
                            '& .MuiInputLabel-root.Mui-focused': { color: 'rgb(237, 232, 232)' },
                        }}
                        id="outlined-search"
                        label="Suche"
                        type="search"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: "rgb(237, 232, 232)" }} />
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                    />
                    <Button onClick={handleLogout} variant="contained">Ausloggen</Button>
                </Box>
            </Box>
        </>
    )
}
