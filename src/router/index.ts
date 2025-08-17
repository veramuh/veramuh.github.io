import {createRouter, createWebHashHistory} from 'vue-router'

import Projects from '../views/Projects.vue'
import Playground from '../views/Playground.vue'
import About from '../views/About.vue'

const routes = [
    // { path: '/', name: 'Home', component: Homepage },
    // Redirect Startpage:
    { path: '/', redirect: '/projects' },
    { path: '/projects', name: 'Projects', component: Projects },
    { path: '/playground', name: 'Playground', component: Playground },
    { path: '/about', name: 'About', component: About },
    // Fallback:
    { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router