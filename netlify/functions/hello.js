const axios = require("axios");

const api = axios.create({
    headers: {
        Authorization: process.env.REACT_APP_TWITCH_AUTHORIZATION,
        "Client-Id": process.env.REACT_APP_TWITCH_CLIENT_ID,
    },
});

exports.handler = async function (event, context) {
    console.log("event: ", event);
    console.log("context: ", context);
    try {
        const { id } = event.queryStringParameters;

        const response = await api.get(
            process.env.REACT_APP_TWITCH_BASE_URL + `/streams?game_id=${id}`
        );
        console.log(response.data);

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
