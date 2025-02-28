import { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../static/api";
import { toast } from "react-toastify";

const VideoPlayer = ({ movie }:any) => {
    const [currentMovieFilePath, setCurrentMovieFilePath] = useState(movie.video_file)
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [, setSavedTime] = useState<number | null>(null);

    // Funktion zum Speichern der aktuellen Position
    const saveVideoPosition = () => {
        if (videoRef.current) {
            sessionStorage.setItem(`video_position_${movie.id}`, videoRef.current.currentTime.toString());
        }
    };

    // Position aus sessionStorage abrufen
    useEffect(() => {
        const storedTime = sessionStorage.getItem(`video_position_${movie.id}`);
        if (storedTime) {
            setSavedTime(parseFloat(storedTime));
        }
    }, [currentMovieFilePath]);

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
                setCurrentMovieFilePath(data[`video_file_${version}`])
                toast.success(`Now playing in ${version}`)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="bg-black p-2">
                <video
                    id='videoPlayer'
                    ref={videoRef}
                    className="w-full max-h-96"
                    src={`${import.meta.env.VITE_BACKEND_URL}/${currentMovieFilePath}`}
                    controls
                    onPause={saveVideoPosition}
                    onEnded={saveVideoPosition}

                />
                <div className="flex gap-2">
                    <button onClick={() => loadVersion("360p")} className="bg-blue-500 px-2 py-1 rounded-xl text-xs">
                        360p
                    </button>
                    <button onClick={() => loadVersion("480p")} className="bg-blue-500 px-2 py-1 rounded-xl text-xs">
                        480p
                    </button>
                    <button onClick={() => loadVersion("720p")} className="bg-blue-500 px-2 py-1 rounded-xl text-xs">
                        720p
                    </button>
                    <button onClick={() => loadVersion("1080p")} className="bg-blue-500 px-2 py-1 rounded-xl text-xs">
                        1080p
                    </button>
                </div>
            </div>
        </>
    );
};

export default VideoPlayer;
