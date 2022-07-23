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

const Categories = ({ categories, selectedCategory, setSelectedCategory }) => {
    return (
        <Box>
            <List>
                {categories.map((category) => {
                    return (
                        <ListItem key={category.id} disablePadding>
                            <ListItemButton
                                selected={
                                    category.name === selectedCategory.name
                                }
                                onClick={() => {
                                    setSelectedCategory(category);
                                }}
                            >
                                <ListItemText primary={category.name} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );
};

export default Categories;
