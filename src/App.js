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

const helloLocation = `/.netlify/functions/hello`;
const baseURL = "https://twitch.tv/";

const categories = [
    { name: "All Streams", id: "33214" },
    { name: "Just Chatting", id: "2" },
    { name: "Music", id: "3" },
];

function App() {
    const [loading, setLoading] = useState(false);
    const [currentStream, setCurrentStream] = useState(null);
    const [streamList, setStreamList] = useState("stream-list");
    const [streamsIndex, setStreamsIndex] = useState(0);
    const [savedStreams, setSavedStreams] = useState([]);
    const [streamID, setStreamID] = useState("stream-ID");
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    useEffect(() => {
        getStreams();
    }, []);

    const getStreams = async () => {
        try {
            setLoading(true);
            const todo = await fetch(
                `${helloLocation}?id=${categories[0].id}`
            ).then((res) => res.json());
            // setStreamList(todo.title);
            setStreamList(todo.body.data);
            setCurrentStream(todo.body.data[0].user_name);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };
    const handleGetRandomStream = () => {
        setCurrentStream(streamList[streamsIndex + 1].user_name);
        setStreamsIndex(streamsIndex + 1);
    };
    const handleSaveStream = () => {
        setSavedStreams([...savedStreams, currentStream]);
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
                                            variant="contained"
                                            fullWidth
                                            onClick={handleGetRandomStream}
                                        >
                                            Random Stream
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
