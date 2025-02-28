import { useEffect, useState } from 'react';
import CustomButton from '../components/CustomButton';
import { buttonAndLinkStyle } from '../styles/buttonAndLink.style';
import { MovieData } from '../types/types';
import { BASE_URL } from '../static/api';

type AutoPlayVideoProps = {
    randomMovie: MovieData
    handleOpenVideoPlayer: (movieId: number) => void;
}

export default function AutoPlayVideo({ randomMovie, handleOpenVideoPlayer }: AutoPlayVideoProps) {
    const [randomMovieData, setRandomMovieData] = useState<MovieData | null>(null);

    useEffect(() => {
        const loadRandomMovie = async () => {
            try {
                const response = await fetch(`${BASE_URL}/video/${randomMovie.id}/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                if (!response.ok) {
                    console.log("error")
                }
                const data = await response.json()
                setRandomMovieData(data)
            } catch (error) {
                console.log(error)
            }
        }
        loadRandomMovie()
    }, [randomMovie])

    if (!randomMovieData) {
        return (
            <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
                <svg className="w-16 h-16 animate-spin to-blue-500" viewBox="0 0 64 64" fill="none"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                    <path
                        d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                        stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path
                        d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                        stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                    </path>
                </svg>
            </div>
        )
    }

    return (
        <div className='flex justify-center flex-col mb-10'>
            {/* Video-Hintergrund */}
            <video
                className="w-full sm:w-[800px] object-cover shadow-xl rounded-lg self-center max-h-96"
                src={`${import.meta.env.VITE_BACKEND_URL}/${randomMovieData.video_file}`}
                autoPlay
                muted
                onTimeUpdate={(e) => {
                    if (e.currentTarget.currentTime >= 5) {
                        e.currentTarget.currentTime = 0;
                        e.currentTarget.play();
                    }
                }}
                playsInline
                style={{
                    maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 90%)',
                    WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%)'
                }}
            ></video>
            {/* Overlay: Titel und Beschreibung */}
            <div className="text-white p-4 w-1/2 flex flex-col gap-3">
                <h1 className="text-lg sm:text-4xl font-bold">{randomMovieData.title}</h1>
                <p className="text-xs sm:text-base mt-2">
                    {randomMovieData.description}
                </p>
                <div>
                    <CustomButton buttonClick={() => handleOpenVideoPlayer(randomMovieData.id)} content="Play" layout={buttonAndLinkStyle} />
                </div>
            </div>
        </div>
    )
}
