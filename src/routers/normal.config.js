// 标准空页面 路由
import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

const config = [
  {
    path: "/login",
    name: "登录页面",
    component: lazy(() => import("@/pages/Login"))
  }
];

const NormarRoutes = () => {
  return config ? (
    <>
      {config.map(item => {
        if (item.redirect) {
          return (
            <Route
              key={item.path}
              {...item}
              render={() => <Redirect to={item.redirect} />}
            />
          );
        }
        const Component = item.component;
        return (
          <Route
            key={item.path}
            path={item.path}
            exact={item.exact}
            strict={item.strict}
            // {...item}
            render={() => (
              <Suspense fallback="loading">
                <Component />
              </Suspense>
            )}
          />
        );
      })}
    </>
  ) : null;
};

export default NormarRoutes;
