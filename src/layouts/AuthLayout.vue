<template>
  <router-view />
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useJwtToken } from "../composables/useCookies";
import { useRouter } from "vue-router";

const router = useRouter();
const jwtToken = useJwtToken();

watch(
  jwtToken,
  (cookieVal) => {
    if (cookieVal) {
      router.replace("/");
    }
  },
  { immediate: true }
);
</script>
