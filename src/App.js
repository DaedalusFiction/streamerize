import { ThemeProvider } from "@emotion/react";
import "./App.css";
import { primary } from "./themes/primary";
import { Container } from "@mui/system";
import { Box, CssBaseline, Grid, Paper, Typography } from "@mui/material";
import ReactPlayer from "react-player";
import { useState } from "react";
import Sidebar from "./components/Sidebar";

const baseURL = "https://twitch.tv/";

function App() {
    const [currentStream, setCurrentStream] = useState({
        user_name: "",
    });

    return (
        <ThemeProvider theme={primary}>
            <CssBaseline />
            <Container maxWidth="xl">
                <Typography
                    variant="h1"
                    sx={{ display: "inline-block", marginRight: ".25em" }}
                >
                    STREAMERIZE
                </Typography>
                <Typography
                    variant="h2"
                    sx={{
                        display: { xs: "block", md: "inline-block" },
                        marginBottom: "1em",
                    }}
                >
                    Browse random twitch.tv streams with fewer than ten viewers
                </Typography>

                <Paper
                    sx={{
                        padding: ".25em",
                        backgroundColor: primary.palette.custom.accent,
                    }}
                >
                    <Paper sx={{ padding: ".5em" }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} xl={9}>
                                <Box
                                    id="player"
                                    sx={{
                                        position: "relative",
                                        paddingTop: "56.25%",
                                    }}
                                >
                                    <ReactPlayer
                                        style={{
                                            position: "absolute",
                                            top: "0",
                                            left: "0",
                                        }}
                                        id="player"
                                        width="100%"
                                        height="100%"
                                        url={baseURL + currentStream.user_name}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} xl={3}>
                                <Sidebar
                                    currentStream={currentStream}
                                    setCurrentStream={setCurrentStream}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}

export default App;
