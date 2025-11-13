<template>
  <button v-bind="$attrs" @click="handleClick"><slot /></button>
</template>

<script setup lang="ts">
// import type { HTMLAttributes } from "vue";

// defineProps<HTMLAttributes>();
const emits = defineEmits(["click"]);

const handleClick = (e: Event) => {
  emits("click", e);
};
</script>

<style lang="css" scoped>
button {
  font-size: var(--font-size-sm);
}
</style>
