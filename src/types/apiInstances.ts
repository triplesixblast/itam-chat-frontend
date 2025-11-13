import type { AuthApi, ChatsApi, SearchApi } from "../api";

export default interface ApiInstances {
  authApi: AuthApi;
  chatsApi: ChatsApi;
  searchApi: SearchApi;
}
