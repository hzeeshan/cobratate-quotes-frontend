<template>
  <v-app>
    <v-container fluid>
      <v-row justify="center" class="centered-content">
        <v-col class="d-flex justify-center bg-ghostWhite">
          <v-card class="text-center centered-item pa-5 w-50">
            <v-card-text>
              <div>
                <v-icon color="red" size="x-large">mdi-alert-circle</v-icon>
              </div>
              <div class="pt-5">
                <h1 class="display-2 mb-6">{{ error.statusCode }}</h1>
                <h2 class="title mb-3">Oops!</h2>
                <p class="subtitle mb-5">
                  {{ error.message }}
                </p>
                <v-btn color="primary" @click="handleClearError">
                  <v-icon>mdi-home</v-icon>
                  Go Home
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
  

<script setup>
const props = defineProps(["error"]);
console.log(props.error);

const handleClearError = () => clearError({ redirect: "/" });
</script>

<style scoped>
.centered-content {
  position: relative;
  height: 100vh; /* this will ensure the container takes up the whole viewport height */
}

.centered-item {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>