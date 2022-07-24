import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SavedStreams from "./SavedStreams";
import Categories from "./Categories";
import { useState } from "react";
import useGetStreams from "../hooks/useGetStreams";
import { Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const categories = [
    { name: "All Streams", id: 0 },
    { name: "Music", id: 1 },
    { name: "Just Chatting", id: 2 },
];

export default function Sidebar({ currentStream, setCurrentStream }) {
    const [value, setValue] = useState(0);
    const [loading, setLoading] = useState(false);
    const [refreshToggle, setRefreshToggle] = useState(true);
    const [streams] = useGetStreams(
        setLoading,
        refreshToggle,
        setCurrentStream
    );
    const [streamsIndex, setStreamsIndex] = useState(1);
    const [savedStreams, setSavedStreams] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
            setCurrentStream(streams[category.id].data[streamsIndex + 1]);
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
            <Box id="sidebar" sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                    >
                        <Tab label="Categories" {...a11yProps(0)} />
                        <Tab label="Saved" {...a11yProps(1)} />
                        <Tab label="Settings" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Categories
                        categories={categories}
                        selectedCategory={selectedCategory}
                        handleCategoryChange={handleCategoryChange}
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <SavedStreams
                        currentStream={currentStream}
                        setCurrentStream={setCurrentStream}
                        savedStreams={savedStreams}
                        setSavedStreams={setSavedStreams}
                    />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Settings
                </TabPanel>
            </Box>
            <Box sx={{ display: "flex", gap: ".25em" }}>
                <Button variant="contained" onClick={handleSaveStream}>
                    <FavoriteIcon />
                </Button>
                <Button
                    disabled={loading}
                    variant="contained"
                    fullWidth
                    onClick={() => {
                        handleGetRandomStream(selectedCategory);
                    }}
                >
                    {loading ? "Loading..." : "Random Stream"}
                </Button>
            </Box>
        </Box>
    );
}
