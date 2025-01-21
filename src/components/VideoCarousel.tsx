// // import { useEffect, useState } from "react";
// // import { MovieData } from "../types/types"
// // import BackwardsButton from "./BackwardsButton";
// // import ForwardButton from "./ForwardButton";
// // import Movie from "./Movie";

// // type VideoCarouselProps = {
// //     movies: MovieData[]; // Ein Array von MovieData
// //     handleFavouriteChange: (movieId: number) => void
// //     handleOpenVideoPlayer: (movieId: number) => void
// // }


// // export default function VideoCarousel({ movies, handleFavouriteChange, handleOpenVideoPlayer }: VideoCarouselProps) {
// //     const [startIndex, setStartIndex] = useState<number>(0);
// //     const [width, setWidth] = useState(0)
// //     const [touchStartX, setTouchStartX] = useState<number | null>(null);

// //     // Berechnet die Anzahl der sichtbaren Elemente basierend auf der aktuellen Fensterbreite
// //     const getVisibleCount = () => {
// //         if (window.innerWidth >= 1600) return 4;
// //         if (window.innerWidth >= 1310) return 3;
// //         if (window.innerWidth >= 890) return 2;
// //         return 1;
// //     };

// //     const handleWindowResize = () => {
// //         setWidth(window.innerWidth);
// //     }

// //     useEffect(() => {
// //         // component is mounted and window is available
// //         handleWindowResize();
// //         window.addEventListener('resize', handleWindowResize);
// //         // unsubscribe from the event on component unmount
// //         return () => window.removeEventListener('resize', handleWindowResize);
// //     }, []);

// //     const visibleCount = getVisibleCount();

// //     const handleForwardClick = () => {
// //         setStartIndex(prev =>
// //             prev + 1
// //         )
// //     }

// //     const handleBackwardsClick = () => {
// //         setStartIndex(prev =>
// //             prev - 1
// //         )
// //     }

// //     const handleTouchStart = (e: React.TouchEvent) => {
// //         setTouchStartX(e.touches[0].clientX);
// //     };

// //     const handleTouchMove = (e: React.TouchEvent) => {
// //         if (touchStartX === null) return;
// //         const currentX = e.touches[0].clientX;
// //         const diffX = touchStartX - currentX;

// //         if (diffX > 50) {
// //             handleForwardClick();
// //             setTouchStartX(null);
// //         } else if (diffX < -50) {
// //             handleBackwardsClick();
// //             setTouchStartX(null);
// //         }
// //     };

// //     const handleTouchEnd = () => {
// //         setTouchStartX(null);
// //     };

// //     return (
// //         <>
// //             <div className="flex items-center gap-4 relative" onTouchStart={handleTouchStart}
// //                 onTouchMove={handleTouchMove}
// //                 onTouchEnd={handleTouchEnd}>
// //                 {window.innerWidth > 500 && 0 < startIndex && <BackwardsButton onClick={handleBackwardsClick} />}
// //                 <div>
// //                     <div className="flex gap-4">
// //                         {movies.slice(startIndex, startIndex + visibleCount).map((movie, index: number) => (
// //                             <Movie handleOpenVideoPlayer={handleOpenVideoPlayer} handleFavouriteChange={handleFavouriteChange} key={index} movie={movie} />
// //                         ))}

// //                     </div>
// //                 </div>
// //                 {window.innerWidth > 500 && movies.length > visibleCount && movies.length != startIndex + 1 && <ForwardButton onClick={handleForwardClick} />}
// //             </div>

// //         </>
// //     )

// // }
// import { useEffect, useState } from "react";
// import { MovieData } from "../types/types";
// import BackwardsButton from "./BackwardsButton";
// import ForwardButton from "./ForwardButton";
// import Movie from "./Movie";

// type VideoCarouselProps = {
//     movies: MovieData[];
//     handleFavouriteChange: (movieId: number) => void;
//     handleOpenVideoPlayer: (movieId: number) => void;
// };

// export default function VideoCarousel({ movies, handleFavouriteChange, handleOpenVideoPlayer }: VideoCarouselProps) {
//     const [startIndex, setStartIndex] = useState<number>(0);
//     const [width, setWidth] = useState(0);
//     const [touchStartX, setTouchStartX] = useState<number | null>(null);

//     const getVisibleCount = () => {
//         if (width >= 1600) return 4;
//         if (width >= 1310) return 3;
//         if (width >= 890) return 2;
//         return 1;
//     };

//     const handleWindowResize = () => {
//         setWidth(window.innerWidth);
//     };

//     useEffect(() => {
//         handleWindowResize();
//         window.addEventListener("resize", handleWindowResize);
//         return () => window.removeEventListener("resize", handleWindowResize);
//     }, []);

//     const visibleCount = getVisibleCount();

//     const handleForwardClick = () => {
//         setStartIndex((prev) => (prev + 1) % movies.length);
//     };

//     const handleBackwardsClick = () => {
//         setStartIndex((prev) => (prev - 1 + movies.length) % movies.length);
//     };

//     const handleTouchStart = (e: React.TouchEvent) => {
//         setTouchStartX(e.touches[0].clientX);
//     };

//     const handleTouchMove = (e: React.TouchEvent) => {
//         if (touchStartX === null) return;
//         const currentX = e.touches[0].clientX;
//         const diffX = touchStartX - currentX;

//         if (diffX > 50) {
//             handleForwardClick();
//             setTouchStartX(null);
//         } else if (diffX < -50) {
//             handleBackwardsClick();
//             setTouchStartX(null);
//         }
//     };

//     const handleTouchEnd = () => {
//         setTouchStartX(null);
//     };

//     console.log(startIndex)

//     return (
//         <div
//             className="flex items-center gap-4 relative"
//             onTouchStart={width <= 500 ? handleTouchStart : undefined}
//             onTouchMove={width <= 500 ? handleTouchMove : undefined}
//             onTouchEnd={width <= 500 ? handleTouchEnd : undefined}
//         >
//             {width > 500 && 0 < startIndex && (
//                 <BackwardsButton onClick={handleBackwardsClick} />
//             )}
//             <div>
//                 <div className="flex gap-4">
//                     {movies.slice(startIndex, startIndex + visibleCount).map((movie, index) => (
//                         <Movie
//                             key={index}
//                             handleOpenVideoPlayer={handleOpenVideoPlayer}
//                             handleFavouriteChange={handleFavouriteChange}
//                             movie={movie}
//                         />
//                     ))}
//                 </div>
//             </div>
//             {width > 500 && movies.length > visibleCount && (
//                 <ForwardButton onClick={handleForwardClick} />
//             )}
//         </div>
//     );
// }

import { useEffect, useState } from "react";
import { MovieData } from "../types/types";
import BackwardsButton from "./BackwardsButton";
import ForwardButton from "./ForwardButton";
import Movie from "./Movie";

type VideoCarouselProps = {
    movies: MovieData[];
    handleFavouriteChange: (movieId: number) => void;
    handleOpenVideoPlayer: (movieId: number) => void;
};

export default function VideoCarousel({ movies, handleFavouriteChange, handleOpenVideoPlayer }: VideoCarouselProps) {
    const [startIndex, setStartIndex] = useState<number>(0);
    const [width, setWidth] = useState(0);
    const [touchStartX, setTouchStartX] = useState<number | null>(null);

    const getVisibleCount = () => {
        if (width >= 1600) return 4;
        if (width >= 1310) return 3;
        if (width >= 890) return 2;
        return 1;
    };

    const handleWindowResize = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        handleWindowResize();
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    const visibleCount = getVisibleCount();

    const handleForwardClick = () => {
        setStartIndex((prev) => (prev + 1) % movies.length);
    };

    const handleBackwardsClick = () => {
        setStartIndex((prev) => (prev - 1 + movies.length) % movies.length);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (touchStartX === null) return;
        const currentX = e.touches[0].clientX;
        const diffX = touchStartX - currentX;

        if (diffX > 50) {
            handleForwardClick();
            setTouchStartX(null);
        } else if (diffX < -50) {
            handleBackwardsClick();
            setTouchStartX(null);
        }
    };

    const handleTouchEnd = () => {
        setTouchStartX(null);
    };

    const getMoviesToDisplay = () => {
        if (movies.length <= visibleCount) {
            return movies;  // Keine Wiederholung, wenn weniger oder gleich viele Filme wie sichtbare Slots
        }

        const endIndex = startIndex + visibleCount;
        if (endIndex <= movies.length) {
            return movies.slice(startIndex, endIndex);
        }
        return [
            ...movies.slice(startIndex, movies.length),
            ...movies.slice(0, endIndex - movies.length),
        ];
    };

    return (
        <div
            className="flex items-center gap-4 relative"
            onTouchStart={width <= 500 ? handleTouchStart : undefined}
            onTouchMove={width <= 500 ? handleTouchMove : undefined}
            onTouchEnd={width <= 500 ? handleTouchEnd : undefined}
        >
            {width > 500 && movies.length > visibleCount && <BackwardsButton onClick={handleBackwardsClick} />}
            <div>
                <div className="flex gap-4">
                    {getMoviesToDisplay().map((movie, index) => (
                        <Movie
                            key={index}
                            handleOpenVideoPlayer={handleOpenVideoPlayer}
                            handleFavouriteChange={handleFavouriteChange}
                            movie={movie}
                        />
                    ))}
                </div>
            </div>
            {width > 500 && movies.length > visibleCount && <ForwardButton onClick={handleForwardClick} />}
        </div>
    );
}
