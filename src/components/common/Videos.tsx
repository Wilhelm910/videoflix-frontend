import { useEffect, useState } from "react"
import { BASE_URL } from "../../static/api"
import { Box, Typography } from "@mui/material"
import Video from "./Video"
import { VideoDetails } from "../../utils/types"


type VideosProps = {
    searchTerm: string
}



export default function Videos({ searchTerm }: VideosProps) {
    const [videoList, setVideoList] = useState<VideoDetails[]>()
    const [videoGroups, setVideoGroups] = useState<string[]>([])
    const [filteredVideos, setFilteredVideos] = useState<VideoDetails[]>()


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


    useEffect(() => {
        const filterVideos = () => {
            const filtered = videoList?.filter(video =>
                video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                video.categories.some(category =>
                    category.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
            setFilteredVideos(filtered);
        };
        filterVideos();
        console.log(filteredVideos)
    }, [searchTerm, videoList])


    const getVideoGroups = (videos: VideoDetails[]) => {
        let groupSet: string[] = []
        videos?.map((video) => {
            if (!groupSet.includes(video.group)) {
                groupSet.push(video.group);
            }
        })
        setVideoGroups(groupSet)
    }

    return (
        <>
            {videoGroups.map((group) => {
                return (
                    <Box pb={2} width="100%" borderBottom="1px solid rgb(237, 232, 232);">
                        <Typography variant="h5" color="rgb(237, 232, 232);" mt={2} mb={-2}>{group.slice(0, 1).toUpperCase() + group.slice(1)}</Typography>
                        <Box display="flex">
                            {filteredVideos?.map((video: VideoDetails) => {
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
            <Box pb={2} width="100%" borderBottom="1px solid rgb(237, 232, 232);">
                <Typography variant="h5" color="rgb(237, 232, 232);" mt={2} mb={-2}>Deine Favoriten</Typography>
                <Box display="flex">
                    {filteredVideos?.map((video: VideoDetails) => {
                        return (
                            <>
                                {video.favourite &&

                                    <Video key={video.id} video={video} />

                                }
                            </>
                        )
                    })}
                </Box>
            </Box>
        </>
    )
}
