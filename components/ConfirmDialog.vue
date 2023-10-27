<template>
  <v-dialog
    v-model="dialog"
    max-width="400"
    :style="{ zIndex: zIndex }"
    @keydown.esc="cancel"
  >
    <v-card>
      <v-toolbar dark color="primary" dense flat>
        <v-toolbar-title class="text-body-2 font-weight-bold white--text">
          {{ title }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text v-show="!!message" class="pa-4 black--text">{{
        message
      }}</v-card-text>
      <v-card-actions class="pt-3">
        <v-spacer></v-spacer>
        <v-btn
          v-if="!options.noconfirm"
          color="secondary"
          outlined
          class="body-2 font-weight-bold"
          @click.native="cancel"
          >{{ no }}</v-btn
        >
        <v-btn
          color="primary"
          class="body-2 font-weight-bold"
          outlined
          @click.native="agree"
          >{{ yes }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
  

<script setup>
const props = defineProps({
  modelValue: Boolean,
  message: String,
  title: String,
  yes: String,
  no: String,
  options: Object,
});

const zIndex = 1500;

const emits = defineEmits(["update:modelValue", "confirm"]);

let resolve = ref(null);

const dialog = computed({
  get: () => props.modelValue,
  set: (value) => {
    if (!value) emits("update:modelValue", false);
  },
});

// watch dialog to handle promise resolve
watch(dialog, (newVal) => {
  if (resolve.value && !newVal) {
    resolve.value(false);
    resolve.value = null;
  }
});

// emit confirm event
const agree = () => {
  if (resolve.value) {
    resolve.value(true);
  }
  dialog.value = false;
  emits("confirm");
};

const cancel = () => {
  dialog.value = false;
};
</script>

