/* eslint-disable import/extensions */
import React, { useState, useContext, useEffect } from 'react';
import { Form, Input, Button, DatePicker, message } from 'antd';
import moment from 'moment';

import { observer } from 'mobx-react';
// import { appStores } from '@/stores';

import Store from './store';

const SearchForm = ({ form, storeProps }) => {
  const pageStore = useContext(Store);
  // const { commonStore } = appStores();

  useEffect(() => {
    // commonStore.qrySupplierList({ all: true });
  }, []);

  const [endOpen, setEndOpen] = useState(false);
  const { getFieldDecorator, getFieldValue } = form;
  console.log(storeProps);

  const { searchParams = {} } = pageStore;

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        if (values.gmtEnd.diff(values.gmtBegin, 'days') > 90) {
          message.warning('查询日期的选择范围不能超过90天');
          return;
        }
        pageStore.searchParams.name = values.name;
        pageStore.searchParams.gmtBegin = values.gmtBegin.format('YYYY-MM-DD');
        pageStore.searchParams.gmtEnd = values.gmtEnd.format('YYYY-MM-DD');
        pageStore.qryTableDate();
        console.log(values);
      }
    });
  };

  const handleStartOpenChange = open => {
    if (!open) {
      setEndOpen(true);
    }
  };
  const handleEndOpenChange = open => {
    setEndOpen(open);
  };
  // 查询日期 -禁用开始日期
  const disabledStartDate = date => {
    const endDate = getFieldValue('gmtEnd');
    if (!date || !endDate) {
      return false;
    }
    // if (date.valueOf() < moment(new Date()).subtract(1, 'year')) {
    //   return true;
    // }
    return date.valueOf() > endDate.valueOf();
  };
  // 查询日期 -禁用结束日期
  const disabledEndDate = date => {
    const startDate = getFieldValue('gmtBegin');
    if (!date || !startDate) {
      return false;
    }
    if (date.valueOf() > new Date()) {
      return true;
    }
    return date.valueOf() < startDate.valueOf();
  };

  return (
    <Form
      layout="inline"
      onSubmit={handleSubmit}
      // style={{ paddingBottom: "20px" }}
    >
      <Form.Item label="项目名称">
        {getFieldDecorator('name', {
          initialValue: searchParams.name,
        })(<Input style={{ width: '200px', marginRight: '20px' }} placeholder="请填写" />)}
      </Form.Item>
      <Form.Item label="开始时间">
        {getFieldDecorator('gmtBegin', {
          initialValue: moment(searchParams.gmtBegin),
        })(
          <DatePicker
            style={{ width: '150px' }}
            allowClear={false}
            showToday
            // onChange={this.onStartChange}
            onOpenChange={handleStartOpenChange}
            disabledDate={disabledStartDate}
          />,
        )}
      </Form.Item>
      <Form.Item label="- 结束时间">
        {getFieldDecorator('gmtEnd', {
          initialValue: moment(searchParams.gmtEnd),
        })(
          <DatePicker
            style={{ width: '150px' }}
            showToday
            // onChange={this.onEndChange}
            open={endOpen}
            onOpenChange={handleEndOpenChange}
            disabledDate={disabledEndDate}
          />,
        )}
      </Form.Item>
      <Button style={{ float: 'right', margin: '4px 15px 0 0' }} type="primary" htmlType="submit">
        查询
      </Button>
    </Form>
  );
};

export default Form.create()(observer(SearchForm));
