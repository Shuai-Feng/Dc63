import  React,{ useState } from 'react';
import { Card,Button } from 'antd';
import './style.less';


//结构出按钮组
  const ButtonGroup = Button.Group;

interface IButtonPageProps {

}

const ButtonPage: React.FunctionComponent<IButtonPageProps> = (props) => {

  const [ btn_loading , setLoading ] = useState<boolean>(true);
  //判断按钮大小
  const [ btn_size , setSize ] = useState<'large' | 'small' |'default'|undefined>('small');

  return <div className="ButtonPage">
      <Card
        title='基础按钮'
      >
        <div className="card-content">
          <Button type="primary">我是按钮</Button>
          <Button >我是按钮</Button>
          <Button type="dashed">我是按钮</Button>
          <Button type="danger">我是按钮</Button>
          <Button type="link">我是按钮</Button>
        </div>
      </Card>
      <Card
        title='带图标的按钮'
      >
        <div className="card-content">
          <Button icon="poweroff" type="primary">不忘初心</Button>
          <Button >不忘初心</Button>
          <Button icon="left"  type="dashed">不忘初心</Button>
          <Button icon="right"  type="danger">不忘初心</Button>
          <Button icon="edit"  type="link">不忘初心</Button>
        </div>
      </Card>
      <Card
        title='带图标的按钮'
      >
        <div className="card-content">
          <Button loading={btn_loading}  type="primary">带loading的按钮</Button>
          <Button loading={btn_loading}  >带loading的按钮</Button>
          <Button loading={btn_loading}  type="dashed">带loading的按钮</Button>
          <Button loading={btn_loading}  type="danger">带loading的按钮</Button>
          <Button loading={btn_loading}  type="link">带loading的按钮</Button>
          <Button onClick={()=>{setLoading(!btn_loading)}}  type="link">切换状态</Button>
        </div>
      </Card>
      <Card
        title='按钮组'
      >
        <ButtonGroup>
          <Button>1</Button>
          <Button>2</Button>
          <Button>3</Button>
          <Button>4</Button>
        </ButtonGroup>
      </Card>
      <Card
        title='按钮大小'
      >
        <ButtonGroup>
          <Button size={btn_size} onClick={()=>{setSize('large')}} >large</Button>
          <Button size={btn_size} onClick={()=>{setSize('default')}} >default</Button>
          <Button size={btn_size} onClick={()=>{setSize('small')}} >small</Button>
        </ButtonGroup>
      </Card>


  </div> ;
};

export default ButtonPage;
