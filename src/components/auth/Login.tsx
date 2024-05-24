import { Box, Button, Modal, Typography } from "@mui/material";
import UserMask from "../common/UserMask";
import { useState } from "react";
import NewUserModal from "../common/NewUserModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function login() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const notify = (message: string) => toast(message);

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    return (
        <>
            <ToastContainer />
            <Box sx={{ width: "100%", flex: "1", paddingTop: 20, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography mb={2} variant="h2">Wer schaut gerade?</Typography>
                <UserMask />
                <Typography mt={3} mb={1}>Noch keinen Account? Werde Teil der Crew.</Typography>
                <Button onClick={handleOpen}
                    sx={{ color: "rgb(237, 232, 232);", borderColor: "rgb(237, 232, 232);", "&:hover": { borderColor: "#bc2014", color: "#ad1c1c" } }}
                    variant="outlined">
                    Erstelle einen Account
                </Button>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <NewUserModal notify={notify} />
                </Box>
            </Modal>
        </>
    )
}
