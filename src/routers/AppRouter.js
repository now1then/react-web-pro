import React, { lazy, Suspense } from "react";
import LoadingPage from "@/components/LoadingPage";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import config from "./config1";

const renderRoutes = routes => {
  if (!Array.isArray(routes)) {
    return null;
  }

  return (
    <Switch>
      {routes.map((route, i) => {
        if (route.redirect) {
          return (
            <Redirect
              key={route.path || i}
              exact={route.exact}
              strict={route.strict}
              from={route.path}
              to={route.redirect}
            />
          );
        }

        return (
          <Route
            key={route.path || i}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            render={() => {
              const renderChildRoutes = renderRoutes(route.childRoutes);
              if (route.component) {
                return (
                  <Suspense fallback={<LoadingPage />}>
                    <route.component route={route}>
                      {renderChildRoutes}
                    </route.component>
                  </Suspense>
                );
              }
              return renderChildRoutes;
            }}
          />
        );
      })}
    </Switch>
  );
};

const AppRouter = () => {
  console.log(renderRoutes(config));
  return <Router>{renderRoutes(config)}</Router>;
};

export default AppRouter;
