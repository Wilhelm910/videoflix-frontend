import { Box, Button, Modal, Typography } from "@mui/material";
import { BASE_URL } from "../../static/api";
import { useState } from "react";
import VideoManager from "./VideoManager";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
};

// type ResProps = "original" | "480p";

type VideoProps = {
    video: Video
}

type Video = {
    id: number
    title: string
    description: string
    created_at: string
    video_file: string
    video_file_480p?: string
    thumbnail: string
}

export default function Video({ video }: VideoProps) {
    const [open, setOpen] = useState(false);
    // const [testResolution, setTestResolution] = useState("")

    // const handleOpen = (res: ResProps) => {
    //     setTestResolution(res)
    //     setOpen(true)
    // };
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true)

    console.log(video)
    console.log(`${BASE_URL}${video.thumbnail}`)

    return (
        <>
            {/* <div>
                <Button variant="contained" onClick={() => handleOpen("original")}>Original</Button>
                <Button variant="contained" onClick={() => handleOpen("480p")}>480p</Button>
            </div> */}
            <img width={320} src={`${BASE_URL}${video.thumbnail}`} alt="Video Thumbnail" onClick={handleOpen} />
            <Typography>{video.title}</Typography>
            <Typography>{video.description}</Typography>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {/* <VideoManager testResolution={testResolution} video_id={video.id} /> */}
                    <VideoManager video_id={video.id} /> 
                </Box>
            </Modal>
        </>
    );
}


