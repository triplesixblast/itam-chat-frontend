<template>
  <Teleport to="body">
    <div v-if="isVisible && localError" class="error-container">
      <p>{{ localError }}</p>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import useErrors from "../composables/useErrors";

const localError = ref<string>();
const { $error } = useErrors();
const isVisible = ref<boolean>(false);
let timeout: ReturnType<typeof setTimeout>;

watch(
  () => $error.value,
  (newError) => {
    if (newError != "") {
      localError.value = newError;
      $error.value = "";
    }
    if (localError.value) {
      isVisible.value = true;
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        isVisible.value = false;
        localError.value = "";
      }, 5000);
    } else {
      isVisible.value = false;
    }
  },
  { immediate: true }
);
</script>

<style lang="css">
.error-container {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: var(--spacing-md);
  background-color: #ef4444;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  max-width: 90%;
  word-wrap: break-word;
}

.error-container p {
  margin: 0;
}
</style>
