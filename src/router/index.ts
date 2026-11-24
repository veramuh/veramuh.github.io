import { createRouter, createWebHistory } from "vue-router";

import Projects from "../views/Projects.vue";
import Playground from "../views/Playground.vue";
import About from "../views/About.vue";
import ProjectTemplate from "../views/projects/ProjectTemplate.vue";
import HungryFrog from "../views/projects/HungryFrog.vue";
import JetpackMarshmallow from "../views/projects/JetpackMarshmallow.vue";
import Wobbly from "../views/projects/Wobbly.vue";
import Klick from "../views/projects/Klick.vue";
import KlickPopup from "../views/projects/KlickPopup.vue";
import Stopwatch from "../views/projects/Stopwatch.vue";
import CardTopics from "../views/cards/CardTopics.vue";
import Flashcards from "../views/cards/Flashcards.vue";
import { findPage, SITE_NAME, SITE_URL } from "./pages";

const routes = [
  // Fallback:
  { path: "/:pathMatch(.*)*", redirect: "/" },
  // Redirect Startpage:
  { path: "/", redirect: "/projects" },

  // Nav
  { path: "/projects", name: "Projects", component: Projects },
  { path: "/playground", name: "Playground", component: Playground },
  { path: "/about", name: "About", component: About },

  // Project Pages
  {
    path: "/project-template",
    name: "Project",
    component: ProjectTemplate,
  },
  {
    path: "/hungry-frog",
    name: "Hungry Frog",
    component: HungryFrog,
  },
  {
    path: "/jetpack-marshmallow",
    name: "Jetpack Marshmallow",
    component: JetpackMarshmallow,
  },
  {
    path: "/wobbly",
    name: "Wobbly",
    component: Wobbly,
  },
  {
    path: "/klick",
    name: "Klick",
    component: Klick,
  },
  {
    path: "/klick-popup",
    name: "Klick Game",
    component: KlickPopup,
    meta: { layout: "blank" },
  },

  // Hidden mini-apps (no nav / project-grid entry)
  {
    path: "/stopwatch",
    name: "Stopwatch",
    component: Stopwatch,
  },
  {
    path: "/cards",
    name: "Cards",
    component: CardTopics,
  },
  {
    path: "/cards/:topic",
    name: "Flashcards",
    component: Flashcards,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

// Tab-Titel, Beschreibung & Co. beim Navigieren aktualisieren (Werte aus pages.ts)
function setHead(selector: string, create: () => HTMLElement, attr: string, value: string | null) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (value === null) return el?.remove();
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}
const meta = (name: string) => () => Object.assign(document.createElement("meta"), { name });

router.afterEach((to) => {
  const page = findPage(to.matched[to.matched.length - 1]?.path ?? to.path);
  document.title = page?.title ?? SITE_NAME;
  setHead('meta[name="description"]', meta("description"), "content", page?.description || null);
  setHead('meta[name="robots"]', meta("robots"), "content", page?.index ? null : "noindex");
  setHead(
    'link[rel="canonical"]',
    () => Object.assign(document.createElement("link"), { rel: "canonical" }),
    "href",
    page?.index ? SITE_URL + page.path : null
  );
});

export default router;
