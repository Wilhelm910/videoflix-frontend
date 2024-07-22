import { useEffect, useState } from "react"
import { BASE_URL } from "../../static/api"
import { Box, Button } from "@mui/material"
import Video from "./Video"

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
            setVideoList(data)
        }

        getVideos()



    }, [])


    return (
        <>
            <div style={{marginTop: "16px"}}>
                {/* {renderVideos} */}
                {videoList?.map((video) => {
                    return (
                        <Video key={video.id} video={video} />
                    )
                })}
            </div>
        </>
    )
}
