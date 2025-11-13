import { onBeforeMount, provide, ref, watch } from "vue";
import { useJwtToken } from "./useCookies";

let socket = ref<WebSocket>(new WebSocket(""));

export default function useWS() {
  const jwtToken = useJwtToken();

  const handleOpenSocket = () => {
    if (!jwtToken.value) return;
    socket.value = new WebSocket(
      import.meta.env.VITE_APP_WS_BASE_URL +
        "?token=" +
        encodeURIComponent(jwtToken.value)
    );
  };

  watch(jwtToken, (token) => {
    if (
      (!socket.value || socket.value.readyState === WebSocket.CLOSED) &&
      token
    ) {
      handleOpenSocket();
    }
  });

  onBeforeMount(() => {
    if (jwtToken.value) {
      handleOpenSocket();

      socket.value.onclose = () => {
        handleOpenSocket();
      };
    }
  });

  provide("WS", socket);
}
