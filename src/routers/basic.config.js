// basicLaout 布局 路由
import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import BasicLayout from "@/layouts/BasicLayout";

const config = [
  {
    path: "/welcome",
    name: "欢迎页",
    icon: "form",
    component: lazy(() => import("@/pages/Welcome"))
  },
  {
    path: "/home",
    name: "home页",
    icon: "form",
    component: lazy(() => import("@/pages/Home"))
  },
  {
    path: "/welc",
    redirect: "/welcome"
  }
];

const BasicRoutes = () => {
  return config ? (
    <>
      {config.map(item => {
        if (item.redirect) {
          return (
            <Redirect
              key={item.path}
              exact={item.exact}
              strict={item.strict}
              from={item.path}
              to={item.redirect}
            />
            // <Route
            //   key={item.path}
            //   path={item.path}
            //   // {...item}
            //   render={() => <Redirect from={item.path} to={item.redirect} />}
            // />
          );
        }
        const Component = item.component;

        return (
          <Route
            key={item.path}
            path={item.path}
            exact={item.exact}
            strict={item.strict}
            render={() => (
              <BasicLayout>
                <Suspense fallback="loading">
                  <Component />
                </Suspense>
              </BasicLayout>
            )}
          />
        );
      })}
    </>
  ) : null;
};

export default BasicRoutes;
