import { List, ListItem, ListItemText, Switch } from "@mui/material";
import React, { useState } from "react";

const Settings = ({ isShowingMature, setIsShowingMature }) => {
    const [isNightMode, setIsNightMode] = useState(false);

    return (
        <List>
            <ListItem>
                <ListItemText>Night Mode</ListItemText>
                <Switch
                    edge="end"
                    onChange={() => {
                        setIsNightMode(!isNightMode);
                    }}
                    checked={isNightMode}
                />
            </ListItem>
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
