import { Box } from "@mui/material";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

export default function UserMask() {
    return (
        <Box borderRadius={2} border="2px solid #bc2014" sx={{ "&:hover": { borderColor: "rgb(214, 209, 209);", cursor: 'pointer', } }} width="200px" height="200px" bgcolor="#bc2014">
            <SentimentSatisfiedAltIcon sx={{ color: "rgb(214, 209, 209);", width: "100%", height: "100%" }} />
        </Box>
    )
}
