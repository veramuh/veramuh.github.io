import { createRouter, createWebHashHistory } from "vue-router";

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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
