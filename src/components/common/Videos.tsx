import { useEffect, useState } from "react"
import { BASE_URL } from "../../static/api"
import { Box } from "@mui/material"

export default function Videos() {
    const [videoList, setVideoList] = useState()


    useEffect(() => {

        const getVideos = async () => {
            const response = await fetch(`${BASE_URL}/videos/`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            }
            )
            const data = await response.json()
            console.log(data)
            setVideoList(data)
        }

        getVideos()


    }, [])


    const renderVideos = videoList?.map((video) => {
        return (
            <Box key={video.id}>
                <div>{video.title}</div>
                <video width="320" height="240" controls>
                    <source src={`${BASE_URL}/${video.video_file}`} />
                    Your browser does not support the video tag.
                </video>

            </Box>
        )
    })


    return (
        <>
            {renderVideos}
        </>
    )
}
