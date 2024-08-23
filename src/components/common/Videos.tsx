// import { useEffect, useState } from "react"
// import { BASE_URL } from "../../static/api"
// import { Box, IconButton, Typography } from "@mui/material"
// import Video from "./Video"
// import { VideoDetails } from "../../utils/types"
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


// type VideosProps = {
//     searchTerm: string
// }





// export default function Videos({ searchTerm }: VideosProps) {
//     const [videoList, setVideoList] = useState<VideoDetails[]>()
//     const [videoGroups, setVideoGroups] = useState<string[]>([])
//     const [filteredVideos, setFilteredVideos] = useState<VideoDetails[]>()
//     const [visibleStart, setVisibleStart] = useState(0);
//     const [itemsPerPage, setItemsPerPage] = useState(4); // Initialwert


//     const ArrowBackStyle = {
//         display: `${visibleStart == 0} ? none : flex`,
//         visibility: `${visibleStart == 0} ? hidden : visible`,
//         backgroundColor: "red"
//     }


//     const updateItemsPerPage = () => {
//         const screenWidth = window.innerWidth;
//         if (screenWidth >= 1600) {
//             setItemsPerPage(4);
//         } else if (screenWidth >= 1200) {
//             setItemsPerPage(3);
//         } else if (screenWidth >= 800) {
//             setItemsPerPage(2);
//         } else {
//             setItemsPerPage(1);
//         }
//     };

//     useEffect(() => {
//         updateItemsPerPage();
//         window.addEventListener("resize", updateItemsPerPage);
//         return () => window.removeEventListener("resize", updateItemsPerPage);
//     }, []);


//     useEffect(() => {

//         const getVideos = async () => {
//             const response = await fetch(`${BASE_URL}/videos/`, {
//                 method: "GET",
//                 headers: {
//                     "content-type": "application/json"
//                 }
//             }
//             )
//             const data = await response.json()
//             setVideoList(data)
//             getVideoGroups(data)
//         }
//         getVideos()
//     }, [])


//     useEffect(() => {
//         const filterVideos = () => {
//             const filtered = videoList?.filter(video =>
//                 video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 video.categories.some(category =>
//                     category.toLowerCase().includes(searchTerm.toLowerCase())
//                 )
//             );
//             setFilteredVideos(filtered);
//         };
//         filterVideos();
//     }, [searchTerm, videoList])


//     const getVideoGroups = (videos: VideoDetails[]) => {
//         let groupSet: string[] = []
//         videos?.map((video) => {
//             if (!groupSet.includes(video.group)) {
//                 groupSet.push(video.group);
//             }
//         })
//         setVideoGroups(groupSet)
//     }


//     const handleNext = () => {
//         if (filteredVideos) {
//             if (visibleStart + itemsPerPage < filteredVideos.length) {
//                 setVisibleStart(visibleStart + itemsPerPage);
//             }
//         }

//     };

//     const handlePrev = () => {
//         if (visibleStart - itemsPerPage >= 0) {
//             setVisibleStart(visibleStart - itemsPerPage);
//         }
//     };

//     console.log(itemsPerPage)
//     console.log("visible start: " + visibleStart)
//     console.log("filteded Videos " + filteredVideos?.length)
//     if (filteredVideos && visibleStart + itemsPerPage >= filteredVideos.length) {
//         console.log("TEST")
//     }

//     const isPrevDisabled = visibleStart === 0;
//     const isNextDisabled = filteredVideos && visibleStart + itemsPerPage >= filteredVideos.length;


//     return (
//         <>
//             {videoGroups.map((group) => {
//                 return (
//                     <Box pb={2} width="100%" borderBottom="1px solid rgb(237, 232, 232);">
//                         <Typography variant="h5" color="rgb(237, 232, 232);" mt={2} mb={-2}>{group.slice(0, 1).toUpperCase() + group.slice(1)}</Typography>
//                         <Box display="flex">
//                             <IconButton onClick={handlePrev} sx={{ display: isPrevDisabled ? 'none' : 'flex', color: "rgb(237, 232, 232)", transition: "transform 0.3s ease", "&:hover": { transform: "scale(1.3)" } }} disabled={isPrevDisabled}>
//                                 <ArrowBackIosIcon />
//                             </IconButton>
//                             {filteredVideos?.map((video: VideoDetails) => {
//                                 return (
//                                     <>
//                                         {video.group === group && !video.favourite && <Video key={video.id} video={video} />}
//                                         {video.group === group && video.favourite && <Box><Typography color="rgb(237, 232, 232);" mt={5}>Hier erscheinen bald neue Inhalte für dich</Typography></Box>}
//                                     </>
//                                 )
//                             })}
//                             <IconButton onClick={handleNext} sx={{
//                                 display: isNextDisabled ? 'none' : 'flex', color: "rgb(237, 232, 232)", transition: "transform 0.3s ease", "&:hover": { transform: "scale(1.3)" },
//                             }} disabled={isNextDisabled}>
//                                 < ArrowForwardIosIcon />
//                             </IconButton>
//                         </Box>
//                     </Box>
//                 )
//             })}
//             {/* <Box pb={2} width="100%" borderBottom="1px solid rgb(237, 232, 232);">
//                 <Typography variant="h5" color="rgb(237, 232, 232);" mt={2} mb={-2}>Deine Favoriten</Typography>
//                 <Box display="flex" alignItems="center" flexWrap="wrap" flex="1">
//                     {filteredVideos?.map((video: VideoDetails) => {
//                         return (
//                             <>
//                                 {video.favourite && <Video key={video.id} video={video} />}
//                             </>
//                         )
//                     })}
//                        { <ArrowForwardIosIcon />}
//                 </Box>
//             </Box> */}
//             <Box pb={2} width="100%" borderBottom="1px solid rgb(237, 232, 232);">
//                 <Typography variant="h5" color="rgb(237, 232, 232);" mt={2} mb={-2}>Deine Favoriten</Typography>
//                 <Box display="flex" alignItems="center">
//                     <IconButton onClick={handlePrev} sx={{ display: isPrevDisabled ? 'none' : 'flex', color: "rgb(237, 232, 232)", transition: "transform 0.3s ease", "&:hover": { transform: "scale(1.3)" } }} disabled={isPrevDisabled}>
//                         <ArrowBackIosIcon />
//                     </IconButton>
//                     <Box display="flex" flex="1">
//                         {filteredVideos?.filter(video => video.favourite)
//                             .slice(visibleStart, visibleStart + itemsPerPage)
//                             .map(video => (
//                                 <Video key={video.id} video={video} />
//                             ))}
//                     </Box>
//                     <IconButton onClick={handleNext} sx={{
//                         display: isNextDisabled ? 'none' : 'flex', color: "rgb(237, 232, 232)", transition: "transform 0.3s ease", "&:hover": { transform: "scale(1.3)" },
//                     }} disabled={isNextDisabled}>
//                         < ArrowForwardIosIcon />
//                     </IconButton>
//                 </Box>
//             </Box >
//         </>
//     )
// }

import { useEffect, useState } from "react";
import { BASE_URL } from "../../static/api";
import { Box, Typography } from "@mui/material";
import VideoCategory from "./VideoCategory";
import { VideoDetails } from "../../utils/types";

type VideosProps = {
    searchTerm: string;
};

export default function Videos({ searchTerm }: VideosProps) {
    const [videoList, setVideoList] = useState<VideoDetails[]>([]);
    const [videoGroups, setVideoGroups] = useState<string[]>([]);
    const [filteredVideos, setFilteredVideos] = useState<VideoDetails[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState(4); // Initialwert

    const updateItemsPerPage = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1600) {
            setItemsPerPage(4);
        } else if (screenWidth >= 1200) {
            setItemsPerPage(3);
        } else if (screenWidth >= 800) {
            setItemsPerPage(2);
        } else {
            setItemsPerPage(1);
        }
    };

    useEffect(() => {
        updateItemsPerPage();
        window.addEventListener("resize", updateItemsPerPage);
        return () => window.removeEventListener("resize", updateItemsPerPage);
    }, []);

    useEffect(() => {
        const getVideos = async () => {
            const response = await fetch(`${BASE_URL}/videos/`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                },
            });
            const data = await response.json();
            setVideoList(data);
            getVideoGroups(data);
        };
        getVideos();
    }, []);

    useEffect(() => {
        const filterVideos = () => {
            const filtered = videoList?.filter(
                (video) =>
                    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    video.categories.some((category) =>
                        category.toLowerCase().includes(searchTerm.toLowerCase())
                    )
            );
            setFilteredVideos(filtered);
        };
        filterVideos();
    }, [searchTerm, videoList]);

    const getVideoGroups = (videos: VideoDetails[]) => {
        let groupSet: string[] = [];
        videos?.forEach((video) => {
            if (!groupSet.includes(video.group)) {
                groupSet.push(video.group);
            }
        });
        setVideoGroups(groupSet);
    };


    const handleFavouriteChange = (videoId: number, favourite: boolean) => {
        setVideoList((prevList) =>
            prevList.map((video) =>
                video.id === videoId ? { ...video, favourite } : video
            )
        );
    };

    console.log(videoList)

    return (
        <>
            {videoGroups.map((group) => {
                const groupVideos = filteredVideos.filter((video) => video.group === group && !video.favourite);
                return <VideoCategory key={group} group={group} videos={groupVideos} itemsPerPage={itemsPerPage} onFavouriteChange={handleFavouriteChange} />;
            })}
            <Box pb={2} width="100%" borderBottom="1px solid rgb(237, 232, 232);">
                <Typography variant="h5" color="rgb(237, 232, 232);" mt={2} mb={-2}>
                    Deine Favoriten
                </Typography>
                <Box display="flex" alignItems="center">
                    <VideoCategory
                        group="favourite"
                        videos={filteredVideos.filter((video) => video.favourite)}
                        itemsPerPage={itemsPerPage}
                        onFavouriteChange={handleFavouriteChange}
                    />
                </Box>
            </Box>
        </>
    );
}
