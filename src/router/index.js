import { createRouter, createWebHistory } from 'vue-router';


import HomeView from '@/views/HomeView.vue';
import SettingView from '@/views/SettingView.vue';

const routes = [
    { path: '/', name: 'home', component: HomeView},
    { path: '/settings', name: 'settings', component: SettingView}
]

export const router = createRouter({
    history: createWebHistory(import.meta.BASE_URL),
    routes,
})