import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("../layouts/MainLayout.vue"),
    children: [
      { path: "", redirect: "/chats" },
      {
        path: "chats",
        name: "chats",
        component: () => import("../pages/main/ChatsPage.vue"),
      },
      {
        path: "user/:user_id",
        name: "user",
        component: () => import("../pages/main/UserPage.vue"),
      },
    ],
  },
  {
    path: "/auth",
    component: () => import("../layouts/AuthLayout.vue"),
    children: [
      {
        path: "",
        redirect: "/auth/login",
      },
      {
        path: "login",
        name: "login",
        component: () => import("../pages/auth/LoginPage.vue"),
      },
      {
        path: "register",
        name: "register",
        component: () => import("../pages/auth/RegisterPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("../pages/fallback/ErrorNotFound.vue"),
  },
];

export default routes;
