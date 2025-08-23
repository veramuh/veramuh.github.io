import { createRouter, createWebHashHistory } from "vue-router";

import Projects from "../views/Projects.vue";
import Playground from "../views/Playground.vue";
import About from "../views/About.vue";
import ProjectTemplate from "../views/projects/ProjectTemplate.vue";
import HungryFrog from "../views/projects/HungryFrog.vue";

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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
