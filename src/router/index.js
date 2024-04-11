import { createWebHistory, createRouter } from 'vue-router';
import routes from './routes';

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const uid = localStorage.getItem('uid');
    if (!uid && to.path !== '/' && to.path !== '/register') next('/');
    else next();
});

export default router;
