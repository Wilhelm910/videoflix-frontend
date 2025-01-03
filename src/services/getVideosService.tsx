import { useEffect, useState } from "react";
import { fetchMovieData } from "../data/testVideoContent"; // Importiere die Fetch-Funktion
import { MovieData } from "../types/types";

export default function getVideosService() {
    const [movieData, setMovieData] = useState<MovieData[] | null>(null);
    const [categories, setCategories] = useState<string[]>([]);

    const getMovieData = async (): Promise<void> => {
        try {
            const data: MovieData[] = await fetchMovieData(); // Holen der Daten
            setMovieData(data); // Setze die erhaltenen Daten in den Zustand
        } catch (error) {
            console.error("Fehler beim Abrufen der Film-Daten:", error);
        }
    };

    useEffect(() => {
        getMovieData()
    }, [])

    // Effekt, der läuft, sobald movieData sich ändert, um die Kategorien zu setzen
    useEffect(() => {
        if (movieData) {
            const allCategories = movieData.map((movie) => movie.category);
            const uniqueCategories = Array.from(new Set(allCategories)); // Duplikate entfernen
            setCategories(uniqueCategories); // Alle einzigartigen Kategorien setzen
        }
    }, [movieData]); // Dieser Effekt wird nur ausgeführt, wenn sich movieData ändert

    return { movieData, categories };
}
