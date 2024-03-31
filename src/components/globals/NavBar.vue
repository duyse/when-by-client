<template>
    <header>
        <img class="logo" src="../../assets/images/Logo.png" alt="Logo"/>
        <div class="app-name">Whenby</div>
        <nav>
            <ul>
                <span class="nav-link">
                    <li><router-link to="/" @click="logout">{{ loginLinkText }}</router-link></li>
                    <div v-if="uid">
                        <li><router-link to="/new-meeting">New Meeting</router-link></li>
                        <li><router-link to="/meetings">Meetings</router-link></li>
                    </div>
                </span>
            </ul>
        </nav>
    </header>
</template>

<script>
import '../../assets/styles/header.css'
    export default {
        name: "NavBar",

        data() {
            return {
                loginLinkText: "Login",
                uid: ""
            }
        },

        methods: {
            getUserId() {
                if (localStorage.getItem('uid')) {
                    this.uid = localStorage.getItem('uid')
                    this.loginLinkText = "Logout" 
                } else {
                    this.uid = ""
                    this.loginLinkText = "Login" 
                }
            },

            logout() {
                if (localStorage.getItem('uid')) {
                    localStorage.removeItem('uid')
                    location.reload()
                }
            }
        },

        mounted() {
            this.getUserId()
        }
    }
</script>

<style scoped></style>
