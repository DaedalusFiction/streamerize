import {
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";

const SavedStreams = ({ currentStream, setCurrentStream, savedStreams }) => {
    return (
        <Box>
            <List>
                {savedStreams.map((stream, index) => {
                    return (
                        <ListItem key={index} disablePadding>
                            <ListItemButton
                                selected={currentStream === stream}
                                onClick={() => {
                                    setCurrentStream(stream);
                                }}
                            >
                                <ListItemText primary={stream} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );
};

export default SavedStreams;
