import { Box, Modal, Typography } from "@mui/material";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { UserProps } from "../../utils/types";
import { useState } from "react";
import { modalStyle } from "../../static/styles";
import UserLogin from "../auth/UserLogin";


type UserMaskProps = {
    user: UserProps
    notify: (message: string) => void
}


export default function UserMask({ user, notify }: UserMaskProps) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const getRandomColor = () => {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        const color = `rgb(${red}, ${green}, ${blue})`;
        return color;
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center" minHeight="250px">
            <Box onClick={handleOpen} borderRadius={2} border="2px solid black"
                sx={{ "&:hover": { borderColor: "rgb(237, 232, 232);", cursor: 'pointer', transform: "scale(1.01)", transition: "transform .2s;" } }}
                width="200px" height="200px" bgcolor={getRandomColor()}>
                <SentimentSatisfiedAltIcon sx={{ color: getRandomColor(), width: "100%", height: "100%" }} />
            </Box>
            {user.first_name ? (
                <Typography mt={1}>{user.first_name} {user.last_name}</Typography>
            ) : (<Typography>{user.email}</Typography>)}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <UserLogin is_verified={user.is_verified} email={user.email} notify={notify} />
                </Box>
            </Modal>
        </Box>
    )
}
