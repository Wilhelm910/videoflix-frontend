import { Box, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { BASE_URL } from '../../static/api';
import { VideoDetails } from '../../utils/types';


type ResProps = "original" | "480p" | null;

type VideoManagerProps = {
    video_id: number
}




export default function VideoManager({ video_id }: VideoManagerProps) {
    const [resolution, setResolution] = useState<ResProps>(null);
    const [videoSrc, setVideoSrc] = useState("");
    const [videoSrc2, setVideoSrc2] = useState("")
    const [videoData, setVideoData] = useState<VideoDetails | null>(null)
    const handleClick = (res: ResProps) => {
        setResolution(res);
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
            setVideoSrc2(`${BASE_URL}${data480p.video_file_480p}`)
        }

        getOriginal()
        get480p()


    }, [video_id])

    console.log(videoData)


    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            {resolution === "original" && <video width="320" height="240" controls>
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>}
            {resolution === "480p" && <video width="320" height="240" controls>
                <source src={videoSrc2} type="video/mp4" />
                Your browser does not support the video tag.
            </video>}
            {resolution === null &&
                <img width={320} src={`${BASE_URL}${videoData?.thumbnail}`} alt="Video Thumbnail"/>
            }
            <Button sx={{ width: "150px", marginBottom: "4px" }} variant="contained" onClick={() => handleClick("original")}>Original</Button>
            <Button sx={{ width: "150px" }} variant="contained" onClick={() => handleClick("480p")}>480p</Button>
        </Box>
    )
}


// useEffect(() => {
//     const get480p = async () => {
//         try {
//             const response = await fetch(`${BASE_URL}/video/${video_id}/480p/`, {
//                 method: "GET",
//                 headers: {
//                     "content-type": "application/json"
//                 }
//             });
//             const data = await response.json();
//             if (data.video_file_480p) {
//                 setVideoSrc(`${BASE_URL}${data.video_file_480p}`);
//             } else {
//                 console.error("480p video URL not found");
//             }
//         } catch (error) {
//             console.error("Error fetching 480p video:", error);
//         }
//     };

//     if (resolution === "original") {
//         setVideoSrc(`${BASE_URL}${video.video_file}`);
//     } else if (resolution === "480p") {
//         if (video.video_file_480p) {
//             setVideoSrc(`${BASE_URL}${video.video_file_480p}`);
//         } else {
//             get480p();
//         }
//     }
// }, [resolution, video.id, video.video_file, video.video_file_480p]);
