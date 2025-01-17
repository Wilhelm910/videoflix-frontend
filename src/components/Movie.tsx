import { useEffect, useState } from "react";
import { BASE_URL } from "../static/api";

type MovieProps = {
    movie: {
        id: number;
        title: string;
        description: string;
        thumbnail: string;
        favourite: boolean;
    };
    handleFavouriteChange: (movieId: number) => void
    handleOpenVideoPlayer: (movieId: number) => void
};

export default function Movie({ movie, handleFavouriteChange, handleOpenVideoPlayer }: MovieProps) {
    const [favourite, setFavourite] = useState(movie?.favourite);

    const handleFavourite = async (favourite: boolean, movieId: number) => {
        try {
            const response = await fetch(`${BASE_URL}/video/${movieId}/update-favourite/`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    "Cache-Control": "no-cache",
                    "Authorization": `Token ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify({ favourite })
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            } else {
                setFavourite(favourite);
                handleFavouriteChange(movieId)
            }
        } catch (error) {
            console.error('Error updating favourite:', error);
        }
    };

    useEffect(() => {

    }, [favourite])

    return (
        <div key={movie.id} className="inline-block transform transition-transform duration-300 hover:scale-110 cursor-pointer">
            <div
                onClick={() => handleOpenVideoPlayer(movie.id)}
                className="w-80 h-52 text-white flex-shrink-0 bg-cover bg-center flex flex-col"
                style={{ backgroundImage: `url(${import.meta.env.VITE_BACKEND_URL}${movie.thumbnail})` }}
            >
                <p className="p-2">{movie.title}</p>
                <p>
                    {movie.description.length > 80
                        ? movie.description.substring(0, 80) + "..."
                        : movie.description}
                </p>
            </div>
            <div className="flex">
                {!favourite ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-8 h-8 text-blue-500 transform transition-transform duration-300 hover:scale-110 cursor-pointer"
                        onClick={() => handleFavourite(true, movie.id)}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-8 h-8 text-blue-500 transform transition-transform duration-300 hover:scale-110 cursor-pointer"
                        onClick={() => handleFavourite(false, movie.id)}
                    >
                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                )}
            </div>
        </div>
    );
}
