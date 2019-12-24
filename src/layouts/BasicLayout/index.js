import React from "react";
import { Layout, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { renderRoutes } from "react-router-config";

import SiderMenu from "../SiderMenu";
import MainHeader from "../MainHeader";
import MainFooter from "../MainFooter";

import "./style.less";

const BasicLayout = ({ route, children }) => {
  console.log(route, children);
  return (
    <Layout className="main-layout">
      <SiderMenu routes={route.childRoutes} />
      <Layout className="main-layout-right">
        <MainHeader></MainHeader>
        <Layout.Content className="main-layout-content">
          {/* {renderRoutes(props.route.routes)} */}
          {children}
          {/* <MainFooter></MainFooter> */}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
