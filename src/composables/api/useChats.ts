import { inject, type Ref } from "vue";
import type ApiInstances from "../../types/apiInstances";
import type { ChatCreate } from "../../api";

export default function useChats() {
  const chats = (inject("apiInstances") as Ref<ApiInstances>)?.value.chatsApi;
  const socket = inject("WS") as Ref<WebSocket>;

  const handleGetChats = async (limit: number = 20, offset: number = 0) => {
    return await chats?.listChatsChatsGet(limit, offset).then((res) => {
      if (res.status == 200) {
        return res.data;
      }
    });
  };

  const handleCreateChat = async (data: ChatCreate) => {
    return await chats?.createChatChatsPost(data).then((res) => {
      if (res.status == 200) {
        return res.data;
      }
    });
  };

  const handleGetChatDetails = async (
    chatId: string,
    limit: number = 20,
    offset: number = 0
  ) => {
    return await chats
      ?.getChatChatsChatIdGet(chatId, limit, offset)
      .then((res) => {
        if (res.status == 200) {
          return res.data;
        }
      });
  };

  const handleSendMessage = async (
    chatId: string,
    text_content: string,
    image_content: string
  ) => {
    socket.value.send(
      JSON.stringify({
        type: "message",
        chat_id: chatId,
        text_content,
        image_content,
      })
    );
  };

  return {
    handleCreateChat,
    handleGetChatDetails,
    handleGetChats,
    handleSendMessage,
    socket,
  };
}
