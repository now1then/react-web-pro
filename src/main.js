import React from 'react';
import ReactDom from 'react-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import './styles/main.less';
import AppRouter from './routers/AppRouter';

dayjs.locale('zh-cn');

const App = () => (
  <ConfigProvider locale={zhCN}>
    <AppRouter />
  </ConfigProvider>
);

ReactDom.render(<App />, document.getElementById('app'));

// 热更新
if (module.hot) {
  module.hot.accept((err) => {
    if (err) {
      console.error('module.hot，', err);
    }
  });
}
