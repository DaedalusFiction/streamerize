const axios = require("axios");

const api = axios.create({
    headers: {
        Authorization: process.env.REACT_APP_TWITCH_AUTHORIZATION,
        "Client-Id": process.env.REACT_APP_TWITCH_CLIENT_ID,
    },
});

exports.handler = async function (event, context) {
    console.log("triggered");
    // console.log(event);
    // console.log(context);
    try {
        const { id } = event.queryStringParameters;
        console.log(process.env.REACT_APP_TWITCH_BASE_URL);
        const response = await api.get(process.env.REACT_APP_TWITCH_BASE_URL);

        // console.log("Response:::: ", response);
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
