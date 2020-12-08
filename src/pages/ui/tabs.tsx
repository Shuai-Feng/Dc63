import * as React from 'react';
//https://3x.ant.design/components/tabs-cn/#header
import { Card,Tabs,Icon,message } from 'antd';
const { TabPane } = Tabs;

interface ITabsPageProps {
}

const TabsPage: React.FunctionComponent<ITabsPageProps> = (props) => {

    const [ targetKey,setTagetKey ] = React.useState(1);

    const [tabPanel,setTabPanel] = React.useState([
        {
            title:'题目1',
            content:'内容1',
            key:'1'
        },
        {
            title:'题目2',
            content:'内容2',
            key:'2'
        },
        {
            title:'题目3',
            content:'内容31',
            key:'3'
        }
    ]);

    let addPanel = ()=>{
        const targetkey = (+ new Date()).toString();
        tabPanel.push({
            title:'new tab',
            content:'this is content message',
            key:targetkey
        })

        setTabPanel(tabPanel.slice())
    }

    let deletePanel = (targetKey:any)=>{
        let newPanel;
        if(tabPanel.length <=1) {
            message.info('别点啦，只剩一个啦');
            return
        }

        newPanel = tabPanel.filter(panel=>{
            return panel.key !== targetKey;
        })
        setTabPanel(newPanel);
    }

  return <div className="Tabspage">
      <Card title='基础的TabPanel'>
          <Tabs defaultActiveKey='1'>
            <TabPane tab={'tab1'} key='1'>tab1</TabPane>
            <TabPane tab={'tab2'} key='2'>tab2</TabPane>
            <TabPane tab={'tab3'} key='3'>tab3</TabPane>    
          </Tabs>
      </Card>
      <Card title='带icon的tab菜单'>
          <Tabs defaultActiveKey='1' >
            <TabPane tab={<span><Icon type="up-circle" /> tab1</span>} key='1'>tab1</TabPane>
            <TabPane tab={<span><Icon type="caret-right" /> tab2</span>} key='2'>tab2</TabPane>
            <TabPane tab={<span><Icon type="vertical-right" /> tab3</span>} key='3'>tab3</TabPane>    
          </Tabs>
      </Card>
      <Card title='带可编辑的的tab菜单'>
          <Tabs defaultActiveKey='1' type='editable-card' tabPosition='left'
            onEdit={(targetkey,action)=>{
                if ( action == 'add' ){
                    addPanel();
                }
                if ( action == 'remove' ){
                    deletePanel(targetkey)
                }
            }}
          >
                {
                    tabPanel.map(item=>{
                        return <TabPane tab={item.title} key={item.key}>{item.content}</TabPane>
                    })
                }
          </Tabs>
      </Card>
  </div> ;
};

export default TabsPage;
