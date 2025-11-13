<template>
  <ChatHeader />
  <ChatDrawer
    :selected-chat="selectedChat"
    @select-chat="selectedChat = $event"
  />
  <ChatContent :chatId="selectedChat" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import ChatDrawer from "../../components/chat/ChatDrawer.vue";
import ChatHeader from "../../components/chat/ChatHeader.vue";
import ChatContent from "../../components/chat/ChatContent.vue";
import useAuth from "../../composables/api/useAuth";
import type { UserPublic } from "../../api";

const { handleGetMe } = useAuth();

const selectedChat = ref<string>("");
const me = ref<UserPublic>();

const handleEscape = (event: KeyboardEvent) => {
  if (event.key == "Escape") {
    selectedChat.value = "";
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleEscape);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleEscape);
});
</script>

<style lang="css" scoped></style>
