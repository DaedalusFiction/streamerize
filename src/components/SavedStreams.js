import {
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import ClearIcon from "@mui/icons-material/Clear";

const SavedStreams = ({
    currentStream,
    setCurrentStream,
    savedStreams,
    setSavedStreams,
}) => {
    const handleDelete = (stream) => {
        const newSavedStreams = savedStreams.filter(
            (savedStream) => stream.user_name !== savedStream.user_name
        );
        setSavedStreams(newSavedStreams);
    };
    return (
        <List dense>
            {savedStreams.map((stream, index) => {
                return (
                    <ListItem
                        key={index}
                        disablePadding
                        secondaryAction={
                            <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => {
                                    handleDelete(stream);
                                }}
                            >
                                <ClearIcon />
                            </IconButton>
                        }
                    >
                        <ListItemButton
                            selected={currentStream === stream}
                            onClick={() => {
                                setCurrentStream(stream);
                            }}
                        >
                            <ListItemText>
                                {`${stream.user_name} -- ${stream.game_name}`}
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                );
            })}
            {savedStreams.length === 0 && (
                <ListItem>
                    <ListItemText>
                        No saved streams yet. Click the heart button to save.
                    </ListItemText>
                </ListItem>
            )}
        </List>
    );
};

export default SavedStreams;
