import React, { lazy } from "react";

const config = [
  {
    path: "/welcome",
    name: "欢迎页",
    icon: "setting",
    component: lazy(() => import("@/pages/Welcome"))
  },
  {
    path: "/home",
    name: "home主页",
    icon: "setting",
    component: lazy(() => import("@/pages/Home"))
  },
  {
    path: "/login",
    name: "登录页",
    icon: "setting",
    emptyLayout: true,
    component: lazy(() => import("@/pages/Login"))
  },
  {
    path: "/ew",
    redirect: "/welcome"
  },
  {
    path: "/",
    exact: true,
    redirect: "/welcome"
  }
];

export default config;
