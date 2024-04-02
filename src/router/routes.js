import UserLogin from '../components/UserLogin.vue';
import UserRegister from '../components/UserRegister.vue';
import CreateMeeting from '../components/CreateMeeting.vue'

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
        path: '/accounts/:userId/meetings',
        alias: '/accounts/:userId/meetings',
        name: 'createMeeting',
        component: CreateMeeting
    }
]
