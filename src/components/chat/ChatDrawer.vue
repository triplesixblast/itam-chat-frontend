<template>
  <section class="drawer">
    <ChatPreviewComponent
      v-for="chat in chats"
      :key="chat.id"
      v-bind="chat"
      :selected="selectedChat == chat.id"
      @click="emits('select-chat', chat.id)"
    />
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import useChats from "../../composables/api/useChats";
import type { ChatPreview } from "../../api";
import ChatPreviewComponent from "./ChatPreviewComponent.vue";

const { selectedChat } = defineProps<{ selectedChat: string }>();

const { handleGetChats } = useChats();

const chats = ref<ChatPreview[]>([]);

const emits = defineEmits(["select-chat"]);

onMounted(() => {
  handleGetChats().then((res) => {
    chats.value = res?.items!;
  });
});
</script>

<style lang="css" scoped>
.drawer {
  position: fixed;
  top: var(--spacing-md);
  width: calc(var(--spacing-xl) * 2);
  height: calc(100vh - var(--spacing-md));
  background-color: aliceblue;
}
</style>
