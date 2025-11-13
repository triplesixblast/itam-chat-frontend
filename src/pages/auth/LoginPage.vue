<template>
  <div class="login-form">
    <RegularInput
      v-model="username"
      placeholder="Юзернейм или почта"
      type="email"
    />
    <RegularInput v-model="password" placeholder="Пароль" type="password" />
    <Button @click="handleSubmit">Войти</Button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "../../components/essentials/Button.vue";
import RegularInput from "../../components/essentials/RegularInput.vue";
import useAuth from "../../composables/api/useAuth";

const { handleLogin } = useAuth();

const username = ref<string>("");
const password = ref<string>("");

const handleSubmit = () => {
  if (!username.value || !password.value) {
    return;
  }
  handleLogin({ username_or_email: username.value, password: password.value });
};
</script>

<style lang="css" scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-xl);
  padding-left: var(--spacing-xxl);
  padding-right: var(--spacing-xxl);
}
</style>
