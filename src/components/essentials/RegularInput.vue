<template>
  <input v-model="model" v-bind="$attrs" />
</template>

<script setup lang="ts">
// import type { InputHTMLAttributes } from "vue";
// import type { HtmlHTMLAttributes } from "vue";

// defineProps<HtmlHTMLAttributes>();
const model = defineModel<string>();
</script>

<style lang="css" scoped>
input {
  font-size: var(--font-size-sm);
}
</style>
