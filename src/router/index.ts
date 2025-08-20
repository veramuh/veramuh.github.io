import { createRouter, createWebHashHistory } from "vue-router";

import Projects from "../views/Projects.vue";
import Playground from "../views/Playground.vue";
import About from "../views/About.vue";
import ProjectTemplate from "../views/projects/ProjectTemplate.vue";

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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
