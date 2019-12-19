import { observable, action } from "mobx";
import { message } from "antd";
// import request from '@/utils/request';
// import request1 from '@/utils/newRequest';

export default class CommonStore {
  @observable loading = false;

  @observable supplierList = [];
  @observable serviceList = [];
  @observable scriptList = [];

  // // 厂商列表
  // @action.bound
  // async qrySupplierList(params = {}) {
  //   this.loading = true;
  //   const res = await request1({
  //     url: '/testapi/supplier/list',
  //     method: 'get',
  //     params: params
  //   })
  //   if (res.success) {
  //     this.supplierList = res.data || [];
  //   }
  //   this.loading = false;
  // }

  // // 三方服务列表
  // @action.bound
  // async qryServiceList(params = {}) {
  //   this.loading = true;
  //   const res = await request1({
  //     url: '/testapi/service/list',
  //     method: 'get',
  //     params: params
  //   })
  //   if (res.success) {
  //     this.serviceList = res.data || [];
  //   }
  //   this.loading = false;
  // }
  // // 脚本列表
  // @action.bound
  // async qryScriptList(params = {}) {
  //   this.loading = true;
  //   const res = await request1({
  //     url: '/testapi/script/list',
  //     method: 'get',
  //     params: params
  //   })
  //   if (res.success) {
  //     this.scriptList = res.data || [];
  //   }
  //   this.loading = false;
  // }
}
