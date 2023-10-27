<template>
  <v-app>
    <v-row>
      <v-col cols="3">
        <SideBar />
      </v-col>
      <v-col cols="9">
        <div>
          <slot />
        </div>
      </v-col>
    </v-row>
  </v-app>
</template>

