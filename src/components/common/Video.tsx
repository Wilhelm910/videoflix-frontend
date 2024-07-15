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

    console.log(video)


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
                })
                const data = await response.json()
                console.log(data)
            }
            catch (error) {
                console.log(error)
            }
        }
        if (resolution == "480p") {
            get480p()
        }
    }, [resolution])


    return (
        <Box key={video.id}>
            <div>{video.title}</div>
            <video width="320" height="240" controls>
                {resolution == "original" && <source src={`${BASE_URL}/${video.video_file}`} type="video/mp4" />}
                {resolution == "480p" && <source src={`${BASE_URL}/${video.video_file_480p}`} type="video/mp4" />}
                Your browser does not support the video tag.
            </video>
            <Button variant="contained" onClick={() => handleClick("original")}>Original</Button>
            <Button variant="contained" onClick={() => handleClick("480p")}>480p</Button>
        </Box>
    )
}
