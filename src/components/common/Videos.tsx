import { useEffect, useState } from "react"
import { BASE_URL } from "../../static/api"
import { Box, Typography } from "@mui/material"
import Video from "./Video"
import { VideoDetails } from "../../utils/types"

export default function Videos() {
    const [videoList, setVideoList] = useState<VideoDetails[]>()
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
            if (!groupSet.includes(video.group)) {
                groupSet.push(video.group);
            }
        })
        setVideoGroups(groupSet)
    }

    console.log(videoList)
    console.log(videoGroups)


    return (
        <>
            {videoGroups.map((group) => {
                return (
                    <Box pb={2} width="100%" borderBottom="1px solid rgb(237, 232, 232);">
                        <Typography variant="h5" color="rgb(237, 232, 232);" mt={2} mb={-2}>{group.slice(0, 1).toUpperCase() + group.slice(1)}</Typography>
                        <Box display="flex">
                            {videoList?.map((video: VideoDetails) => {
                                return (
                                    <>
                                        {video.group === group && !video.favourite && <Video key={video.id} video={video} />}
                                        {video.group === group && video.favourite &&
                                            <Box>
                                                <Typography color="rgb(237, 232, 232);" mt={5}>Hier erscheinen bald neue Inhalte für dich</Typography>
                                            </Box>}
                                    </>
                                )
                            })}
                        </Box>
                    </Box>
                )
            })}
            {videoList?.map((video: VideoDetails) => {
                return (
                    <>
                        {video.favourite &&
                            <>
                                <Box pb={2} width="100%" borderBottom="1px solid rgb(237, 232, 232);">
                                    <Typography variant="h5" color="rgb(237, 232, 232);" mt={2} mb={-2}>Deine Favoriten</Typography>
                                    <Video key={video.id} video={video} />
                                </Box>
                            </>
                        }
                    </>
                )
            })}
        </>
    )
}
