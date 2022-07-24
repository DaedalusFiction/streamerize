import { useState, useEffect } from "react";

const helloLocation = `/.netlify/functions/hello`;

function useGetStreams(setLoading, refreshToggle, setCurrentStream) {
    const [streams, setStreams] = useState(null);

    useEffect(() => {
        const getStreams = async () => {
            try {
                setLoading(true);
                const streams = await fetch(`${helloLocation}`).then((res) =>
                    res.json()
                );
                setStreams(streams.body);

                setCurrentStream(streams.body[0].data[0].user_name);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        getStreams();
    }, [setLoading, refreshToggle]);
    return [streams];
}

export default useGetStreams;
