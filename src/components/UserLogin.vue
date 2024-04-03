<template>
  <div className="login-container">
    <h2 class="login-title">Login</h2>
    <form class="login-form">
      <text-input for="username" v-model="loginRequest.username">Username</text-input>
      <text-input for="password" type="password" v-model="loginRequest.password">Password</text-input>
      <div class="login-error">{{ this.message }}</div>
      <custom-button @click="login">Login</custom-button>
    </form>
    <p>Don't have an account? <router-link to="/register">Register here</router-link></p> <!--router-link-->
  </div>
</template>

<script>
import { login } from '../apis/login';
import CustomButton from './widgets/CustomButton.vue';
import TextInput from './widgets/TextInput.vue';

export default {
  name: "UserLogin",
  components: {
    TextInput,
    CustomButton,
  },
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
    login(e) {
      e.preventDefault()
      console.log(this.loginRequest);
      login(this.loginRequest)
        .then((res) => {
          let user = res.data
          console.log("User has logged in: " + user.username)
          localStorage.setItem('uid', user.id)
          this.$router.push({ name: "time" });     //redirect to the home screen
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

<style scoped>
.login-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 370px;
  margin: auto;
  margin-top: 140px;
}

h2.login-title {
  text-align: center;
  color: #333;
}

.login-error {
  margin-bottom: 10px;
  font-size: 0.9em;
  color: red;
}
</style>
