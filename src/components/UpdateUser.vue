<template>
    <div className="login-container">
            <h2 class="login-title">Profile</h2>
            <form class="login-form">
                <div class="login-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" required v-model="updateRequest.username" />
                </div>
                <div class="login-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" required v-model="updateRequest.email" />
                </div>
                <div class="login-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" required v-model="updateRequest.password" />
                </div>
                <div class="login-error">{{ this.message }}</div>
            </form>
            <button type="submit" class="login-btn" @click="update">Update</button>
        </div>
</template>

<script>
    import '../assets/styles/login.css'
    import UserService from '../apis/UserService'
    
    export default {
        name: "UpdateUser",

        data() {
            return {
                updateRequest: {
                    username: "",
                    email: "",
                    password: ""
                },
                message: ""
            }
        },

        methods: {
            checkLogin() {
                if (!localStorage.getItem('uid')) {
                    this.$router.push({name: "login"});
                }
            },

            showAccount() {
                UserService.getUser(localStorage.getItem('uid'))
                .then((res) => {
                    let user = res.data
                    this.updateRequest.username = user.username;
                    this.updateRequest.password = user.password;
                    this.updateRequest.email = user.email;
                })
                .catch((err) => {
                    this.message = err.response.data.message
                    console.log(err)
                })
            },

            update(event) {
                event.preventDefault();

                UserService.updateUser(localStorage.getItem('uid'), this.updateRequest)
                .then((res) => {
                    let user = res.data
                    console.log('User updated: ' + user.username)
                    this.$router.push({name: 'meetings'})
                })
                .catch((err) => {
                    this.message = err.response.data.message
                    console.log(err)
                })
            }
        },

        mounted() {
            this.checkLogin();
            this.showAccount();
        }
    }

</script>

<style scoped></style>