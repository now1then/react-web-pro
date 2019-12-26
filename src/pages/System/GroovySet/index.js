import React, { useEffect, useContext } from 'react';
import { Row, Button, Table, Switch, Divider } from 'antd';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

import Store from './store';
import NewModal from './newModal';

import './style.less';

// groovy脚本管理
const GroovySet = () => {
  const pageStore = useContext(Store);

  // 组件加载获取数据
  useEffect(() => {
    // pageStore.qryTableDate();
  }, []);

  const columns = [
    {
      title: '脚本名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '脚本标识',
      dataIndex: 'no',
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'online',
      width: 90,
      render: (text, record) => (
        <Switch
          checkedChildren="启用"
          unCheckedChildren="停用"
          checked={text}
          loading={toJS(pageStore.onlineLoading)}
          onChange={type => pageStore.onlineChange(type, record)}
        />
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      width: 185,
    },
    {
      title: '修改时间',
      dataIndex: 'updateDate',
      width: 185,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: 160,
      render: (text, record) => (
        <Row type="flex" align="middle" className="operation">
          <Button type="link" onClick={() => pageStore.openModal({ type: 'show', no: record.no })}>
            查看
          </Button>
          <Divider type="vertical" />
          <Button
            type="link"
            disabled={record.online}
            onClick={() => pageStore.openModal({ type: 'edit', no: record.no })}
          >
            编辑
          </Button>
          <Divider type="vertical" />
          <Button
            type="link"
            disabled={record.online}
            onClick={() => pageStore.delOne(record.no)}
            loading={pageStore.recordLoding}
          >
            删除
          </Button>
        </Row>
      ),
    },
  ];

  return (
    <div className="page_groovy_set page-content">
      <Button type="primary" icon="plus" onClick={() => pageStore.openModal({ type: 'new' })}>
        新建
      </Button>
      <Row style={{ marginTop: 20, backgroundColor: '#fff' }}>
        <Table
          loading={pageStore.loading}
          columns={columns}
          dataSource={toJS(pageStore.tableData)}
          pagination={toJS(pageStore.pagination)}
          rowKey="no"
          scroll={{ y: 450 }}
        />
      </Row>
      <NewModal />
    </div>
  );
};
export default observer(GroovySet);
