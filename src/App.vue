<template>
  <ErrorComponent />
  <router-view />
</template>

<script setup lang="ts">
import useApi from "./composables/useApi";
import useWS from "./composables/useWS";
import "./styles/variables.css";
import ErrorComponent from "./components/ErrorComponent.vue";
import { onBeforeMount, watch } from "vue";
import { useGlobalStore } from "./stores/global-store";
import { storeToRefs } from "pinia";
import { useJwtToken } from "./composables/useCookies";
import useAuth from "./composables/api/useAuth";

// initialize api & ws instances
useApi();
useWS();

const jwtToken = useJwtToken();
const globalStore = useGlobalStore();

const { handleGetMe } = useAuth();
// const { me } = storeToRefs(globalStore);

watch(
  () => globalStore.me,
  (meValue) => {
    console.log(meValue);
  },
  { immediate: true }
);

watch(
  () => jwtToken.value,
  async (tokenValue) => {
    if (tokenValue == "") {
      globalStore.me = null;
    } else {
      await handleGetMe();
    }
  },
  {}
);
</script>
