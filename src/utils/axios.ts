import axios from 'axios';
import { Modal,message } from 'antd';

interface ajaxOption {
    url:string,
    isMock?:boolean,
    data?:{
        params?:any,
        isLoading?:boolean
    }
}

export default {
    axios(option:ajaxOption){
      
        let loading:any = document.getElementById('ajaxLoading');
        let baseUrl:string;

        if(option.isMock){
            //使用mock服务器 使用假数据
            baseUrl = '测试用接口'
        }else{
            baseUrl = '上线用的接口'
        }

        //使用fastmock进行模拟

        if(option.data && !option.data.isLoading){
            loading.style.display = 'none'
        }else{
            loading.style.display = 'block'
        }
        
        return new Promise((resove,reject)=>{
            axios({
                // /userAdd  /userDelete
                url:option.url,
                baseURL:baseUrl,
                //www.link32.com/api
                method:'GET',
                params:(option.data && option.data.params) || ''
            })
            .then(response=>{
                //判断一下当前请求状态码
                let res = response.data;
                if(res.status == 200){
                    
                }else{
                    reject(response.data)
                }
            })
            .catch(error=>{
                message.info('出现了问题'+err.message)
                loading.style.display = 'none'
            })
        })
    }
}