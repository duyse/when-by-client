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
                }
            }
        },

        methods: {
            login(event) {
                event.preventDefault();

                login(this.loginRequest)
                .then((res) => {
                    let user = res.data
                    console.log("User has logged in: " + user.username)
                    // localStorage.setItem('uid', user.id)
                    // this.$router.push({ name: "" });     //redirect to the home screen
                })
                .catch((err) => {
                    this.loginRequest.username = ""
                    this.loginRequest.password = ""
                    console.log(err.response.data)
                })
            }
        }
    }

</script>

<style scoped></style>