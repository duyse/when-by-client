import UserTimeSlots from '@/components/UserTimeSlots.vue';
import UserLogin from '../components/UserLogin.vue';
import UserRegister from '../components/UserRegister.vue';

export default [
    {
        path: '/',
        alias: '/login',
        name: 'login',
        component: UserLogin
    },
    {
        path: '/register',
        name: 'register',
        component: UserRegister
    },
    {
        path: '/availabilities',
        name: 'availabilities',
        component: UserTimeSlots
    }
]
