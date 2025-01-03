import AutoPlayVideo from "../components/AutoPlayVideo";
import { useEffect, useState } from "react";
import Videoplayer from "../components/Videoplayer";
import VideoCarousel from "../components/VideoCarousel";
import getVideosService from "../services/getVideosService";


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


    const { movieData, categories } = getVideosService()
    console.log(movieData)
    console.log(categories)


    return (
        <>
            <div>
                <AutoPlayVideo setPlayVideo={setPlayVideo} />
                {categories.map((category) => {
                    const filteredMovies = movieData?.filter((movie) => movie.category === category);
                    return (
                        <div key={category}>
                            <h1 className="font-bold text-2xl text-white mb-3 mt-10">{category}</h1>
                            <VideoCarousel movies={filteredMovies || []} />
                        </div>
                    )
                })}
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
