import { createRouter, createWebHashHistory } from "vue-router";

import Projects from "../views/Projects.vue";
import Playground from "../views/Playground.vue";
import About from "../views/About.vue";
import Lilu26 from "../views/projects/Lilu26.vue";

const routes = [
  // { path: '/', name: 'Home', component: Homepage },
  // Fallback:
  { path: "/:pathMatch(.*)*", redirect: "/" },
  // Redirect Startpage:
  { path: "/", redirect: "/projects" },
  { path: "/projects", name: "Projects", component: Projects },
  { path: "/playground", name: "Playground", component: Playground },
  { path: "/about", name: "About", component: About },
  { path: "/lilu26", name: "Wobbly x Lilu", component: Lilu26 },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
