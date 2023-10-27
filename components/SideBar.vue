<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        color="primary accent-4"
        permanent
        class="navigation-drawer"
        style="width: 100%"
      >
        <v-list>
          <v-list-item prepend-icon="mdi-view-dashboard" to="/admin/dashboard"
            >Dashboard</v-list-item
          >

          <v-list-item prepend-icon="mdi-home" to="/">Home</v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: calc(100vh - 5vh)"></v-main>
    </v-layout>
  </v-card>
</template>
<script setup>
</script>
<style scoped>
.navigation-drawer {
  padding-top: 10px;
}
.v-list-item--active {
  background-color: #000000;
}
</style>