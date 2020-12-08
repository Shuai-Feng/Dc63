import * as React from 'react';
import { Card,notification,Button } from 'antd';
import { IconType,NotificationPlacement } from 'antd/es/notification';
import './style.less';

interface INotifyPageProps {
}

const NotifyPage: React.FunctionComponent<INotifyPageProps> = (props) => {
    let notifiyOpen = (type:IconType)=>{
        notification[type]({
            message:"notification title"
        })
    }
    let notifiyPlaceOpen = (type:IconType,placement:NotificationPlacement)=>{
        notification[type]({
            message:"notification title",
            placement
        })
    }
  return <div className="NotifyPage">
      <Card title="不带位置的通知">
          <div className="card-content">
              <Button onClick={()=>{notifiyOpen('success')}} style={{background:"#52C41A",color:"#fff"}}>success</Button>
              <Button onClick={()=>{notifiyOpen('info')}} type='primary'>info</Button>
              <Button onClick={()=>{notifiyOpen('warning')}} >warning</Button>
              <Button onClick={()=>{notifiyOpen('error')}} type='danger'>error</Button>
              <Button onClick={()=>{notifiyOpen('warning')}} >warning</Button>
              <Button onClick={()=>{notifiyOpen('error')}} type='danger'>error</Button>
          </div>
      </Card>
      <Card title="带位置的通知">
          <div className="card-content">
              <Button onClick={()=>{notifiyPlaceOpen('success','topRight')}} style={{background:"#52C41A",color:"#fff"}}>success</Button>
              <Button onClick={()=>{notifiyPlaceOpen('info','topLeft')}} type='primary'>info</Button>
              <Button onClick={()=>{notifiyPlaceOpen('warning','bottomLeft')}} >warning</Button>
              <Button onClick={()=>{notifiyPlaceOpen('error','bottomRight')}} type='danger'>error</Button>
          </div>
      </Card>
  </div> ;
};

export default NotifyPage;
