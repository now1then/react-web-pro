import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import BasicLayout from "@/layouts/BasicLayout";

import config from "./config";

const RenderComponent = route => {
  if (route.emptyLayout) {
    return (
      <Suspense fallback="loading">
        <route.component />
      </Suspense>
    );
  }
  return (
    <BasicLayout>
      <Suspense fallback="loading">
        <route.component />
      </Suspense>
    </BasicLayout>
  );
};

const ItemRoute = route => {
  console.log(route);
  if (route.redirect) {
    return (
      <Redirect
        key={route.path}
        exact={route.exact}
        strict={route.strict}
        from={route.path}
        to={route.redirect}
      />
    );
  }
  const Component = route.component;

  return (
    <Route
      key={route.path}
      path={route.path}
      exact={route.exact}
      strict={route.strict}
      render={() => <RenderComponent {...route} />}
    />
  );
};

const RenderRoutes = () => {
  return (
    <Router>
      <Switch>
        {config.map(item => (
          <ItemRoute key={item.path} {...item} />
        ))}
      </Switch>
    </Router>
  );
};

export default RenderRoutes;
