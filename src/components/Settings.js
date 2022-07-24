import { List, ListItem, ListItemText, Switch } from "@mui/material";

const Settings = ({ isShowingMature, setIsShowingMature }) => {
    return (
        <List>
            <ListItem>
                <ListItemText>Show 18+ Streams</ListItemText>
                <Switch
                    edge="end"
                    onChange={() => {
                        setIsShowingMature(!isShowingMature);
                    }}
                    checked={isShowingMature}
                />
            </ListItem>
        </List>
    );
};

export default Settings;
