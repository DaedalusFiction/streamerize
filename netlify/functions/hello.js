const axios = require("axios");

const api = axios.create({
    // headers: {
    //     Authorization: process.env.REACT_APP_TWITCH_AUTHORIZATION,
    //     "Client-Id": process.env.REACT_APP_TWITCH_CLIENT_ID,
    // },
});

exports.handler = async function (event, context) {
    console.log("triggered");
    // console.log(event);
    // console.log(context);
    try {
        const { id } = event.queryStringParameters;
        const response = await api.get(
            "https://jsonplaceholder.typicode.com/todos"
        );
        // console.log("Response:::: ", response);
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
