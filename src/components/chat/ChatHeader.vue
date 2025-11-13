<template>
  <header>
    <p>ITAM Chat</p>
    <div class="right-buttons">
      <Button @click="handleLogout">Выйти</Button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { COOKIES, setCookie } from "../../composables/useCookies";
import Button from "../essentials/Button.vue";

const handleLogout = () => {
  setCookie(COOKIES.jwtToken, "");
};
</script>

<style lang="css" scoped>
header {
  width: 100vw;
  background-color: var(--color-bg-2);
  height: var(--spacing-md);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
}

header p {
  font-size: var(--font-size-md);
  color: var(--color-text);
  margin: 0;
  padding-left: var(--spacing-md);
}

.right-buttons {
  padding-right: var(--spacing-md);
}
</style>
