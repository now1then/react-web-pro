import React, { useState, useContext, useEffect } from 'react';
import { Form, Input, Button, DatePicker, message } from 'antd';
import dayjs from 'dayjs';

import { observer } from 'mobx-react';
// import { appStores } from '@/stores';

import Store from './store';

const SearchForm = () => {
  const pageStore = useContext(Store);
  // const { commonStore } = appStores();

  useEffect(() => {
    // commonStore.qrySupplierList({ all: true });
  }, []);

  const [endOpen, setEndOpen] = useState(false);
  const [form] = Form.useForm();
  const { getFieldValue } = form;

  const { searchParams = {} } = pageStore;

  const handleSubmit = (values) => {
    if (values.gmtEnd.diff(values.gmtBegin, 'days') > 90) {
      message.warning('查询日期的选择范围不能超过90天');
      return;
    }
    pageStore.searchParams.name = values.name;
    pageStore.searchParams.gmtBegin = values.gmtBegin.format('YYYY-MM-DD');
    pageStore.searchParams.gmtEnd = values.gmtEnd.format('YYYY-MM-DD');
    pageStore.qryTableDate();
    // console.log(values);
  };

  const handleStartOpenChange = (open) => {
    if (!open) {
      setEndOpen(true);
    }
  };
  const handleEndOpenChange = (open) => {
    setEndOpen(open);
  };
  // 查询日期 -禁用开始日期
  const disabledStartDate = (date) => {
    const endDate = getFieldValue('gmtEnd');
    if (!date || !endDate) {
      return false;
    }
    // if (date.valueOf() < dayjs(new Date()).subtract(1, 'year')) {
    //   return true;
    // }
    return date.valueOf() > endDate.valueOf();
  };
  // 查询日期 -禁用结束日期
  const disabledEndDate = (date) => {
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
    <Form form={form} layout="inline" onFinish={handleSubmit}>
      <Form.Item label="项目名称" name="name" initialValue={searchParams.name}>
        <Input style={{ width: '200px', marginRight: '20px' }} placeholder="请填写" />
      </Form.Item>
      <Form.Item label="开始时间" name="gmtBegin" initialValue={dayjs(searchParams.gmtBegin)}>
        <DatePicker
          style={{ width: '150px' }}
          allowClear={false}
          showToday
          // onChange={this.onStartChange}
          onOpenChange={handleStartOpenChange}
          disabledDate={disabledStartDate}
        />
      </Form.Item>
      <Form.Item label="- 结束时间" name="gmtEnd" initialValue={dayjs(searchParams.gmtEnd)}>
        <DatePicker
          style={{ width: '150px' }}
          showToday
          // onChange={this.onEndChange}
          open={endOpen}
          onOpenChange={handleEndOpenChange}
          disabledDate={disabledEndDate}
        />
      </Form.Item>
      <Button style={{ float: 'right', margin: '0px 15px 0 0' }} type="primary" htmlType="submit">
        查询
      </Button>
    </Form>
  );
};

export default observer(SearchForm);
