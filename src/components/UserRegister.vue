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
import { register } from '@/services/register';
import { useToast } from 'vue-toastification';

export default {
  name: 'UserRegister',
  setup() {
    const toast = useToast();
    return { toast }
  },
  data() {
    return {
      registerRequest: {
        username: "",
        email: "",
        password: "",
      },
      message: "",
    }
  },

  methods: {
    register(event) {
      event.preventDefault();

      register(this.registerRequest)
        .then(() => this.$router.push('login'))
        .catch((err) => {
          this.message = err.response.data.message;
          this.toast.error(this.message);
          console.log(err);
        });
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
</style>../services/register