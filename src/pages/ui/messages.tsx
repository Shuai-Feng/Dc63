import * as React from 'react';
import { Card,message,Button } from 'antd';

interface IMessagePageProps {
}

const MessagePage: React.FunctionComponent<IMessagePageProps> = (props) => {
  let handleOpen = (type:any)=>{
    message[type](`来自${type}框的提示信息`)
    //message.successs('来自successs')
  }
  return <div className="MessagePage">
        <Card>
          <div className="card-content">
              <Button style={{background:"#52C41A",color:"#fff"}} onClick={()=>{handleOpen('success')}} >成功</Button>
              <Button type='primary' onClick={()=>{handleOpen('info')}} >信息</Button>
              <Button type='danger' onClick={()=>{handleOpen('error')}} >错误</Button>
              <Button onClick={()=>{handleOpen('warning')}} >警告</Button>
          </div>
        </Card>

        {/* 如何自己封装一个 message */}
  </div> ;
};

export default MessagePage;
