const axios = require("axios");

const api = axios.create({
    headers: {
        Authorization: process.env.TWITCH_AUTHORIZATION,
        "Client-Id": process.env.TWITCH_CLIENT_ID,
    },
});

exports.handler = async function (event, context) {
    // console.log(event);
    // console.log(context);
    try {
        const { id } = event.queryStringParameters;
        const response = await api.get(
            process.env.TWITCH_BASE_URL + "/streams"
        );
        console.log(response);
        return {
            statusCode: 200,
            body: JSON.stringify({ title: "adsfadsf" }),
        };
    } catch (err) {
        return {
            statusCode: 404,
            body: "didn't work",
        };
    }
};
