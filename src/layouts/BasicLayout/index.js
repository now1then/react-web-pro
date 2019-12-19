import React from "react";
import { Layout } from "antd";
import { renderRoutes } from "react-router-config";

import SiderMenu from "../SiderMenu";
import MainHeader from "../MainHeader";
import MainFooter from "../MainFooter";

import "./style.less";

const BasicLayout = props => {
  console.log(props);
  return (
    <Layout className="main-layout">
      <SiderMenu></SiderMenu>
      <Layout className="main-layout-right">
        <MainHeader></MainHeader>
        <Layout.Content className="main-layout-content">
          {/* {renderRoutes(props.route.routes)} */}
          {props.children}
          {/* <MainFooter></MainFooter> */}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
