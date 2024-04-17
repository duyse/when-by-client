<template>
  <header>
    <img class="logo" :src="image" alt="Logo" />
    <div class="app-name">Whenby</div>
    <nav>
      <ul>
        <span class="nav-link">
          <li><router-link to="/" @click="logout">{{ loginLinkText }}</router-link>
          </li>
          <div v-if="this.uid">
            <li><router-link to="/update-user">Profile</router-link></li>
            <li><router-link :to="'/accounts/' + uid + '/meetings'">Create Meeting</router-link></li>
            <li><router-link to="/meetings">Meetings</router-link></li>
          </div>
        </span>
      </ul>
    </nav>
  </header>
</template>

<script>
import Logo from '@/assets/logo.png';

export default {
  name: 'NavBar',
  mounted() {
    this.getUserId();
  },
  data() {
    return {
      loginLinkText: 'Login',
      uid: '',
      image: Logo,
    }
  },
  methods: {
    getUserId() {
      if (localStorage.getItem('uid')) {
        this.uid = localStorage.getItem('uid');
        this.loginLinkText = 'Logout';
      } else {
        this.uid = '';
        this.loginLinkText = 'Login';
      }
    },
    logout() {
      if (localStorage.getItem('uid')) localStorage.removeItem('uid');
    }
  },
  // Re-render NavBar whenever user id changes
  watch: {
    '$route'() {
      this.getUserId();
    }
  },
}
</script>

<style scoped>
header {
  background-color: #000000;
  color: #fff;
  display: flex;
  justify-content: space-between;
  text-align: center;
  position: fixed;
  width: 100%;
  z-index: 1000;
  top: 0;
}

.app-name {
  padding-left: 10px;
  font-weight: bold;
  font-size: larger;
  margin: auto;
}

nav {
  width: 100%;
}

.nav-link {
  width: 100%;
}

header img.logo {
  max-width: 80px;
  height: auto;
  margin-left: 20px;
}

nav ul {
  margin: 0;
  list-style-type: none;
  display: flex;
}

nav li {
  margin-right: 30px;
  margin-left: 30px;
  height: auto;
  float: right;
}

nav a {
  display: block;
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  line-height: 80px;
  padding: 0px 10px 0px 10px;
}

nav a:hover,
nav a.active {
  background-color: gray;
}
</style>