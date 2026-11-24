// Titel, Beschreibung und Sichtbarkeit für Suchmaschinen pro Seite.
// Wird von der App (Tab-Titel) und vom Build (eigene HTML-Datei pro Seite, sitemap.xml) gelesen.
//
// index: true  → Google darf die Seite finden, sie kommt in die sitemap.xml
// index: false → die Seite funktioniert normal, wird aber nicht indexiert (noindex)

export const SITE_URL = "https://www.vera-mueller.ch";
export const SITE_NAME = "Vera Müller";

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  index: boolean;
}

export const pages: PageMeta[] = [
  {
    path: "/projects",
    title: "Vera Müller – Motion Design, Code, Animation, Game Design",
    description:
      "Portfolio of Vera Müller: playful, interactive installations, games and animations from Switzerland.",
    index: true,
  },
  {
    path: "/about",
    title: "About – Vera Müller",
    description:
      "Hey, I’m Vera and I like to create playful, interactive things. Motion design, code, animation and game design, based in Wädenswil, Switzerland.",
    index: true,
  },
  {
    path: "/wobbly",
    title: "Wobbly – Interactive Installation – Vera Müller",
    description:
      "Wobbly is an interactive projection for the Light Festival Lucerne: players wave their arms and four inflatable tube dudes – and the whole city – start to dance.",
    index: true,
  },
  {
    path: "/jetpack-marshmallow",
    title: "Jetpack Marshmallow – Game – Vera Müller",
    description:
      "Jetpack Marshmallow is a short one-button game made with Godot. Boost your jetpack and roast your fellow mallows on your way to freedom.",
    index: true,
  },
  {
    path: "/hungry-frog",
    title: "Hungry Frog – Mini Game – Vera Müller",
    description:
      "Hungry Frog is a small clicker game made with p5.js: eat 10 flies – with every click they get trickier to catch.",
    index: true,
  },

  // Versteckt / unfertig: funktionieren, werden aber nicht indexiert
  { path: "/playground", title: "Playground – Vera Müller", description: "", index: false },
  { path: "/project-template", title: "Project – Vera Müller", description: "", index: false },
  { path: "/klick", title: "Klick – Vera Müller", description: "", index: false },
  { path: "/klick-popup", title: "Klick – Vera Müller", description: "", index: false },
  { path: "/stopwatch", title: "Stopwatch – Vera Müller", description: "", index: false },
  { path: "/cards", title: "Lernkarten", description: "", index: false },
  { path: "/cards/:topic", title: "Lernkarten", description: "", index: false },
];

export const findPage = (path: string) => pages.find((p) => p.path === path);
