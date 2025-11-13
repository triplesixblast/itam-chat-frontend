import { inject } from "vue";
import type ApiInstances from "../../types/apiInstances";
import type { LoginRequest, UserCreate } from "../../api";
import { COOKIES, setCookie } from "../useCookies";

export default function useAuth() {
  const auth = (inject("apiInstances") as ApiInstances).authApi;

  const handleLogin = async (data: LoginRequest) => {
    return await auth.loginLoginPost(data).then((res) => {
      if (res.status == 200) {
        const { access_token } = res.data;
        setCookie(COOKIES.jwtToken, access_token);
      }
    });
  };

  const handleRegister = async (data: UserCreate) => {
    return await auth.registerRegisterPost(data).then((res) => {
      if (res.status == 200) {
        return res.data;
      }
    });
  };

  const handleGetMe = async () => {
    return await auth.getMeMeGet().then((res) => {
      if (res.status == 200) {
        return res.data;
      }
    });
  };

  return { handleLogin, handleRegister, handleGetMe };
}
