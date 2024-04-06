import UserLogin from '../components/UserLogin.vue';
import UserRegister from '../components/UserRegister.vue';
import ShowMeetings from '../components/ShowMeetings.vue';
import UpdateUser from '../components/UpdateUser.vue';

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
        path: '/meetings',
        name: 'meetings',
        component: ShowMeetings
    },
    {
        path: '/update-user',
        name: 'update-user',
        component: UpdateUser
    }
]
