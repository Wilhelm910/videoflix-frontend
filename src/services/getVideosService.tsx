import { useEffect, useState } from "react";
import { MovieData } from "../types/types";
import { BASE_URL } from "../static/api";

type VideoServiceProps = {
    movieId?: number;
};

export default function getVideosService({ movieId }: VideoServiceProps) {
    const [movieData, setMovieData] = useState<MovieData[] | null>(null);
    console.log("movieId outside of useEffect", movieId)



    const getMovieData = async () => {
        console.log("INSIDE FUNC", movieId)
        if (movieId) {
            console.log("test")
            try {
                const response = await fetch(`${BASE_URL}/video/${movieId}/`, {
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
                    setMovieData(prevData => prevData ? prevData.map(movie =>
                        movie.id === movieId ? { ...movie, ...data } : movie
                    ) : [data]);
                }
            } catch (error) {
                console.error(error);
            }
        } else {
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
            } catch (error) {
                console.error(error);
            }
        }
    };

    // if (movieId) {
    //     getMovieData()
    // }

    // useEffect(() => {
    //     getMovieData();
    // }, [movieId]);

    useEffect(() => {
        console.log("movieId INtside of useEffect", movieId)
        getMovieData();
    }, [movieId]);

    return { movieData };
}
