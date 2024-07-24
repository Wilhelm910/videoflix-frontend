import React, { useState } from 'react';
import { Box, IconButton, Typography } from "@mui/material";
import Video from "./Video";
import { VideoDetails } from "../../utils/types";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

type VideoCategoryProps = {
    group: string;
    videos: VideoDetails[];
    itemsPerPage: number;
    onFavouriteChange: (videoId: number, favourite: boolean) => void;
};

const VideoCategory: React.FC<VideoCategoryProps> = ({ group, videos, itemsPerPage, onFavouriteChange }) => {
    const [visibleStart, setVisibleStart] = useState(0);

    const handleNext = () => {
        if (visibleStart + itemsPerPage < videos.length) {
            setVisibleStart(visibleStart + itemsPerPage);
        }
    };

    const handlePrev = () => {
        if (visibleStart - itemsPerPage >= 0) {
            setVisibleStart(visibleStart - itemsPerPage);
        }
    };

    const isPrevDisabled = visibleStart === 0;
    const isNextDisabled = visibleStart + itemsPerPage >= videos.length;

    return (
        <Box pb={2} width="100%" borderBottom="1px solid rgb(237, 232, 232);">
            {group != "favourite" && <Typography variant="h5" color="rgb(237, 232, 232);" mt={2} mb={-2}>
                {group.slice(0, 1).toUpperCase() + group.slice(1)}
            </Typography>}
            <Box display="flex" alignItems="center">
                <IconButton
                    onClick={handlePrev}
                    sx={{
                        display: isPrevDisabled ? "none" : "flex",
                        color: "rgb(237, 232, 232)",
                        transition: "transform 0.3s ease",
                        "&:hover": { transform: "scale(1.3)" },
                    }}
                    disabled={isPrevDisabled}
                >
                    <ArrowBackIosIcon />
                </IconButton>
                <Box display="flex" flex="1">
                    {videos.slice(visibleStart, visibleStart + itemsPerPage).map((video) => (
                        <Video key={video.id} video={video} onFavouriteChange={onFavouriteChange} />
                    ))}
                </Box>
                <IconButton
                    onClick={handleNext}
                    sx={{
                        display: isNextDisabled ? "none" : "flex",
                        color: "rgb(237, 232, 232)",
                        transition: "transform 0.3s ease",
                        "&:hover": { transform: "scale(1.3)" },
                    }}
                    disabled={isNextDisabled}
                >
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default VideoCategory;
