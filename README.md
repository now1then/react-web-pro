# [react-web-pro](https://github.com/now1then/react-web-pro)

🌈 🚀 基于 webpack4.0 从零搭建的 React 中后台项目框架模板。🚀

[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://github.com/now1then/react-web-pro/master/LICENSE)

[![webpack](https://img.shields.io/badge/webpack-4.41.2-green)](https://github.com/webpack/webpack) [![react](https://img.shields.io/badge/react-16.12.0-green)](https://github.com/facebook/react) [![react-router](https://img.shields.io/badge/react--router-5.1.2-green)](https://github.com/ReactTraining/react-router) [![axios](https://img.shields.io/badge/axios-0.19.0-green)](https://github.com/axios/axios) [![ant-design](https://img.shields.io/badge/ant--design-3.26.2-green.svg)](https://ant.design/index-cn) [![mobx](https://img.shields.io/badge/mobx-5.15.0-green.svg)](https://github.com/mobxjs/mobx)

## 说明

本项目为 React 中后台项目框架模板，方便快速进行具体项目开发。包括 Webpack4.0 配置及打包优化、React 全家桶使用（React + React-router + Axios + Mobx + Antd）、ESLint 等项目开发规范等。

项目 Git 地址：[https://github.com/now1then/react-web-pro](https://github.com/now1then/react-web-pro)；

项目介绍文章链接-语雀：[https://www.yuque.com/nowthen/longroad/exeuw7](https://www.yuque.com/nowthen/longroad/exeuw7)；

在线演示地址：

项目页面演示：
![演示gif](/public/演示.gif)

### 技术栈

涉及的技术栈均采用当前最新的版本和语法：

- 使用 Webpack4.0 构建项目（不使用 create-react-app、umi 等脚手架）；
- 使用 Babel7 配置转换 ES6、React、Mobx 等语法；
- React 版本 V16.12.0，全部采用函数化 Hooks 特性开发项目组件；
- 采用 React-router5 工具 配置项目路由；
- 采用 Mobx5 + Hooks 实现项目数据状态管理；
- 封装 Axios 库实现与后台 http 请求交互；
- UI 库采用流行的 Ant-design3.0 组件库；
- 完整项目实现及模块结构拆分；

### 目录结构

```
├── build                   // webpack配置
│   ├── webpack.common.js   // webpack通用配置
│   ├── webpack.dev.js      // webpack开发环境配置
│   └── webpack.prod.js     // webpack生产环境配置
├── dist                    // 打包输出目录
├── public                  // 项目公开目录
├── src                     // src开发目录
│   ├── assets              // 静态资源
│   ├── components          // 公共组件
│   ├── layouts             // 页面布局组件
│   ├── modules             // 公共业务模块
│   ├── pages               // 具体业务页面
│   ├── routers             // 项目路由配置
│   ├── services            // axios服务等相关
│   ├── stores              // 全局公共 mobx store
│   ├── styles              // 存放公共样式
│   ├── utils               // 工具库/通用函数
│   ├── index.html          // 入口html页面
│   └── main.js             // 项目入口文件
├── .babelrc                // babel配置
├── .editorconfig           // 项目格式配置
├── .eslintrc.js            // ESLint配置
├── .gitignore              // git 忽略配置
├── .postcssrc.js           // postcss配置
├── package.json            // 依赖包配置
└── README.md               // 项目说明
```

## CLI 构建命令

### 克隆项目

```bash
git clone git@github.com:now1then/react-web-pro.git
```

### 初始化依赖配置

```bash
yarn install
```

### 开发环境 启动运行

```bash
yarn start
```

### 生产环境 打包构建

```bash
yarn build  //生产环境 打包构建

yarn build:report // 图形化分析打包文件大小；

yarn build:watch // 方便排查生产环境打包后文件的错误信息（文件source map）；
```

## More
