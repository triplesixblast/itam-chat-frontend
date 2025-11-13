<template>
  <div class="input-container">
    <RegularInput v-model="text" />
    <img :src="send" @click="emits('send')" />
  </div>
</template>

<script setup lang="ts">
import RegularInput from "../essentials/RegularInput.vue";
import send from "../../assets/icons/send.svg";

const text = defineModel<string>();

const emits = defineEmits(["send"]);
</script>

<style lang="css" scoped>
.input-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.input-container input {
  width: calc(var(--spacing-xxl) * 2);
  font-size: var(--font-size-md);
}

.input-container img {
  width: var(--spacing-sm);
  cursor: pointer;
}
</style>
