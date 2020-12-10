import React, { lazy } from 'react';
import {
  HomeOutlined,
  SettingFilled,
  SmileOutlined,
  FormOutlined,
  UserOutlined,
  StarOutlined,
  WarningOutlined,
  FrownOutlined,
} from '@ant-design/icons';

import BasicLayout from '@/layouts/BasicLayout';
import BlankLayout from '@/layouts/BlankLayout';

const config = [
  {
    path: '/',
    component: BlankLayout, // 空白页布局
    childRoutes: [
      // 子菜单路由
      {
        path: '/login', // 路由路径
        name: '登录页', // 菜单名称 (不设置,则不展示在菜单栏中）
        component: lazy(() => import('@/pages/Login')), // 懒加载 路由组件
      },
      {
        path: '/',
        // exact: true,
        component: BasicLayout, // 基本布局
        childRoutes: [
          {
            path: '/welcome',
            name: '欢迎页',
            icon: <SmileOutlined />,
            component: lazy(() => import('@/pages/Welcome')),
          },
          {
            path: '/home',
            name: 'home主页',
            icon: <HomeOutlined />,
            component: lazy(() => import('@/pages/Home')),
          },
          {
            path: '/formDemo',
            name: '表单演示',
            icon: <FormOutlined />,
            component: lazy(() => import('@/pages/FormDemo')),
          },
          {
            path: '/system',
            name: '系统管理',
            icon: <SettingFilled />,
            childRoutes: [
              {
                path: '/system/groovySet',
                name: 'Groovy脚本管理',
                component: lazy(() => import('@/pages/System/GroovySet')),
              },
              {
                path: '/system/user',
                name: '用户配置',
                icon: <UserOutlined />,
                component: lazy(() => import('@/pages/System/User')),
              },
              {
                path: '/system/star',
                name: '个人中心',
                icon: <StarOutlined />,
                component: lazy(() => import('@/pages/System/Star')),
              },
            ],
          },
          {
            path: '/exception',
            name: '异常页',
            // exact: true,
            icon: <WarningOutlined />,
            childRoutes: [
              {
                path: '/exception/403',
                name: '403',
                icon: <FrownOutlined />,
                component: lazy(() => import('@/pages/Exception/403')),
              },
              {
                path: '/exception/404',
                name: '404',
                exact: true,
                icon: <FrownOutlined />,
                component: lazy(() => import('@/pages/Exception/404')),
              },
              {
                path: '/exception/500',
                name: '500',
                icon: <FrownOutlined />,
                component: lazy(() => import('@/pages/Exception/500')),
              },
            ],
          },
          { path: '/', exact: true, redirect: '/welcome' },
          { path: '*', exact: true, redirect: '/exception/404' },
        ],
      },
    ],
  },
];

export default config;
