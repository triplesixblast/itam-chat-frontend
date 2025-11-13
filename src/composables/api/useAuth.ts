import { inject, type Ref } from "vue";
import type ApiInstances from "../../types/apiInstances";
import type { LoginRequest, UserCreate } from "../../api";
import { COOKIES, setCookie } from "../useCookies";
import { useGlobalStore } from "../../stores/global-store";

export default function useAuth() {
  const auth = (inject("apiInstances") as Ref<ApiInstances>)?.value.authApi;
  const globalStore = useGlobalStore();

  const handleLogin = async (data: LoginRequest) => {
    return await auth?.loginLoginPost(data).then((res) => {
      if (res.status == 200) {
        const { access_token } = res.data;
        setCookie(COOKIES.jwtToken, access_token);
      }
    });
  };

  const handleRegister = async (data: UserCreate) => {
    return await auth?.registerRegisterPost(data).then((res) => {
      if (res.status == 200) {
        return res.data;
      }
    });
  };

  const handleGetMe = async () => {
    return await auth?.getMeMeGet().then((res) => {
      if (res.status == 200) {
        globalStore.me = res.data;
      }
    });
  };

  return { handleLogin, handleRegister, handleGetMe };
}
