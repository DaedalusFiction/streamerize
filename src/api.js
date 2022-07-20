import axios from "axios";

let api = axios.create({
    headers: {
        Authorization: process.env.TWITCH_AUTHORIZATION,
        "Client-Id": process.env.TWITCH_CLIENT_ID,
    },
});

export default api;
