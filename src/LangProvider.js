import React, { useState } from "react";
export const LangContext = React.createContext();

export const LangProvider = (props) => {
  const [lang, setLang] = useState(
    navigator.languages[0].includes("fr") ? true : false
  );
  const [frenchWeather, setFrenchWeather] = useState("");
  const [englishWeather, setEnglishWeather] = useState("");

  const convert = function (weather) {
    setEnglishWeather(weather);
    switch (weather) {
      case "Clear":
        setFrenchWeather("Ensoleillé");
        break;
      case "Clouds":
        setFrenchWeather("Nuageux");
        break;
      case "Rain":
        setFrenchWeather("Pluvieux");
        break;
      case "Snow":
        setFrenchWeather("Neigeux");
        break;
      case "Thunderstorm":
        setFrenchWeather("Orageux");
        break;
      case "Drizzle":
        setFrenchWeather("Bruineux");
        break;
      case "Mist":
        setFrenchWeather("Brumeux");
        break;
      case "Smoke":
        setFrenchWeather("Enfumé");
        break;
      case "Haze":
        setFrenchWeather("Brume");
        break;
      case "Dust":
        setFrenchWeather("Poussiéreux");
        break;
      case "Fog":
        setFrenchWeather("Brouillard");
        break;
      case "Sand":
        setFrenchWeather("Sableux");
        break;
      case "Ash":
        setFrenchWeather("Cendres");
        break;
      case "Squall":
        setFrenchWeather("Bourrasque");
        break;
      case "Tornado":
        setFrenchWeather("Tornade");
        break;
      default: {
        return;
      }
    }
  };

  const langEn = {
    languageWiki: "en",
    searchWiki: "Search",
    placeholderWiki: "Enter your search term",
    randomWiki: "Random Article",
    clear: "Clear",
    resultsWiki: "Search results",
    noResultsWiki: "No results found",
    moreWiki: "More about",
    buttonNav: "FR 🇫🇷",
    homeNav: "Home",
    searchNav: "Search Books",
    moreNav: "More than Books",
    weather: englishWeather,
    buttonAdd: "Add a book",
    authorAdd: "Author",
    addAdd: "Add to library :",
    deleteAdd: "Delete all books",
    askAdd: "Are you sure ?",
    quoteAdd:
      "We don't lose any existence other than the one we live, and we only live the one we lose.",
    search: "Search for a Book",
    placeholder: "What to search for ?",
    author: "Author(s)",
    title: "Title",
    more: "More info",
    save: "Save this book",
    sure: "Of course !",
    cancel: "Hell No !",
    alert: "A book with the same name is in your library. Add anyway ?",
    success: "Book added to your library !",
    nodesc: "No description available",
    quoteSearch:
      "Anger and grief hurt us far more than the very things we complain about, and which cause them to arise.",
    pseudo: "Choose a name",
    pseudoChange: "Change your name ?",
  };

  const langFr = {
    languageWiki: "fr",
    searchWiki: "Recherche",
    placeholderWiki: "Entrez votre recherche",
    randomWiki: "Article aléatoire",
    clear: "Effacer",
    resultsWiki: "Votre recherche",
    noResultsWiki: "Aucun résultat",
    moreWiki: "Plus d'informations sur",
    buttonNav: "EN 🇺🇸",
    homeNav: "Accueil",
    searchNav: "Recherche",
    moreNav: "Plus de Culture",
    weather: frenchWeather,
    buttonAdd: "Ajouter un livre",
    authorAdd: "Auteur",
    addAdd: "Ajouter à la biblio :",
    deleteAdd: "Supprimer tous les livres",
    askAdd: "Êtes-vous sûr ?",
    quoteAdd:
      "Nous ne perdons aucune existence autre que celle que nous vivons, et nous ne vivons que celle que nous perdons.",
    search: "Rechercher un livre",
    placeholder: "Que rechercher ?",
    author: "Auteur(s)",
    title: "Titre",
    more: "Plus d'infos",
    save: "Enregistrer ce livre",
    sure: "Bien sûr !",
    cancel: "Ah Non !",
    alert:
      "Un livre avec le même nom est dans votre bibliothèque. Ajouter quand même ?",
    success: "Livre ajouté à votre bibliothèque !",
    nodesc: "Description indisponible",
    quoteSearch:
      "La colère et le chagrin nous blessent beaucoup plus que les choses mêmes dont nous nous plaignons et qui les font surgir.",
    pseudo: "Choisissez un pseudo",
    pseudoChange: "Changer votre pseudo ?",
  };

  return (
    <LangContext.Provider
      value={{
        langState: [lang, setLang],
        converter: convert,
        french: langFr,
        english: langEn,
      }}
    >
      {props.children}
    </LangContext.Provider>
  );
};
