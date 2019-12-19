import React from 'react';
import ReactDom from 'react-dom';
import { ConfigProvider, message } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";

import './styles/main.less';
import AppRouter from './router';
import RenderRoutes from './routers';
import RenderRoutes1 from './routers/test';

moment.locale("zh-cn");

const App = () => (
  <ConfigProvider locale={zhCN}>
    <RenderRoutes1 />
    {/* <AppRouter></AppRouter> */}
  </ConfigProvider>
);

ReactDom.render(<App />,
  document.getElementById("app")
);

// 热更新
if (module.hot) {
  module.hot.accept((err) => {
    if (err) {
      console.error('module.hot，', err);
    }
  });
}

// clean-webpack-glugin copy-webpack-plugin babel-plugin-import
// antd mobx mobx-react moment
