import { useState, useRef, useEffect, useCallback } from "react";
import { BASE_URL } from "../static/api";

const VideoPlayer = ({ movie }) => {
    const containerRef = useRef<HTMLDivElement | null>(null); // Ref für den Fullscreen-Container
    const [isFullscreen, setIsFullscreen] = useState(false); // Zustand für Vollbild
    const [currentMovieFilePath, setCurrentMovieFilePath] = useState(movie.video_file)

    useEffect(() => {
        if (movie) {
            // Optional: weitere Logik, falls movie sich ändert
        }
    }, [movie]);

    const toggleFullscreen = useCallback(() => {
        if (containerRef.current) {
            if (isFullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            } else {
                if (containerRef.current.requestFullscreen) {
                    containerRef.current.requestFullscreen();
                }
            }
            setIsFullscreen(!isFullscreen);
        }
    }, [isFullscreen]);

    useEffect(() => {
        const handleFullscreenChange = () => {
            const isFullscreenActive =
                document.fullscreenElement === containerRef.current;
            setIsFullscreen(isFullscreenActive);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, []);

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
        <div
            ref={containerRef}
            className={`z-30 relative w-full max-w-3xl mx-auto ${isFullscreen ? "fullscreen-mode" : ""}`}
        >
            <video
                className="w-full"
                src={`${import.meta.env.VITE_BACKEND_URL}/${currentMovieFilePath}`}
                controls
            />
            {/* <video
                ref={videoRef}
                className="w-full"
                src={`${import.meta.env.VITE_BACKEND_URL}/${movie.video_file}`}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                controls={false}
                onClick={togglePlay}
            /> */}
            <div
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full flex justify-between items-center px-4 text-white"
                style={{
                    zIndex: isFullscreen ? 1000 : 10,
                }}
            >
                <div className="flex gap-2">
                    <button onClick={() => loadVersion("120p")} className="bg-blue-500 px-2 py-1 rounded-lg text-xs">
                        120p
                    </button>
                    <button onClick={() => loadVersion("720p")} className="bg-blue-500 px-2 py-1 rounded-lg text-xs">
                        720p
                    </button>
                    <button onClick={toggleFullscreen} className="bg-blue-500 px-2 py-1 rounded-lg text-xs">
                        {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
