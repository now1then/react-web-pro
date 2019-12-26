import { observable, action } from 'mobx';
// import request from '@/services/request';

export default class GlobalStore {
  @observable appTitle = '服务管理平台';

  @observable collapsed = false; // 菜单收起展开

  @observable userInfo = {
    // 当前用户信息
    loginName: 'nowThen',
  };

  @action.bound toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }

  @action.bound setData(data = {}) {
    Object.entries(data).forEach(item => {
      this[item[0]] = item[1];
    });
  }
}
