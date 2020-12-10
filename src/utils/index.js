/*
 * @Author: nowThen
 * @Date: 2019-08-14 16:14:30
 */

const isDev = process.env.NODE_ENV === 'development'; // 开发 or 生产

// 匹配接口前缀
export function autoMatch(prefix) {
  let baseUrl = '';
  if (isDev) {
    // 开发环境 通过proxy配置转发请求；
    baseUrl = `/${prefix || 'testapi'}`;
  } else {
    // 生产环境 根据实际配置 根据 prefix 匹配url;
    // 配置来源 根据实际应用场景更改配置。(1.从全局读取；2.线上配置中心读取)
    // switch (prefix) {
    //   case 'baidu':
    //     baseUrl = window.LOCAL_CONFIG.baidu;
    //     break;
    //   case 'alipay':
    //     baseUrl = window.LOCAL_CONFIG.alipay;
    //     break;
    //   default:
    //     baseUrl = window.LOCAL_CONFIG.default;
    // }
  }
  return baseUrl;
}

export function checkStatus(response) {
  const status = response.status || -1000; // -1000 自己定义，连接错误的status
  if ((status >= 200 && status < 300) || status === 304) {
    // 如果http状态码正常，则直接返回数据
    return response.data;
  } else {
    let errorInfo = '';
    switch (status) {
      case -1:
        errorInfo = '远程服务响应失败,请稍后重试';
        break;
      case 400:
        errorInfo = '400：错误请求';
        break;
      case 401:
        errorInfo = '401：访问令牌无效或已过期';
        break;
      case 403:
        errorInfo = '403：拒绝访问';
        break;
      case 404:
        errorInfo = '404：资源不存在';
        break;
      case 405:
        errorInfo = '405：请求方法未允许';
        break;
      case 408:
        errorInfo = '408：请求超时';
        break;
      case 500:
        errorInfo = '500：访问服务失败';
        break;
      case 501:
        errorInfo = '501：未实现';
        break;
      case 502:
        errorInfo = '502：无效网关';
        break;
      case 503:
        errorInfo = '503：服务不可用';
        break;
      default:
        errorInfo = `连接错误`;
    }
    return {
      status,
      msg: errorInfo,
    };
  }
}

export function splitUrl(url) {
  const str = url.split('?')[1];
  const items = (str && str.split('&')) || [];
  let arr = {};
  const json = {};
  for (let i = 0; i < items.length; i += 1) {
    arr = items[i].split('=');
    json[arr[0]] = arr[1];
  }
  return json;
}
