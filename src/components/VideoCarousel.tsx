import { useEffect, useState } from "react";
import { MovieData } from "../types/types"
import BackwardsButton from "./BackwardsButton";
import ForwardButton from "./ForwardButton";
import Movie from "./Movie";

type VideoCarouselProps = {
    movies: MovieData[]; // Ein Array von MovieData
    handleFavouriteChange: (movieId: number) => void
    handleOpenVideoPlayer: (movieId: number) => void
}


export default function VideoCarousel({ movies, handleFavouriteChange, handleOpenVideoPlayer }: VideoCarouselProps) {
    const [startIndex, setStartIndex] = useState<number>(0);
    const [width, setWidth] = useState(0)

    // Berechnet die Anzahl der sichtbaren Elemente basierend auf der aktuellen Fensterbreite
    const getVisibleCount = () => {
        if (window.innerWidth >= 1380) return 4;
        if (window.innerWidth >= 1130) return 3;
        if (window.innerWidth >= 800) return 2;
        return 1;
    };

    const handleWindowResize = () => {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        // component is mounted and window is available
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        // unsubscribe from the event on component unmount
        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);

    const visibleCount = getVisibleCount();

    const handleForwardClick = () => {
        setStartIndex(prev =>
            prev + 1
        )
    }

    const handleBackwardsClick = () => {
        setStartIndex(prev =>
            prev - 1
        )
    }



    return (
        <>
            <div className="flex gap-4">
                {0 < startIndex && <BackwardsButton onClick={handleBackwardsClick} />}
                <div>
                    <div className="flex gap-4">
                        {movies.slice(startIndex, startIndex + visibleCount).map((movie, index: number) => (
                            <Movie handleOpenVideoPlayer={handleOpenVideoPlayer} handleFavouriteChange={handleFavouriteChange} key={index} movie={movie} />
                        ))}

                    </div>
                </div>
                {movies.length > visibleCount && <ForwardButton onClick={handleForwardClick} />}
            </div>

        </>
    )
}
