import { useState, useRef, useEffect } from "react";
import videoSrc from "../assets/Kuchen.mp4";

const VideoPlayer = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null); // Ref für das Video
    const containerRef = useRef<HTMLDivElement | null>(null); // Ref für den Fullscreen-Container
    const [isPlaying, setIsPlaying] = useState(false); // Play/Pause-Status
    const [currentTime, setCurrentTime] = useState(0); // Aktuelle Zeit des Videos
    const [duration, setDuration] = useState(0); // Gesamtdauer des Videos
    const [isFullscreen, setIsFullscreen] = useState(false); // Zustand für Vollbild

    // Funktion, um das Video zu starten oder zu pausieren
    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // Funktion zum Vorspulen des Videos
    const fastForward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime += 5; // Spult 5 Sekunden vor
        }
    };

    // Funktion zum Zurückspulen des Videos
    const rewind = () => {
        if (videoRef.current) {
            videoRef.current.currentTime -= 5; // Spult 5 Sekunden zurück
        }
    };

    // Funktion, um den Fullscreen-Modus zu aktivieren oder zu deaktivieren
    const toggleFullscreen = () => {
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
    };

    // Funktion, um die Zeit des Videos zu aktualisieren
    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    // Funktion, um die Gesamtdauer des Videos zu erhalten
    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };
    // Überwachung des Fullscreen-Status
    useEffect(() => {
        const handleFullscreenChange = () => {
            const isFullscreenActive =
                document.fullscreenElement === containerRef.current;
            setIsFullscreen(isFullscreenActive); // Aktualisiert den Zustand
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={` z-30 relative w-full max-w-3xl mx-auto ${isFullscreen ? "fullscreen-mode" : ""
                }`}
        >
            {/* Video-Element mit Klick-Event */}
            <video
                ref={videoRef}
                className="w-full"
                src={videoSrc}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                controls={false} // Native Steuerung ausblenden
                onClick={togglePlay} // Klick auf das Video pausiert/played
            />
            {/* Benutzerdefinierte Steuerungen */}
            <div
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full flex justify-between items-center px-4 text-white"
                style={{
                    zIndex: isFullscreen ? 1000 : 10, // Steuere den Z-Index für Fullscreen
                }}
            >
                <div className="flex gap-2">
                    {/* Play/Pause Button */}
                    <button onClick={togglePlay} className="bg-blue-500 px-2 py-1 rounded-lg text-xs">
                        {isPlaying ? "Pause" : "Play"}
                    </button>

                    {/* Zurückspulen Button */}
                    <button onClick={rewind} className="bg-blue-500 px-2 py-1 rounded-lg text-xs">
                        {"<< 5s"}
                    </button>

                    {/* Vorspulen Button */}
                    <button onClick={fastForward} className="bg-blue-500 px-2 py-1 rounded-lg text-xs">
                        {"5s >>"}
                    </button>
                </div>
                {/* Fortschrittsanzeige */}
                <div className="flex items-center">
                    <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                </div>

                {/* Fullscreen Button */}
                <button onClick={toggleFullscreen} className="bg-blue-500 px-2 py-1 rounded-lg text-xs">
                    {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                </button>
            </div>
        </div>
    );
};

// Funktion zur Zeitformatierung (z. B. "2:30")
const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default VideoPlayer;
