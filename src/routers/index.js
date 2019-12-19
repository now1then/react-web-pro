import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import BasicRoutes from "./basic.config";
import NormalRoutes from "./normal.config";
const context = {};

const req = require.context(".", true, /config$/);
console.log(req.keys());

const renderRoutes = () => {
  // req.keys().forEach(key => {
  //   const name = key.match(/([a-zA-Z0-9].*)$/)[1];
  //   const Store = req(key).default;
  //   context[name] = new Store();
  // });
  // console.log(context);

  return (
    <Router>
      <Switch>
        <NormalRoutes />
        <BasicRoutes />
      </Switch>
    </Router>
  );
};

export default renderRoutes;
