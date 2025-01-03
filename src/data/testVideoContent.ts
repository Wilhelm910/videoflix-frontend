import { MovieData } from "../types/types";

export const movieData: MovieData[] = [
  {
    title: "Die Schattenjäger",
    description:
      "Eine Gruppe von Jugendlichen kämpft gegen dunkle Kreaturen in einer modernen Welt.",
    category: "Fantasy",
    searchPhrase: ["Fantasy", "Dunkle Kreaturen", "Schattenjäger", "Abenteuer"],
  },
  {
    title: "Liebe auf den zweiten Blick",
    description:
      "Eine romantische Komödie über Zufälle, Schicksal und die Suche nach der wahren Liebe.",
    category: "Romantik",
    searchPhrase: ["Romantik", "Komödie", "Liebe", "Zufall", "Schicksal"],
  },
  {
    title: "Der letzte Überlebende",
    description:
      "Ein Mann kämpft ums Überleben in einer postapokalyptischen Welt.",
    category: "Action",
    searchPhrase: ["Action", "Überleben", "Apokalypse", "Endzeit", "Spannung"],
  },
  {
    title: "Das Geheimnis des Waldes",
    description:
      "Ein mysteriöses Abenteuer, bei dem ein Dorf von unheimlichen Vorfällen heimgesucht wird.",
    category: "Mystery",
    searchPhrase: ["Mystery", "Geheimnis", "Wald", "Dorf", "Unheimlich"],
  },
  {
    title: "Cybernetz",
    description:
      "Ein futuristischer Thriller über Hacker, künstliche Intelligenz und digitale Rebellion.",
    category: "Sci-Fi",
    searchPhrase: [
      "Sci-Fi",
      "Thriller",
      "Hacker",
      "KI",
      "Technologie",
      "Zukunft",
    ],
  },
  {
    title: "Im Dunkel der Nacht",
    description:
      "Ein packender Krimi über einen Detektiv, der in einem Netz aus Lügen gefangen ist.",
    category: "Krimi",
    searchPhrase: ["Krimi", "Detektiv", "Mord", "Ermittlungen", "Nacht"],
  },
  {
    title: "Die Clown-Attacke",
    description:
      "Ein Horrorfilm über eine Stadt, die von unheimlichen Clowns terrorisiert wird.",
    category: "Horror",
    searchPhrase: ["Horror", "Clowns", "Angst", "Terror", "Albtraum"],
  },
  {
    title: "Der geheime Kochclub",
    description:
      "Eine Gruppe von Jugendlichen entdeckt ihre Leidenschaft fürs Kochen und startet ein geheimes Dinner-Projekt.",
    category: "Drama",
    searchPhrase: ["Drama", "Kochen", "Freundschaft", "Geheimnis", "Jugend"],
  },
  {
    title: "Der magische Spiegel",
    description:
      "Ein Kinderfilm über ein magisches Abenteuer durch einen Spiegel in eine andere Welt.",
    category: "Familie",
    searchPhrase: ["Familie", "Magie", "Spiegel", "Abenteuer", "Kinder"],
  },
  {
    title: "Die Stimme der Gerechtigkeit",
    description:
      "Ein Gerichtsthriller über einen Anwalt, der für Gerechtigkeit kämpft.",
    category: "Thriller",
    searchPhrase: ["Thriller", "Gericht", "Anwalt", "Gerechtigkeit", "Prozess"],
  },
  {
    title: "Der letzte Überlebende",
    description:
      "Ein Mann kämpft ums Überleben in einer postapokalyptischen Welt.",
    category: "Action",
    searchPhrase: ["Action", "Überleben", "Apokalypse", "Endzeit", "Spannung"],
  },
  {
    title: "High-Speed Jagd",
    description:
      "Ein ehemaliger Rennfahrer muss sich in einem gefährlichen Katz-und-Maus-Spiel beweisen.",
    category: "Action",
    searchPhrase: ["Action", "Rennen", "Verfolgungsjagd", "Adrenalin", "Krimi"],
  },
  {
    title: "Geheime Mission",
    description:
      "Ein Elite-Agent versucht, eine globale Bedrohung zu verhindern.",
    category: "Action",
    searchPhrase: ["Action", "Agent", "Spionage", "Mission", "Thriller"],
  },
  {
    title: "Liebe auf den zweiten Blick",
    description:
      "Eine romantische Komödie über Zufälle, Schicksal und die Suche nach der wahren Liebe.",
    category: "Romantik",
    searchPhrase: ["Romantik", "Komödie", "Liebe", "Zufall", "Schicksal"],
  },
  {
    title: "Herzklopfen in Paris",
    description:
      "Zwei Fremde treffen sich in Paris und erleben eine unvergessliche Liebesgeschichte.",
    category: "Romantik",
    searchPhrase: ["Romantik", "Liebe", "Paris", "Schicksal", "Reise"],
  },
];

// Simulierte Fetch-Funktion
export const fetchMovieData = async (): Promise<MovieData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(movieData); // Gibt die Daten nach einer Verzögerung zurück
    }, 1000); // 1 Sekunde Verzögerung, um den API-Aufruf zu simulieren
  });
};
