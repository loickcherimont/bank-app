import { createRouter, createWebHistory } from 'vue-router';


import HomeView from '@/views/HomeView.vue';
import SettingView from '@/views/SettingView.vue';
import NotFound from '@/views/NotFound.vue'

const routes = [
    { path: '/', name: 'home', component: HomeView },
    { path: '/home', redirect: '/'}, /** Redirect user on Root page if path /home it's used */
    { path: '/settings', name: 'settings', component: SettingView },
    { path: '/:pathMatch(.*)*', name: 'not found', component: NotFound } /** Catch all not allowed paths and move user on a NotFound page */
]

export const router = createRouter({
    history: createWebHistory(import.meta.BASE_URL),
    routes,
})