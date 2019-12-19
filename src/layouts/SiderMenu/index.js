import React from 'react'
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Layout, Menu, Icon, Row } from 'antd';

import { appStores } from '@/stores';
import './style.less';

const SiderMenu = (props) => {
  const { globalStore } = appStores();
  return (
    <Layout.Sider trigger={null} collapsible collapsed={globalStore.collapsed} className="main-left-slider">
      <Link to="/">
        <Row type="flex" align="middle" className="main-logo">
          <Icon type="car" style={{ color: '#13e367' }} />
          {!globalStore.collapsed && <span className="app-name">{globalStore.appTitle}</span>}
        </Row>
      </Link>
      <Menu
        mode="inline"
        theme="dark"
        style={{ paddingLeft: 0, marginBottom: 0 }}
        className="main-menu"
      >
        <Menu.SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="mail" />
              <span>Navigation One</span>
            </span>
          }
        >
          <Menu.Item key="1">Option 1</Menu.Item>
          <Menu.Item key="2">Option 2</Menu.Item>
          <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="appstore" />
              <span>Navigation Two</span>
            </span>
          }
        >
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <Menu.SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </Menu.SubMenu>
        </Menu.SubMenu>
      </Menu>
    </Layout.Sider>
  );
}

export default observer(SiderMenu);
