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
import { login } from '@/services/login';
import { useToast } from 'vue-toastification';

export default {
  name: 'UserLogin',
  setup() {
    const toast = useToast();
    return { toast }
  },
  data() {
    return {
      loginRequest: {
        username: '',
        password: '',
      },
      message: '',
    }
  },
  methods: {
    login(event) {
      event.preventDefault();
      login(this.loginRequest)
        .then((res) => {
          let user = res.data;
          localStorage.setItem('uid', user.id);
          this.$router.push({ name: 'meetings' });     //redirect to the home screen
        })
        .catch((err) => {
          this.toast.error(err.response.data.message);
          this.loginRequest.username = '';
          this.loginRequest.password = '';
          console.log(err);
        });
    },
  },
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

.login-group {
  margin-bottom: 20px;
}

.login-group label {
  display: block;
  margin-bottom: 10px;
  color: #666;
  text-align: left;
}

.login-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-btn {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-btn:hover {
  background-color: #0056b3;
}

.login-btn:active {
  transform: scale(0.95);
}

.login-error {
  margin-bottom: 10px;
  font-size: 0.9em;
  color: red;
}
</style>