import { useState, useEffect } from 'react';
import { BASE_URL } from '../static/api';

type UseVideoServiceProps = {
    movieId: number;
};

export default function useVideoService({ movieId }: UseVideoServiceProps) {
    const [movie, setMovie] = useState<any>(null);

    useEffect(() => {
        const getMovieData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/video/${movieId}/`, {
                    method: 'GET',  // Ändere "POST" auf "GET" falls es eine Abfrage ist
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
                    console.log(data);
                    setMovie(data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (movieId) {
            getMovieData();
        }
    }, [movieId]); // Nur ausführen, wenn sich die movieId ändert

    return movie;
}
