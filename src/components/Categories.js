import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import React from "react";

const Categories = ({ categories, selectedCategory, handleCategoryChange }) => {
    return (
        <List>
            {categories.map((category) => {
                return (
                    <ListItem key={category.id} disablePadding>
                        <ListItemButton
                            selected={category.name === selectedCategory.name}
                            onClick={() => {
                                handleCategoryChange(category.id);
                            }}
                        >
                            <ListItemText primary={category.name} />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
};

export default Categories;
