<template>
  <div
    class="message"
    :class="{
      'from-me': from_user_id == myId,
      'from-another': from_user_id != myId,
    }"
  >
    <img v-if="image_content" :src="image_content" />
    <p v-if="text_content">{{ text_content }}</p>
    <p>{{ timestamp }}</p>
  </div>
</template>

<script setup lang="ts">
import type { MessageOut } from "../../api";
import moment from "moment";

const { text_content, image_content, seen_by, myId, created_at, from_user_id } =
  defineProps<MessageOut & { myId: string }>();

const timestamp = moment(created_at).format("hh:mm DD.MM");
</script>

<style lang="css" scoped>
.message {
  color: var(--color-text);
  border-radius: 18px;
  width: calc(var(--spacing-xxl) * 2);
  padding: var(--spacing-xs);
  position: relative;
}

.from-me {
  align-self: flex-end;
  background-color: var(--color-bg-2);
}

.from-another {
  align-self: flex-start;
  background-color: var(--color-dark-gray);
}
</style>
