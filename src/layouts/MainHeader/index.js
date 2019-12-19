import React from 'react';
import { Layout, Icon, Dropdown, Menu, Row, Col } from 'antd';
import { observer } from 'mobx-react';

import { appStores } from '@/stores/'
import './style.less';
// const globalStore = {};
// import userImg from '@/../public/nowthen.jpg';

const menu = (
  <Menu>
    <Menu.Item key="0">
      <Icon type="smile" />
      个人信息
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1">
      <Icon type="logout" />
      退出登录
    </Menu.Item>
  </Menu>
);

const MainHeader = (props) => {
  const { globalStore } = appStores();
  return (
    <Layout.Header className="main-header">
      <Row type="flex" style={{ paddingRight: 20 }}>
        <Col style={{ flex: 1 }}>
          <Icon
            className="trigger"
            type={globalStore.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={globalStore.toggleCollapsed}
          />
        </Col>
        <Col>
          <Dropdown overlay={menu} trigger={['click', 'hover']} placement="bottomCenter">
            <div className="user-info">
              <span className="user-img"></span>
              <span className="user-name">{globalStore.userInfo.loginName}</span>
            </div>
            {/* <span style={{ cursor: 'pointer', display: 'block' }}>
              <div><div /><span style={{ marginLeft: 12 }}>{globalStore.userInfo.loginName}</span></div>
            </span> */}
          </Dropdown>
        </Col>
      </Row>
    </Layout.Header>
  )
}

export default observer(MainHeader);
