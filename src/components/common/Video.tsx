import { Box, Modal, Typography } from "@mui/material";
import { BASE_URL } from "../../static/api";
import { useState } from "react";
import VideoManager from "./VideoManager";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { VideoDetails } from "../../utils/types";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    backgroundColor: "#242424",
};

const boxStyling = {
    marginBottom: "-120px",
    maxWidth: "320px",
    height: "300px",
    padding: "20px",
    // position: "relative", // Für absolute Positionierung von .textContent
    transition: "transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease, flex 0.3s ease",
    "&:hover": {
        cursor: "pointer",
        transform: "scale(1.2)",
        backgroundColor: "#242424",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        transitionDelay: "0.2s",
        zIndex: "2",
    },
    "&:hover .textContent": {
        //display: "flex",
        transform: "translateY(0)",
        transitionDelay: "0.2s",
        opacity: "1",
        visibility: "visible",
    }
}


const textStyling = {
    transform: "translateY(20px)",
    transition: "opacity 0.3s, transform 0.3s",
    // position: "absolute",
    // backgroundColor: "#242424",
    // width: "100%",
    // boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    // padding: "20px",
    //display: "none",
    justifyContent: "space-between",
    opacity: "0",
    visibility: "hidden",
    dispaly: "flex",
    flexDirection: "row"
};


type VideoProps = {
    video: VideoDetails
    onFavouriteChange: (videoId: number, favourite: boolean) => void
}


export default function Video({ video, onFavouriteChange }: VideoProps) {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true)
    const [favourite, setFavourite] = useState(video?.favourite)


    const handleFavourite = async (favourite: boolean, videoId: number) => {
        console.log(sessionStorage.getItem("token"))
        try {
            const response = await fetch(`${BASE_URL}/video/${videoId}/update-favourite/`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Token ${sessionStorage.getItem("token")}`
                },
                body: JSON.stringify({ favourite })
            })
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            } else {
                setFavourite(favourite)
                onFavouriteChange(video.id, favourite);
                const updatedVideo = await response.json();
                console.log('Updated Video:', updatedVideo);
            }

        } catch (error) {
            console.error('Error updating favourite:', error);
        }
    }


    return (
        <>
            <Box sx={boxStyling}>
                <img width={320} src={`${BASE_URL}${video.thumbnail}`} alt="Video Thumbnail" onClick={handleOpen} />
                <Box className="textContent" sx={textStyling}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6">{video.title}</Typography>
                        <Box>
                            {favourite && <FavoriteIcon onClick={() => handleFavourite(false, video.id)} />}
                            {!favourite && <FavoriteBorderIcon onClick={() => handleFavourite(true, video.id)} />}
                        </Box>
                    </Box>
                    <Box>

                        <Typography variant="body2">{video.description.slice(0, 80) + "..."}</Typography>
                    </Box>

                </Box>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <VideoManager video_id={video.id} />
                </Box>
            </Modal>
        </>
    );
}


