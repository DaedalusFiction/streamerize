import { ThemeProvider } from "@emotion/react";
import "./App.css";
import { primary } from "./themes/primary";
import { Container } from "@mui/system";
import {
    Box,
    Button,
    CssBaseline,
    Grid,
    Paper,
    Typography,
} from "@mui/material";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";

function App() {
    const [loading, setLoading] = useState(false);
    const [streamList, setStreamList] = useState("stream-list");
    const [streamID, setStreamID] = useState("stream-ID");
    const handleGetRandomStream = async () => {
        console.log("base url: ", process.env.REACT_APP_TWITCH_BASE_URL);
        const url = `/.netlify/functions/hello`;
        try {
            setLoading(true);
            const todo = await fetch(url).then((res) => res.json());
            // setStreamList(todo.title);
            console.log(todo.body.data[0]);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <ThemeProvider theme={primary}>
            <CssBaseline />
            <Container maxWidth="xl">
                <Typography variant="h1">STREAMERIZE</Typography>
                <Paper
                    sx={{
                        padding: ".25em",
                        backgroundColor: primary.palette.custom.accent,
                    }}
                >
                    <Paper sx={{ padding: ".5em" }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={9}>
                                <Box
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
                                        url="https://www.twitch.tv/goesonghost"
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Box>Options panel</Box>
                                <Button onClick={handleGetRandomStream}>
                                    Random Stream
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}

export default App;
