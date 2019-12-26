import React from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';

export default () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，你访问的页面不存在！"
      extra={
        <Link to="/">
          <Button type="primary">返回首页</Button>
        </Link>
      }
    />
  );
};
