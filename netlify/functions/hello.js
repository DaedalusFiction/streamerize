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
        const { id } = event.queryStringParameters;

        var response = await api.get(
            process.env.REACT_APP_TWITCH_BASE_URL +
                `/streams?language=en&game_id=${id}&first=10`
        );

        var pageCursor = response.data.pagination.cursor;
        console.log("first response: ", response.data.data.length);
        //check if list is last and viewer count
        while (
            response.data.pagination.cursor &&
            response.data.data[0].viewer_count > 10
        ) {
            pageCursor = response.data.pagination.cursor;
            response = await api.get(
                process.env.REACT_APP_TWITCH_BASE_URL +
                    `/streams?language=en&game_id=${id}&first=10&after=${response.data.pagination.cursor}`
            );

            console.log(response.data.data[0].viewer_count);
        }
        response = await api.get(
            process.env.REACT_APP_TWITCH_BASE_URL +
                `/streams?first=100&language=en&after=${pageCursor}`
        );
        console.log("final response length: ", response.data.data.length);

        return {
            statusCode: 200,
            body: JSON.stringify({ body: response.data }),
        };
    } catch (err) {
        return {
            statusCode: 404,
            body: "didn't work",
        };
    }
};
