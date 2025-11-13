import { ref } from "vue";

const errorRef = ref<string>("");

export default function useErrors() {
  return { $error: errorRef };
}
