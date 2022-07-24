const axios = require("axios");

const api = axios.create({
    headers: {
        Authorization: process.env.REACT_APP_TWITCH_AUTHORIZATION,
        "Client-Id": process.env.REACT_APP_TWITCH_CLIENT_ID,
    },
});

exports.handler = async function (event, context) {
    // console.log("event: ", event);
    // console.log("context: ", context);

    try {
        var response = await api.get(
            process.env.REACT_APP_TWITCH_BASE_URL +
                `/streams?language=en&game_id=460636&first=10`
        );

        var pageCursor = response.data.pagination.cursor;
        //check if list is last and viewer count
        while (
            response.data.pagination.cursor &&
            response.data.data[0].viewer_count > 10
        ) {
            pageCursor = response.data.pagination.cursor;
            response = await api.get(
                process.env.REACT_APP_TWITCH_BASE_URL +
                    `/streams?language=en&game_id=460636&first=10&after=${response.data.pagination.cursor}`
            );
        }
        //get final lists

        const allStreams = await api.get(
            process.env.REACT_APP_TWITCH_BASE_URL +
                `/streams?first=100&language=en&after=${pageCursor}`
        );
        const musicStreams = await api.get(
            process.env.REACT_APP_TWITCH_BASE_URL +
                `/streams?game_id=26936&first=100&language=en&after=${pageCursor}`
        );
        const chattingStreams = await api.get(
            process.env.REACT_APP_TWITCH_BASE_URL +
                `/streams?game_id=509658&first=100&language=en&after=${pageCursor}`
        );
        const finalStreamsList = [
            allStreams.data,
            musicStreams.data,
            chattingStreams.data,
        ];

        return {
            statusCode: 200,
            body: JSON.stringify({ body: finalStreamsList }),
        };
    } catch (err) {
        return {
            statusCode: 404,
            body: "didn't work",
        };
    }
};
