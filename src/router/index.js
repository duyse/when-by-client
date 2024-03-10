import { createWebHistory, createRouter } from 'vue-router';
// import Login from '../components/Login.vue';

const routes = [
    {
        path: '/',
        alias: '/login',
        name: 'login',
        // component: Login
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
