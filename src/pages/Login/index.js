/* eslint-disable import/extensions */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Checkbox, Button, Icon, message } from 'antd';
import { observer } from 'mobx-react';

import { appStores } from '@/stores';
import './style.less';

const LoginPage = props => {
  const {
    form: { getFieldDecorator },
  } = props;

  const history = useHistory();
  const { globalStore } = appStores();

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('登录信息 ', values);
        message.success('登录成功，即将跳转...', 2);
        setTimeout(() => {
          history.push('/');
        }, 2000);
      }
    });
  };

  return (
    <div className="page-login">
      <Form onSubmit={handleSubmit} className="login-form">
        <div className="login-title">欢迎登录 {globalStore.appTitle}</div>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名！' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码！' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>记住我</Checkbox>)}
          <a className="login-form-forgot" href="">
            忘记密码
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Form.create({ name: 'login' })(observer(LoginPage));
