<template>
  <div>
    <div>
      <div style="font-size: 30vh">404</div>

      <div style="opacity: 0.4">Oops. Nothing here...</div>

      <button @click="handleGoBack">Вернуться</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const handleGoBack = () => {
  router.replace("/");
};
</script>
