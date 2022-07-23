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
    { name: "All Streams", id: 0 },
    { name: "Just Chatting", id: 1 },
    { name: "Music", id: 2 },
];

function App() {
    const [loading, setLoading] = useState(false);
    const [currentStream, setCurrentStream] = useState(null);
    const [streamsList, setStreamsList] = useState(null);
    const [streamsIndex, setStreamsIndex] = useState(1);
    const [savedStreams, setSavedStreams] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    useEffect(() => {
        getStreams();
    }, []);

    const handleCategoryChange = (categoryID) => {
        if (categoryID === selectedCategory.id) {
            return;
        }
        handleGetRandomStream(categories[categoryID]);
        setSelectedCategory(categories[categoryID]);
    };

    const getStreams = async () => {
        try {
            setLoading(true);
            const streams = await fetch(`${helloLocation}`).then((res) =>
                res.json()
            );
            setStreamsList(streams.body);
            setCurrentStream(
                streams.body[selectedCategory.id].data[1].user_name
            );
            setStreamsIndex(1);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };
    const handleGetRandomStream = (category) => {
        setLoading(true);
        console.log(streamsList[category.id].data);
        if (streamsIndex + 1 < streamsList[category.id].data.length) {
            setCurrentStream(
                streamsList[category.id].data[streamsIndex + 1].user_name
            );
            setStreamsIndex(streamsIndex + 1);
            //prevent users from getting stream more than once per second
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        } else {
            getStreams();
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
                                        handleCategoryChange={
                                            handleCategoryChange
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
                                            onClick={() => {
                                                handleGetRandomStream(
                                                    selectedCategory
                                                );
                                            }}
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
