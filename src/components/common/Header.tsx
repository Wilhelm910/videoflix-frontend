import { Box, Button, InputAdornment, Modal, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../static/api";
import PersonIcon from '@mui/icons-material/Person';
import { useState } from "react";
import UserDetails from "./UserDetails";
import { ToastContainer, toast } from 'react-toastify';


type HeaderProps = {
    handleSearch: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    searchTerm: string
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function Header({ handleSearch, searchTerm }: HeaderProps) {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const notify = (message: string) => toast(message);



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
          <ToastContainer />
            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" borderBottom="1px solid rgb(237, 232, 232)" >
                <img src="../../src/assets/logo.svg" />
                <Box display="flex" gap={2} alignItems="center">
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
                        value={searchTerm}
                        onChange={handleSearch}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: "rgb(237, 232, 232)" }} />
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                    />
                    <Box>
                        <Button onClick={handleOpen}>
                            <PersonIcon style={{ fontSize: 40 }} />
                        </Button>
                    </Box>
                    <Button onClick={handleLogout} variant="contained">Ausloggen</Button>
                </Box>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <UserDetails notify={notify} />
                </Box>
            </Modal>
        </>
    )
}
