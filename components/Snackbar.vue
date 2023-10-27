<template>
  <v-snackbar v-model="showing" :color="color" :timeout="timeout">
    {{ text }}

    <template v-slot:actions>
      <v-btn variant="text" @click="closeSnackbar"> Close </v-btn>
    </template>
  </v-snackbar>
</template>
  
<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  text: { type: String, default: "" },
  color: { type: String, default: "" },
  timeout: { type: Number, default: 5000 },
});

const emits = defineEmits(["update:modelValue"]);

let showing = ref(props.modelValue);

watchEffect(() => {
  showing.value = props.modelValue;
});

const closeSnackbar = () => {
  showing.value = false;
  emits("update:modelValue", false);
};
// Reset visibility after timeout or when 'Close' button is clicked
watchEffect(() => {
  if (showing.value) {
    setTimeout(() => {
      showing.value = false;
      emits("update:modelValue", false);
    }, props.timeout);
  }
});
</script>
  