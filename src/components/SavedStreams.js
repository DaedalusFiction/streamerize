import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const SavedStreams = ({ savedStreams }) => {
    return (
        <Box>
            {savedStreams.map((savedStream, index) => {
                return <Typography key={index}>{savedStream}</Typography>;
            })}
        </Box>
    );
};

export default SavedStreams;
