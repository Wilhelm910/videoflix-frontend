import { Box, Button, Modal, Typography } from "@mui/material";
import UserMask from "../common/UserMask";
import { useEffect, useState } from "react";
import NewUserModal from "../common/NewUserModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from "../../static/api";
import { UserProps } from "../../utils/types";
import { modalStyle } from "../../static/styles";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';



export default function login() {

    const [userList, setUserList] = useState<UserProps[]>()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const notify = (message: string) => toast(message);
    // let changedUserList: UserProps[] = userList
    // let counter: number = 3
    const [counter, setCounter] = useState(3)




    useEffect(() => {
        const loadAllUsers = async () => {
            try {
                let response = await fetch(`${BASE_URL}/get-all-users/`, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json"
                    }
                })
                if (response.ok) {
                    let data = await response.json()
                    setUserList(data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        loadAllUsers()
    }, [])

    console.log(userList)

    const renderUsers = () => {
        if (userList) {
            return userList.map((user, index) => {
                if (index < counter && index > counter - 4) {
                    return <UserMask user={user} key={index} notify={notify} />
                }
                // else if (counter == userList.length + 1) {
                //     // console.log(userList.length)
                //     // console.log(counter)
                //     // console.log(userList[0])
                //     console.log(userList[counter - userList.length - 1])
                //     return <UserMask user={userList[counter - userList.length - 1]} key={index} notify={notify} />
                // }
            })
        } else {
            return null
        }
    }

    const handleCarousel = (method: string) => {
        if (method == "plus") {
            if (userList) {
                if (counter < userList.length) {
                    setCounter(counter + 1);
                }
                else {
                    setCounter(3)
                }
            }
        } 
        // else if (method == "minus") {
        //     if (userList) {
        //         if (counter < userList.length) {
        //             setCounter(counter - 1);
        //             console.log(counter)
        //         }
        //         else {
        //             setCounter(3)
        //         }
        //     }
        // }
    }

    return (
        <>
            <ToastContainer />
            <Box sx={{ width: "100%", flex: "1", paddingTop: 20, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography mb={2} variant="h2">Wer schaut gerade?</Typography>
                <Box display="flex" alignItems="center" gap={2}>
                    {/* <Button variant="outlined" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <ArrowBackIosNewIcon onClick={() => handleCarousel("minus")} sx={{ fontSize: "50px" }} />
                    </Button> */}
                    {/* <ArrowBackIosNewIcon onClick={() => handleCarousel("minus")} sx={{ fontSize: "50px", marginBottom: "30px", "&:hover": { cursor: "pointer", scale: "1.1", transition: "transform .2s;" } }} />
                     */}
                    {renderUsers()}
                    <ArrowForwardIosIcon onClick={() => handleCarousel("plus")} sx={{ fontSize: "50px", marginBottom: "30px", "&:hover": { cursor: "pointer", scale: "1.1", transition: "transform .2s;" } }} />
                </Box>
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
                <Box sx={modalStyle}>
                    <NewUserModal setUserList={setUserList} notify={notify} />
                </Box>
            </Modal>
        </>
    )
}
