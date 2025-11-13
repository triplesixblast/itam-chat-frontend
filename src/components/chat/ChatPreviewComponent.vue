<template>
  <div class="container" :class="{ selected: selected }">
    <img :src="avatar ?? placeholderAvatar" />
    <div class="info">
      <p class="name">{{ name }}</p>
      <p class="msg">{{ last_message?.text_content }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatPreview } from "../../api";
import placeholderAvatar from "../../assets/placeholderAvatar.svg";

const { name, avatar, last_message, selected } = defineProps<
  ChatPreview & { selected: boolean }
>();
</script>

<style lang="css" scoped>
.container {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-sm);
  width: calc(var(--spacing-xl) * 2);
  padding-top: var(--spacing-xs);
  padding-bottom: var(--spacing-xs);
  cursor: pointer;
  border-bottom: 1px solid #ccc;
}

.selected {
  background-color: rgba(225, 0, 255, 0.1);
}

.container img {
  width: var(--spacing-md);
  height: var(--spacing-md);
  object-fit: cover;
  object-position: center;
  border-radius: 100%;
  margin-left: var(--spacing-sm);
}

.container p {
  margin: 0;
}

.name {
  font-size: var(--font-size-md);
  text-wrap: nowrap;
  text-overflow: ellipsis;
}
</style>
