import { Box, Button, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate()


    const handleLogout = () => {
        sessionStorage.removeItem("token")
        navigate("/login/")
    }


    return (
        <>
            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" borderBottom="1px solid rgb(237, 232, 232)" >
                <img src="../../src/assets/logo.svg" />
                <TextField
                    sx={{
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
        </>
    )
}
