import React, { useState, useEffect, useContext } from "react";
import { observer } from "mobx-react";
import Store from "./store";

import "./style.less";

const HomePage = () => {
  const pageStore = useContext(Store);

  return (
    <div className="page-home page-content">
      home页面
      <h2>{pageStore.pageTitle}</h2>
    </div>
  );
};

export default observer(HomePage);
