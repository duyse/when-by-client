<template>
    <div className="login-container">
            <h2 class="login-title">Register</h2>
            <form class="login-form">
                <div class="login-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" required v-model="registerRequest.username" />
                </div>
                <div class="login-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" required v-model="registerRequest.email" />
                </div>
                <div class="login-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" required v-model="registerRequest.password" />
                </div>
            </form>
            <button type="submit" class="login-btn" @click="register">Register</button>
            <p>Already have an account? <router-link to="/">Login here</router-link></p> <!--router-link-->
        </div>
</template>

<script>
    import '../assets/styles/login.css'
    import {register} from '../apis/register'
    
    export default {
        name: "UserRegister",

        data() {
            return {
                registerRequest: {
                    username: "",
                    email: "",
                    password: ""
                }
            }
        },

        methods: {
            register(event) {
                event.preventDefault();

                register(this.registerRequest)
                .then((res) => {
                    let user = res.data
                    console.log('User created: ' + user.username)
                    this.$router.push('login')
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        }
    }

</script>

<style scoped></style>