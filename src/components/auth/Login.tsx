import { Box, Typography } from "@mui/material";
import UserMask from "../common/UserMask";

export default function login() {
    return (
        <Box sx={{ width: "100%", flex: "1", paddingTop: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h2">Wer schaut gerade?</Typography>
            <UserMask />
            <Typography>Noch keinen Account? Werde hier Teil der Crew.</Typography>
        </Box>
    )
}
