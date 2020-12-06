import * as React from 'react';
import { Card,Alert,Spin,Switch,Icon } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

// https://ant.design/components/spin-cn/#header spin组件


interface ILoaingPageProps {
}

const LoaingPage: React.FunctionComponent<ILoaingPageProps> = (props) => {

    const [ spinState,setSpin ] = React.useState<boolean>(false);

  return <div className="LoadinPage">
      <Card title={'spin展示'}>
          <Spin size='small'/>
          <Spin size='default'/>
          <Spin size='large'/>
          <Spin indicator={<Icon type="loading" />}/>
      
      </Card>

      <Card title={<span>spin加载设置<Switch checked={spinState} onChange={(checked:boolean)=>{setSpin(checked)}} /></span>}>
            <Spin tip='正在加载' spinning={ spinState }>
                <Alert 
                    type='success'
                    message='alert message Title'
                    description='好好学习 高薪就业'
                />
            </Spin>
            <Spin tip='正在加载' spinning={ spinState }>
                <Alert 
                    type='warning'
                    message='alert message Title'
                    description='好好学习 高薪就业'
                />
            </Spin>
            <Spin tip='正在加载' spinning={ spinState }>
                <Alert 
                    type='error'
                    message='alert message Title'
                    description='好好学习 高薪就业'
                />
            </Spin>
            <Spin tip='正在加载' spinning={ spinState }>
                <Alert 
                    type='info'
                    message='alert message Title'
                    description='好好学习 高薪就业'
                />
            </Spin>
      </Card>
  </div> ;
};

export default LoaingPage;
