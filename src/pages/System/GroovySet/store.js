/* eslint-disable import/extensions */
import { createContext } from 'react';
import { observable, action, computed } from 'mobx';
import { message } from 'antd';
import request from '@/services/newRequest';

const demoData = [
  {
    name: '脚本1',
    no: 'jiaoben1',
    online: false,
    createDate: '2019-11-11',
    updateDate: '2019-12-12',
    content: 'test',
  },
];

class GroovySetStore {
  @observable tableData = demoData;

  @observable loading = false;

  @observable onlineLoading = false;

  @observable newModalVisible = false;

  @observable recordLoding = false;

  @observable newLoading = false;

  @observable modalType = 'new'; // edit, new, show

  @observable modalNo = ''; // 弹窗 标识

  @observable modalData = {}; // 弹窗的数据

  @observable pagination = {
    size: 'small',
    pageSize: 10,
    current: 1,
    total: 0,
    showSizeChanger: true,
    onChange: (currentP, size) => {
      this.qryTableDate(currentP, size);
    },
    onShowSizeChange: (currentP, size) => {
      this.qryTableDate(currentP, size);
    },
    showTotal: totalP => `共 ${totalP} 条记录`,
  };

  @computed get ModalTitle() {
    let res = 'Groovy脚本';
    if (this.modalType === 'edit') {
      res = `编辑${res}`;
    } else if (this.modalType === 'new') {
      res = `新增${res}`;
    }
    return res;
  }

  @action.bound setData(data = {}) {
    Object.entries(data).forEach(item => {
      this[item[0]] = item[1];
    });
  }

  // 弹窗
  @action.bound openModal(data = {}) {
    this.newModalVisible = true;
    this.modalType = data.type;
    this.modalNo = data.no;
    if (data.type === 'edit' || data.type === 'show') {
      this.qryDetail(data.no);
    } else {
      this.modalData = {};
    }
  }

  // 列表数据
  @action.bound
  async qryTableDate(page = 1, size = this.pagination.pageSize) {
    this.loading = true;
    const res = await request({
      url: '/script/page',
      method: 'post',
      data: { page, size },
    });

    if (res.success) {
      const resData = res.data || {};
      this.tableData = resData.listData || [];
      this.pagination.total = resData.total;
      this.pagination.current = page;
      this.pagination.pageSize = size;
    }
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

  // 状态切换
  @action.bound
  async onlineChange(type, record) {
    this.onlineLoading = true;
    const res = await request({
      url: '/script/online',
      method: 'post',
      data: {
        no: record.no,
        online: type,
      },
    });
    if (res.success) {
      message.success('状态切换成功！');
      this.qryTableDate();
    }
    this.onlineLoading = false;
  }

  // 新建脚本
  @action.bound
  async addEdit(data) {
    this.newLoading = true;
    // const res = await request.post('/testapi/supplier/add', {
    //   body: data
    // })
    const res = await request({
      url: '/script/add',
      // url: '/supplier/add',
      method: 'post',
      data,
    });
    if (res.success) {
      message.success('新建成功！');
      this.newModalVisible = false;
      this.qryTableDate();
    }
    this.newLoading = false;
  }

  // 修改脚本
  @action.bound
  async modEdit(data) {
    this.newLoading = true;
    const res = await request({
      url: '/script/edit',
      method: 'post',
      data,
    });
    if (res.success) {
      message.success('修改成功！');
      this.newModalVisible = false;
      this.qryTableDate();
    }
    this.newLoading = false;
  }

  // 删除
  @action.bound
  async delOne(data) {
    this.recordLoding = true;
    const res = await request({
      url: '/script/delete',
      // url: '/supplier/add',
      method: 'post',
      data: { no: data },
    });
    if (res.success) {
      message.success('删除成功！');
      this.qryTableDate();
    }
    this.recordLoding = false;
  }

  @action.bound
  async qryDetail(data) {
    this.loading = true;
    const res = await request({
      url: '/script',
      method: 'post',
      data: { no: data },
    });

    if (res.success) {
      this.modalData = res.data || {};
    }
    this.loading = false;
  }
}

export default createContext(new GroovySetStore());
