import {
    Box,
    Button,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import React from "react";
const categories = ["All Streams", "Just Chatting", "Music"];

const Categories = ({ selectedCategory, setSelectedCategory }) => {
    return (
        <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
            <List>
                {categories.map((category) => {
                    return (
                        <ListItem key={category} disablePadding>
                            <ListItemButton
                                selected={category === selectedCategory}
                                onClick={() => {
                                    setSelectedCategory(category);
                                }}
                            >
                                <ListItemText primary={category} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );
};

export default Categories;
