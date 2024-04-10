<template>
  <v-layout class="rounded rounded-md">
    <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
      <v-list-item title="John Leider" nav>
        <template v-slot:append>
          <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-home-city" title="HOME" value="home"></v-list-item>
        <v-list-item prepend-icon="mdi-account" title="Profile" value="profile"></v-list-item>
        <v-list-item prepend-icon="mdi-account-group-outline" title="Meetings" value="meetings">
          <v-list nav>
            <v-list-item prepend-icon="mdi-account-group-outline" title="Joined"></v-list-item>
            <v-list-item prepend-icon="mdi-account-group-outline" title="Hosted"></v-list-item>
          </v-list>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :title="title"></v-app-bar>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px"></v-main>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      rail: true,
      title: '',
    }
  },
}
</script>