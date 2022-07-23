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
import Sidebar from "./components/Sidebar";
import { CleaningServices } from "@mui/icons-material";

const helloLocation = `/.netlify/functions/hello`;
const baseURL = "https://twitch.tv/";

const categories = [
    { name: "All Streams", id: "460636" },
    { name: "Just Chatting", id: "2" },
    { name: "Music", id: "3" },
];

function App() {
    const [loading, setLoading] = useState(false);
    const [currentStream, setCurrentStream] = useState(null);
    const [streamList, setStreamList] = useState(null);
    const [streamsIndex, setStreamsIndex] = useState(0);
    const [savedStreams, setSavedStreams] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    useEffect(() => {
        getStreams(categories[0].id);
    }, []);

    const getStreams = async (id) => {
        try {
            setLoading(true);
            const streams = await fetch(`${helloLocation}?id=${id}`).then(
                (res) => res.json()
            );
            // setStreamList(streams.title);
            setStreamList(streams.body.data);
            setCurrentStream(streams.body.data[0].user_name);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };
    const handleGetRandomStream = () => {
        setLoading(true);
        console.log("streamsIndex: ", streamsIndex);
        console.log("streamList.length: ", streamList.length);
        if (streamsIndex + 2 < streamList.length) {
            setCurrentStream(streamList[streamsIndex + 1].user_name);
            setStreamsIndex(streamsIndex + 1);
            //prevent users from getting stream more than once per second
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        } else {
            getStreams(categories[0].id);
            setStreamsIndex(0);
        }
    };
    const handleSaveStream = () => {
        setSavedStreams([...savedStreams, currentStream]);
    };
    return (
        <ThemeProvider theme={primary}>
            <CssBaseline />
            <Container maxWidth="xl">
                <Typography variant="h1">STREAMERIZE</Typography>
                <Typography variant="h2" color="secondary">
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
                                        url={baseURL + currentStream}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} xl={3}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexFlow: {
                                            xs: "column-reverse",
                                            xl: "column",
                                        },
                                        justifyContent: "space-between",
                                        height: "100%",
                                    }}
                                >
                                    <Sidebar
                                        categories={categories}
                                        savedStreams={savedStreams}
                                        setSavedStreams={setSavedStreams}
                                        selectedCategory={selectedCategory}
                                        setSelectedCategory={
                                            setSelectedCategory
                                        }
                                    />
                                    <Box sx={{ display: "flex", gap: ".25em" }}>
                                        <Button
                                            variant="contained"
                                            onClick={handleSaveStream}
                                        >
                                            +
                                        </Button>
                                        <Button
                                            disabled={loading}
                                            variant="contained"
                                            fullWidth
                                            onClick={handleGetRandomStream}
                                        >
                                            {loading
                                                ? "Loading..."
                                                : "Random Stream"}
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}

export default App;
