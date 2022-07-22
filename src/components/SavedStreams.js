import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

const SavedStreams = ({ savedStreams }) => {
    return (
        <Box>
            {savedStreams.map((savedStream) => {
                return (
                    <Typography key={savedStream}>{savedStream.id}</Typography>
                );
            })}
        </Box>
    );
};

export default SavedStreams;
