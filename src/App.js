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
import useGetStreams from "./hooks/useGetStreams";
import FavoriteIcon from "@mui/icons-material/Favorite";

const helloLocation = `/.netlify/functions/hello`;
const baseURL = "https://twitch.tv/";

const categories = [
    { name: "All Streams", id: 0 },
    { name: "Music", id: 1 },
    { name: "Just Chatting", id: 2 },
];

function App() {
    const [loading, setLoading] = useState(false);
    const [refreshToggle, setRefreshToggle] = useState(true);
    const [currentStream, setCurrentStream] = useState(null);
    const [streams] = useGetStreams(
        setLoading,
        refreshToggle,
        setCurrentStream
    );
    const [streamsIndex, setStreamsIndex] = useState(1);
    const [savedStreams, setSavedStreams] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    const handleCategoryChange = (categoryID) => {
        if (categoryID === selectedCategory.id) {
            return;
        }
        handleGetRandomStream(categories[categoryID]);
        setSelectedCategory(categories[categoryID]);
    };

    const handleGetRandomStream = (category) => {
        setLoading(true);
        if (streamsIndex + 1 < streams[category.id].data.length) {
            setCurrentStream(
                streams[category.id].data[streamsIndex + 1].user_name
            );
            setStreamsIndex(streamsIndex + 1);
            //prevent users from getting stream more than once per second
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        } else {
            setRefreshToggle(!refreshToggle);
        }
    };
    const handleSaveStream = () => {
        if (savedStreams.includes(currentStream)) {
            return;
        }
        setSavedStreams([...savedStreams, currentStream]);
    };
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
                                        currentStream={currentStream}
                                        setCurrentStream={setCurrentStream}
                                    />
                                    <Box sx={{ display: "flex", gap: ".25em" }}>
                                        <Button
                                            variant="contained"
                                            onClick={handleSaveStream}
                                        >
                                            <FavoriteIcon />
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
