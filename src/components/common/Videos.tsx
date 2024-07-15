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
            console.log(data)
            setVideoList(data)
        }

        getVideos()



    }, [])


    // const renderVideos = videoList?.map((video) => {
    //     return (
    //         <Video video={video} />
    //         //     <Box key={video.id}>
    //         //         <div>{video.title}</div>
    //         //         <video width="320" height="240" controls>
    //         //             <source src={`${BASE_URL}/${video.video_file}`} type="video/mp4" />
    //         //             Your browser does not support the video tag.
    //         //         </video>
    //         //         <Button variant="contained">Original</Button>
    //         //         <Button variant="contained">480p</Button>
    //         //     </Box>
    //         // 
    //     )
    // })


    return (
        <>
            {/* {renderVideos} */}
            {videoList?.map((video) => {
                return (
                    <Video key={video.id} video={video} />
                )
            })}

        </>
    )
}
