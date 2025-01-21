import { useState } from "react";
import { BASE_URL } from "../static/api";

const VideoPlayer = ({ movie }) => {
    const [currentMovieFilePath, setCurrentMovieFilePath] = useState(movie.video_file)

    const loadVersion = async (version: string) => {
        console.log(`${BASE_URL}/video/${movie.id}/${version}/`)
        try {
            const response = await fetch(`${BASE_URL}/video/${movie.id}/${version}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache',
                    'Authorization': `Token ${sessionStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            } else {
                console.log(data)
                setCurrentMovieFilePath(data[`video_file_${version}`])
                console.log(currentMovieFilePath)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    console.log(`${import.meta.env.VITE_BACKEND_URL}/${currentMovieFilePath}`)

    return (
        <>
            <video
                className="w-full"
                src={`${import.meta.env.VITE_BACKEND_URL}/${currentMovieFilePath}`}
                controls
            />
            <div className="flex gap-2">
                <button onClick={() => loadVersion("360p")} className="bg-blue-500 px-2 py-1 rounded-lg text-xs">
                    360p
                </button>
                <button onClick={() => loadVersion("480p")} className="bg-blue-500 px-2 py-1 rounded-lg text-xs">
                    480p
                </button>
                <button onClick={() => loadVersion("720p")} className="bg-blue-500 px-2 py-1 rounded-lg text-xs">
                    720p
                </button>
                <button onClick={() => loadVersion("1080p")} className="bg-blue-500 px-2 py-1 rounded-lg text-xs">
                    1080p
                </button>
            </div>
        </>
    );
};

export default VideoPlayer;
