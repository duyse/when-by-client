import CreateMeeting from '@/components/CreateMeeting.vue';
import UserLogin from '@/components/UserLogin.vue';
import UserRegister from '@/components/UserRegister.vue';
import UserTimeSlots from '@/components/UserTimeSlots.vue';

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
        name: 'UserTimeSlots',
        component: UserTimeSlots
    },
    {
        path: '/accounts/:userId/meetings',
        alias: '/accounts/:userId/meetings',
        name: 'CreateMeeting',
        component: CreateMeeting
    }
]
