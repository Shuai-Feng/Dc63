import axios from 'axios';
import { Modal, message } from 'antd';
//https://fastmock.site/
interface ajaxOption {
  url: string;
  isMock?: boolean;
  data?: {
    params?: any;
    isLoading?: boolean;
  };
}

export default {
  ajax(option: ajaxOption) {
    let loading: any = document.getElementById('ajaxLoading');
    let baseUrl: string;
    if (option.isMock) {
      //使用mock服务器 使用假数据
      baseUrl =
        'https://www.fastmock.site/mock/509a94a34b36e0abc68f59b8e3863b69';
    } else {
      baseUrl =
        'https://www.fastmock.site/mock/47398fb813ab0edd784b0e37daf87476/dc63';
    }

    //使用fastmock进行模拟

    if (option.data && option.data.isLoading) {
      loading.style.display = 'none';
    } else {
      loading.style.display = 'block';
    }

    return new Promise((resovle, reject) => {
      axios({
        // /userAdd  /userDelete
        url: option.url,
        baseURL: baseUrl,
        timeout: 5000,
        //www.link32.com/api
        method: 'GET',
        params: (option.data && option.data.params) || '',
      })
        .then(response => {
          //判断一下当前请求状态码
          let res = response.data;
          if (response.status == 200) {
            if (res.code == 0) {
              resovle(res);
            } else {
              Modal.info({
                title: '出现了问题',
                content: res.messages || '出现了问题，不过不是你的问题',
              });
            }
          } else {
            reject(response.data);
          }
        })
        .catch(err => {
          message.info('出现了问题');
          message.info(err.message);
        })
        .finally(() => {
          loading.style.display = 'none';
        });
    });
  },
};
