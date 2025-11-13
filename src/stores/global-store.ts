import { defineStore } from "pinia";
import type { UserPublic } from "../api";
import useAuth from "../composables/api/useAuth";
import { useJwtToken } from "../composables/useCookies";

interface State {
  me: UserPublic | null;
}

export const useGlobalStore = defineStore("global", {
  state: (): State => {
    return {
      me: null,
    };
  },
});
