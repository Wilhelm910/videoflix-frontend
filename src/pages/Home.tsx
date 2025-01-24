import AutoPlayVideo from "../components/AutoPlayVideo";
import { useEffect, useState } from "react";
import Videoplayer from "../components/Videoplayer";
import VideoCarousel from "../components/VideoCarousel";
import { BASE_URL } from "../static/api";
import { MovieData } from "../types/types";



export default function Home() {
    const [playVideo, setPlayVideo] = useState(false)
    const [movieData, setMovieData] = useState<MovieData[] | null>(null);
    const [openedVideo, setOpenedVideo] = useState<MovieData | null>(null);
    const [randomMovie, setRandomMovie] = useState<MovieData | null>(null);

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


    useEffect(() => {
        const getAllMovies = async () => {
            try {
                const response = await fetch(`${BASE_URL}/videos/`, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        "Cache-Control": "no-cache",
                    },
                });
                const data = await response.json();
                setMovieData(data);
                setRandomMovie(data[Math.floor(Math.random() * data.length)])
            } catch (error) {
                console.error(error);
            }
        }
        getAllMovies()
    }, [])


    const movieGroups = () => {
        let allGroups: string[] = [];
        movieData?.forEach(movie => {
            allGroups = allGroups.concat(movie.group);
            if (movie.favourite) {
                allGroups.unshift("Favourite")
            }
        });

        // Entferne Duplikate
        return Array.from(new Set(allGroups));

    }
    const uniqueGroups = movieGroups()

    const handleFavouriteChange = (movieId: number) => {
        if (movieData) {
            setMovieData((prev) =>
                (prev || []).map((movie) =>
                    movie.id === movieId
                        ? { ...movie, favourite: !movie.favourite }
                        : movie
                )
            );
        }
    };

    const handleOpenVideoPlayer = async (movieId: number) => {
        console.log(movieId)
        try {
            const response = await fetch(`${BASE_URL}/video/${movieId}/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (!response.ok) {
                console.log("error")
            }
            const data = await response.json()
            console.log(data)
            setOpenedVideo(data)
            setPlayVideo(true)
        } catch (error) {
            console.log(error)
        }
        // if (movieData) {
        //     movieData.map((movie) => {
        //         console.log("test")
        //         console.log(movie.id)
        //         console.log(movieId)
        //         movie.id === movieId ? setOpenedVideo(movie) : setOpenedVideo(null)
        //     })
        // }
    }

    useEffect(() => {
        if (playVideo) {
            // Verhindert das Scrollen
            document.body.style.overflow = "hidden";
        } else {
            // Erlaubt das Scrollen wieder
            document.body.style.overflow = "auto";
        }

        // Cleanup: Setzt den Overflow zurück, wenn das Video geschlossen wird
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [playVideo]);

    // console.log(movieData)
    // useEffect(() => {
    //     if (movieData) {
    //         randomMovie = movieData[Math.floor(Math.random() * movieData.length)];
    //     }
    // }, [movieData])


    return (
        <>
            <div>
                <AutoPlayVideo handleOpenVideoPlayer={handleOpenVideoPlayer} setPlayVideo={setPlayVideo} randomMovie={randomMovie} />
                {uniqueGroups?.map((group) => {
                    const filteredMovies = movieData?.filter((movie) => {
                        if (group === "Favourite") {
                            return movie.favourite
                        } else {
                            return movie.group === group && !movie.favourite
                        }
                    })
                    return (
                        <div key={group}>
                            <h1 className="font-bold text-2xl text-white mb-3 mt-10 ml-5">{group.slice(0, 1).toUpperCase() + group.slice(1)}</h1>
                            <VideoCarousel movies={filteredMovies || []} handleFavouriteChange={handleFavouriteChange} handleOpenVideoPlayer={handleOpenVideoPlayer} />
                        </div>
                    )
                })}
            </div>
            {playVideo && openedVideo && (
                <div
                    onClick={() => setPlayVideo(false)}
                    className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center z-20 bg-black bg-opacity-50"
                >
                    <div
                        onClick={(e) => e.stopPropagation()} // Verhindert, dass der Overlay-Klick ausgelöst wird
                        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl"
                    >
                        <Videoplayer movie={openedVideo} />
                    </div>
                </div>
            )}

        </>
    );
}
