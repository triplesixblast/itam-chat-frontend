import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { AuthApi, ChatsApi, Configuration, SearchApi } from "../api";
import type { BaseAPI } from "../api/base";
import { provide, ref } from "vue";
import { COOKIES, getCookie } from "./useCookies";
import useErrors from "./useErrors";
import type ApiInstances from "../types/apiInstances";

const apiInstances = ref<ApiInstances>();

export default function useApi() {
  // Call useErrors inside the function, not at module level
  // This ensures the error ref is provided before we try to use it
  const { $error } = useErrors();

  const config = new Configuration({
    basePath: import.meta.env.VITE_APP_API_BASE_URL,
  });

  apiInstances.value = {
    authApi: new AuthApi(config),
    chatsApi: new ChatsApi(config),
    searchApi: new SearchApi(config),
  };

  Object.values(apiInstances.value).forEach((apiInstance: BaseAPI) => {
    apiInstance.axios.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        config.headers["Authorization"] =
          "Bearer " + getCookie(COOKIES.jwtToken);
        return config;
      }
    );
    apiInstance.axios.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        $error.value = error.response?.data?.detail ?? "Что-то пошло не так";
        return error;
      }
    );
  });
  provide("apiInstances", apiInstances);
}
