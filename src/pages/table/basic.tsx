import * as React from 'react';
import { Card,message,notification,Table  } from 'antd';
import { ColumnProps} from 'antd/es/table';
import SFaxios from '@/utils/SFaxios';

interface IBasicPageProps {
}

interface tColumn {
  id:string,
  order_sn:string,
  bike_sn:string,
  user_id:string,
  mobile:string,
  distance:number,
  start_time:number,
  end_time:number,
  key?:any
}

const BasicPage: React.FunctionComponent<IBasicPageProps> = (props) => {

  const [ tableData,setTable ] = React.useState<tColumn[]>([])
  //设置表格列的属性

  const [ selectKey,setRowKey ] = React.useState<Array<any>>([])

  const [ mutiKey,setMuti ] = React.useState<Array<any>>([])

  const tableColumn:ColumnProps<tColumn>[] = [
    {
        title:'订单Id',
        dataIndex:'id',
        key:'id'
    },
    {
        title:'订单编号',
        dataIndex:'order_sn',
        key:'order_sn'
    },
    {
        title:'车辆编号',
        dataIndex:'bike_sn',
        key:'bike_sn'
    },
    {
        title:'用户编号',
        dataIndex:'user_id',
        key:'user_id'
    },
    {
        title:'手机号',
        dataIndex:'mobile',
        key:'mobile'
    },
    {
        title:'距离',
        dataIndex:'distance',
        key:'distance'
    },
    {
      title:'开始时间',
      dataIndex:'start_time',
      key:'start_time'
    },
    {
      title:'结束时间',
      dataIndex:'end_time',
      key:'end_time'
    },
  ]

  //获取远程数据
  const requestList = async ()=>{
      try{
        let res:any = await SFaxios.ajax({url:'/order/list'})
        // resolve
        let data = res.result.item_list;
        //让每一条记录 有位移的键值
        data.forEach((item:tColumn,index:any) => {
          item.key = index
        });
        setTable(data)
      }catch(e){
        message.info('出现了问题，不过不是你的问题')
        message.info(e.messsage)
      }
  }

  //compomentDidMount
    React.useEffect(()=>{
      requestList();
  },[])

  //componentDidUpDate


  return <div className="BasicPage">
      <Card title='多选表格组件'>
          <Table
              columns={tableColumn}
              dataSource={tableData}
              rowSelection={{
                type:'checkbox',
                selectedRowKeys:mutiKey,
                onChange:(selectkeys,selectRows)=>{
                  console.log(selectkeys,selectRows)
                  setMuti(selectkeys)
                }
              }}
          />
      </Card>
      <Card title='单选按钮表格'>
          <Table
              columns={tableColumn}
              dataSource={tableData}
              rowSelection={{
                type:'radio',
                selectedRowKeys:selectKey,
                onChange:(selectRowkey,selectRows:any)=>{
                   setRowKey(selectRowkey)
                   notification.info({
                     message:'订单信息',
                     description:`订单${selectRows[0].id} 结束时间${selectRows[0].end_time}`
                   })
                }
              }}
              onRow={record=>{
                return {
                  onClick:()=>{
                    setRowKey([record.key])
                  }
                }
              }}
          />
      </Card>
      <Card title='基础表格组件'>
          <Table
              columns={tableColumn}
              dataSource={tableData}
          />
      </Card>
  </div> ;
};

export default BasicPage;
