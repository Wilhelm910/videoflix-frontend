import { Box, Button } from "@mui/material"
import { BASE_URL } from "../../static/api"
import { useEffect, useState } from "react"

type ResProps = "original" | "480p"

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
}

export default function Video({ video }: VideoProps) {
    const [resolution, setResolution] = useState("original")
    const [videoSrc, setVideoSrc] = useState(`${BASE_URL}/${video.video_file}`)

    const handleClick = (res: ResProps) => {
        setResolution(res)
    }
    console.log(resolution)

    useEffect(() => {
        const get480p = async () => {
            try {
                const response = await fetch(`${BASE_URL}/video/${video.id}/480p/`, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json"
                    }
                });
                const data = await response.json();
                console.log(data)
                console.log(data.video_file_480p)
                if (data.video_file_480p) {
                    console.log("source set")
                    setVideoSrc(`${BASE_URL}/${data.video_file_480p}`);
                } else {
                    console.error("480p video URL not found");
                }
            } catch (error) {
                console.error("Error fetching 480p video:", error);
            }
        };

        if (resolution === "original") {
            setVideoSrc(`${BASE_URL}/${video.video_file}`);
        } else if (resolution === "480p") {
            console.log(video)
            if (video.video_file_480p) {
                setVideoSrc(`${BASE_URL}/${video.video_file_480p}`);
            } else {
                get480p();
            }
        }
    }, [resolution, video.id, video.video_file, video.video_file_480p]);


    return (
        <Box key={video.id}>
            <div>{video.title}</div>
            <video width="320" height="240" controls>
                {resolution == "original" && <source src={videoSrc} type="video/mp4" />}
                Your browser does not support the video tag.
            </video>
            <Button variant="contained" onClick={() => handleClick("original")}>Original</Button>
            <Button variant="contained" onClick={() => handleClick("480p")}>480p</Button>
            <video width="320" height="240" controls>
                {resolution == "480p" && <source src={`${BASE_URL}/${video.video_file_480p}`} type="video/mp4" />}
                Your browser does not support the video tag.
            </video>
        </Box>
    )
}
