import { Box, Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { BASE_URL } from '../../static/api';
import { VideoDetails } from '../../utils/types';
import SettingsIcon from '@mui/icons-material/Settings';


type ResProps = "original" | "480p" | "720p" | null;

type SettingsProps = true | false

type VideoManagerProps = {
    video_id: number
}


const iconStyling = {
    padding: "4px",
    "&:hover": {
        cursor: "pointer"
    }
}



export default function VideoManager({ video_id }: VideoManagerProps) {
    const [resolution, setResolution] = useState<ResProps>(null);
    const [videoSrc, setVideoSrc] = useState("");
    const [videoSrc480p, setVideoSrc480p] = useState("")
    const [videoSrc720p, setVideoSrc720p] = useState("")
    const [videoData, setVideoData] = useState<VideoDetails | null>(null)
    const [settings, setSettings] = useState<SettingsProps>(false)
    const handleClick = (res: ResProps) => {
        setResolution(res);
    }

    const handleSettings = () => {
        setSettings(prevSettings => !prevSettings);

    }



    useEffect(() => {

        const getOriginal = async () => {
            const response = await fetch(`${BASE_URL}/video/${video_id}/`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            })
            const data = await response.json()
            setVideoSrc(`${BASE_URL}${data.video_file}`)
            setVideoData(data)
        }

        const get480p = async () => {
            const response480p = await fetch(`${BASE_URL}/video/${video_id}/480p/`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            })
            const data480p = await response480p.json()
            setVideoSrc480p(`${BASE_URL}${data480p.video_file_480p}`)
        }

        
        const get720p = async () => {
            const response720p = await fetch(`${BASE_URL}/video/${video_id}/720p/`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            })
            const data720p = await response720p.json()
            setVideoSrc720p(`${BASE_URL}${data720p.video_file_720p}`)
        }

        getOriginal()
        get480p()
        get720p()


    }, [video_id])


    return (
        <Box display="flex" flexDirection="column" alignItems="flex-end" borderRadius={2}>
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant='h6' mt={2} mb={2}>{videoData?.title}</Typography>
                {resolution === "original" && <video width="100%" controls>
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>}
                {resolution === "720p" && <video width="100%" controls>
                    <source src={videoSrc720p} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>}
                {resolution === "480p" && <video width="100%" controls>
                    <source src={videoSrc480p} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>}
                {resolution === null &&
                    <img width="100%" src={`${BASE_URL}${videoData?.thumbnail}`} alt="Video Thumbnail" />
                }
                <Typography p={2}>{videoData?.description}</Typography>
            </Box>

            {settings && (
                <Box width="100%" display="flex" alignItems="center" justifyContent="center" mb={2}>
                    <Button sx={{ width: "150px", mr: "4px" }} variant="contained" onClick={() => handleClick("original")}>Original</Button>
                    <Button sx={{ width: "150px", mr: "4px" }} variant="contained" onClick={() => handleClick("720p")}>720p</Button>
                    <Button sx={{ width: "150px" }} variant="contained" onClick={() => handleClick("480p")}>480p</Button>
                </Box>
            )}
            <SettingsIcon sx={iconStyling} onClick={handleSettings} />
        </Box>
    )
}
