<template>
  <ErrorComponent />
  <router-view />
</template>

<script setup lang="ts">
import useApi from "./composables/useApi";
import useWS from "./composables/useWS";
import "./styles/variables.css";
import ErrorComponent from "./components/ErrorComponent.vue";
import { onBeforeMount } from "vue";

// initialize api & ws instances
useApi();
useWS();
</script>
