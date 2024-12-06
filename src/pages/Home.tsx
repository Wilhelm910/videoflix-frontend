import AutoPlayVideo from "../components/AutoPlayVideo";
import imgSrc from '../assets/Kuchen.mp4';
import { useEffect, useState } from "react";
import Videoplayer from "../components/VideoPlayer";
import VideoCarousel from "../components/VideoCarousel";


export default function Home() {

    const [playVideo, setPlayVideo] = useState(false)

    console.log(playVideo)

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setPlayVideo(false);  // Close video when Escape is pressed
            }
        };

        // Adding the event listener when the component mounts
        window.addEventListener("keydown", handleEscape);

        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, []);  // Empty dependency array ensures this runs once when the component mounts

    return (
        <>
            <div>
                <AutoPlayVideo setPlayVideo={setPlayVideo} />
                <div className="flex flex-col gap-10">
                    <VideoCarousel />
                </div>

            </div>
            {playVideo && (
                <div onClick={() => setPlayVideo(false)} className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center z-20">
                    <div
                        onClick={(e) => e.stopPropagation()} // Verhindert, dass der Overlay-Klick ausgelöst wird
                        className="relative"
                    >
                        <Videoplayer />
                    </div>
                </div>
            )}

        </>

    );


}
