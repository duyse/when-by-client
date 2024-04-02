<template>
    <div className="login-container">
            <h2 class="login-title">Login</h2>
            <form class="login-form">
                <div class="login-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" required v-model="loginRequest.username" />
                </div>
                <div class="login-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" required v-model="loginRequest.password" />
                </div>
                <div class="login-error">{{ this.message }}</div>
            </form>
            <button type="submit" class="login-btn" @click="login">Login</button>
            <p>Don't have an account? <router-link to="/register">Register here</router-link></p> <!--router-link-->
        </div>
</template>

<script>
    import '../assets/styles/login.css'
    import { login } from '../apis/login';
    
    export default {
        name: "UserLogin",

        data() {
            return {
                loginRequest: {
                    username: "",
                    password: ""
                },
                message: ""
            }
        },

        methods: {
            login(event) {
                event.preventDefault();

                login(this.loginRequest)
                .then((res) => {
                    let user = res.data
                    let userId = user.id
                    localStorage.setItem("id", userId);
                    console.log("User has logged in: " + user.username + userId)
                    this.$router.push({ name: "createMeeting" , params: {userId: userId}});     //redirect to the home screen
                })
                .catch((err) => {
                    this.loginRequest.username = ""
                    this.loginRequest.password = ""
                    this.message = err.response.data.message
                    console.log(err.response.data)
                })
            }
        }
    }

</script>

<style scoped></style>