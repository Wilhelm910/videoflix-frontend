import { useEffect, useState } from "react"
import { BASE_URL } from "../../static/api"
import { Box, Button, Typography } from "@mui/material"
import Video from "./Video"
import { VideoDetails } from "../../utils/types"

export default function Videos() {
    const [videoList, setVideoList] = useState()
    const [videoGroups, setVideoGroups] = useState<string[]>([])


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
            getVideoGroups(data)
        }
        getVideos()
    }, [])


    const getVideoGroups = (videos: VideoDetails[]) => {
        let groupSet: string[] = []
        videos?.map((video) => {
            if (video.group) {
                groupSet.push(video.group);
            }
        })
        setVideoGroups(groupSet)
    }
  
    console.log(videoList)


    return (
        <>
            <div style={{ marginTop: "16px" }}>
                {/* {renderVideos} */}
                {videoList?.map((video) => {
                    return (
                        <>
                            <Box>
                                <Typography></Typography>
                            </Box>
                            <Video key={video.id} video={video} />
                        </>
                    )
                })}
            </div>
        </>
    )
}
