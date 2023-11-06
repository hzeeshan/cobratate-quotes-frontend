<template>
  <v-container>
    <h1 class="py-5">{{ userName }}'s Favorite Quotes</h1>

    <v-card>
      <v-card-text class="py-5">
        <p>
          I don’t need to be motivated because I’m a disciplined person.If I
          allocate X amount of time to do something, I’m going to do exactly
          that, with complete and absolute vigor for the allocated amount of
          time.
        </p>
      </v-card-text>
    </v-card>
    <v-card class="mt-3">
      <v-card-text class="py-5">
        <p>
          I don’t need to be motivated because I’m a disciplined person.If I
          allocate X amount of time to do something, I’m going to do exactly
          that, with complete and absolute vigor for the allocated amount of
          time.
        </p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
useSeoMeta({
  title: "My Favorites - Cobra Tate Quotes",
  description:
    "Review your favorite Andrew Tate quotes all in one place. Return to the wisdom that resonates with you and curate your personal collection of motivational quotes.",
});

const userName = "Alex";
</script>