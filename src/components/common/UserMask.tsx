import { Box, Typography } from "@mui/material";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

export default function UserMask() {
    return (
        <>
            <Box borderRadius={2} border="2px solid #ad1c1c"
                sx={{ "&:hover": { borderColor: "rgb(237, 232, 232);", cursor: 'pointer', } }}
                width="200px" height="200px" bgcolor="#ad1c1c">
                <SentimentSatisfiedAltIcon sx={{ color: "rgb(237, 232, 232);", width: "100%", height: "100%" }} />
            </Box>
            <Typography mt={1}>NAME</Typography>
        </>
    )
}
