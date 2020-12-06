import React,{ useState } from 'react';
import { Card,Modal,Button } from 'antd';
import './style.less';
interface IModalPageProps {
}

const ModalPage: React.FunctionComponent<IModalPageProps> = (props) => {
  const [ modalVisbel,setVisibel ] = useState({
    modal1:false,
    modal2:false,
    modal3:false,
    modal4:false
  });

  let { modal1,modal2,modal3,modal4 } = modalVisbel;


  let handleOpen =  (modalName:'modal1'|'modal2'|'modal3'|'modal4')=>{
    let config = {
      modal1:false,
      modal2:false,
      modal3:false,
      modal4:false
    }
    config[modalName] = true;
    setVisibel(config);
  }

  let handClose = ()=>{
    let config = {
      modal1:false,
      modal2:false,
      modal3:false,
      modal4:false
    }
    setVisibel(config);
  }
  let handleStateOpen = (state:"success"|"info"|"error"|"warning")=>{
      Modal[state]({
        title:state,
        content:state+'出现了'})
  }
  return <div className="ModalPage">
       <Card>
        <div className="card-content">
            <Button onClick={()=>{handleOpen('modal1')}} >模态框显示</Button>
            <Button onClick={()=>{handleOpen('modal2')}} >没有页脚de模态框</Button>
            <Button onClick={()=>{handleOpen('modal3')}} >自定义确定取消的模态框</Button>
            <Button onClick={()=>{handleOpen('modal4')}} >据顶部20像素的模态框</Button>
          </div>
       </Card>
       <Card>
        <div className="card-content">
            <Button  onClick={()=>{handleStateOpen('success')}} >成功success</Button>
            <Button type='primary'  onClick={()=>{handleStateOpen('info')}} >信息info</Button>
            <Button   onClick={()=>{handleStateOpen('warning')}} >警告warning</Button>
            <Button type='danger'  onClick={()=>{handleStateOpen('error')}} >错误error</Button>
          </div>
       </Card>
       <Modal
        title='壹号模态框'
        visible={modal1}
        onCancel={()=>{handClose()}}
        >
          壹号模态框
       </Modal>
       <Modal
        title='没有页脚de模态框'
        visible={modal2}
        onCancel={()=>{handClose()}}
        footer={null}
        >
          没有页脚de模态框
       </Modal>
       <Modal
        title='自定义确定取消的模态框'
        visible={modal3}
        onCancel={()=>{handClose()}}
        okText={'成功了😊'}
        cancelText={'👴觉得不行'}
        >
          没有页脚de模态框
       </Modal>
       <Modal
        title='据顶部20像素的模态框'
        style={{top:20}}
        visible={modal4}
        onCancel={()=>{handClose()}}
        okText={'确定'}
        cancelText={'取消'}
        >
          没有页脚de模态框
       </Modal>
  </div> ;
};

export default ModalPage;
