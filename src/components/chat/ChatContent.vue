<template>
  <section class="chat-container">
    <div v-if="!chatId">
      <p class="center-message">Выберите собеседника</p>
    </div>
    <Suspense v-else>
      <div>
        <div class="messages-container">
          <Message
            v-for="message in messages"
            :key="message.id"
            v-bind="message"
            :my-id="myId"
          />
        </div>
        <ChatInput v-model="inputMessage" class="input" @send="handleSend" />
      </div>

      <template #fallback><p class="center-message">Загрузка...</p></template>
    </Suspense>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import useChats from "../../composables/api/useChats";
import type { ChatDetail, MessageOut } from "../../api";
import Message from "./Message.vue";
import ChatInput from "./ChatInput.vue";
import useWS from "../../composables/useWS";

const { chatId } = defineProps<{ chatId: string; myId: string }>();

const { handleGetChatDetails, handleSendMessage, socket } = useChats();

const messages = ref<MessageOut[]>([]);
const chatInfo = ref<ChatDetail>();

const inputMessage = ref<string>();

const handleSend = () => {
  if (inputMessage.value?.length == 0) {
    return;
  }
  handleSendMessage(chatId, inputMessage.value!, "");
  inputMessage.value = "";
};

watch(
  () => chatId,
  async () => {
    if (chatId) {
      await handleGetChatDetails(chatId).then((res) => {
        messages.value = res?.messages!;
        chatInfo.value = res?.chat;
      });
    }
    inputMessage.value = "";
  }
);

const handleEnter = (event: KeyboardEvent) => {
  if (event.key == "Enter") {
    handleSend();
  }
};

onMounted(() => {
  socket.value.onmessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data);
    if (data.type == "message" && data.chat_id == chatId) {
      messages.value.unshift(data.message);
    }
  };

  document.addEventListener("keydown", handleEnter);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleEnter);
});
</script>

<style lang="css" scoped>
.chat-container {
  position: fixed;
  top: var(--spacing-md);
  left: calc(var(--spacing-xl) * 2);
  height: calc(100vh - var(--spacing-md));
  width: calc(100vw - calc(var(--spacing-xl) * 2));
  overflow-y: auto;
}

.messages-container {
  display: flex;
  flex-direction: column-reverse;
  gap: var(--spacing-sm);
  padding-left: var(--spacing-sm);
  padding-right: var(--spacing-sm);
  padding-bottom: var(--spacing-lg);
  padding-top: var(--spacing-sm);
}

.input {
  position: fixed;
  top: calc(100vh - var(--spacing-sm) * 1.5);
  left: calc((100vw - var(--spacing-xl) * 2) / 2 + var(--spacing-xl) * 2);
  transform: translate(-50%);
}
</style>
