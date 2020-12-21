import * as React from 'react';
import { Card,Table,message } from 'antd';
import { ColumnProps } from 'antd/es/table';
import SFaxios from '@/utils/SFaxios';

interface IHightPageProps {
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

const HightPage: React.FunctionComponent<IHightPageProps> = (props) => {

  const tableColumn:ColumnProps<tColumn>[] = [
    {
        title:'订单Id',
        dataIndex:'id',
        key:'id'
    },
    {
        title:'订单编号',
        dataIndex:'order_sn',
        key:'order_sn',
        sorter:(a,b)=>{
          return a.order_sn.length - b.order_sn.length;
        }

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
        key:'mobile',
        sorter:(a:any,b:any)=>{
          return a.mobile - b.mobile;
        }
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
    }
  ]
  const tableColumn2:ColumnProps<tColumn>[] = [
    {
        title:'订单Id',
        dataIndex:'id',
        key:'id',
        width:100,
        fixed:'left'
    },
    {
        title:'订单编号',
        dataIndex:'order_sn',
        key:'order_sn',
        fixed:'left',
        sorter:(a,b)=>{
          return a.order_sn.length - b.order_sn.length;
        }

    },
    {
        title:'车辆编号',
        dataIndex:'bike_sn',
        key:'bike_sn'
    },
    {
        title:'用户编号',
        dataIndex:'user_id',
        key:'user_id',
        width:100
    },
    {
        title:'手机号',
        dataIndex:'mobile',
        key:'mobile',
        sorter:(a:any,b:any)=>{
          return a.mobile - b.mobile;
        },
        width:100
    },
    {
        title:'距离',
        dataIndex:'distance',
        key:'distance',
        width:100
    },
    {
      title:'开始时间',
      dataIndex:'start_time',
      key:'start_time',
      width:100
    },
    {
      title:'结束时间',
      dataIndex:'end_time',
      key:'end_time',
      width:100
    },
    {
      title:'结束时间',
      dataIndex:'end_time',
      key:'end_time',
      width:100
    },
    {
      title:'结束时间',
      dataIndex:'end_time',
      key:'end_time',
      width:100
    },
    {
      title:'结束时间',
      dataIndex:'end_time',
      key:'end_time',
      width:100
    },
    {
      title:'结束时间',
      dataIndex:'end_time',
      key:'end_time',
      width:80,
      fixed:'right'
    }
  ]
  const [ tableData,setTable ] = React.useState<tColumn[]>([])
  //请求数据的方法
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
      message.info(e.message)
    }
}

  //compomentDidMount
  React.useEffect(()=>{
    requestList();
  },[])

  //通过scroll 给表格指定一个滚动范围
  return <div className="HightPage">
    <Card title='横轴固定'>
        <Table
          columns={tableColumn2}
          dataSource={tableData}
          scroll={{x:1600}}
        />
    </Card>
    {/* 对横向宽度进行一个设置 */}
    <Card title='表头固定'>
        <Table
          columns={tableColumn}
          dataSource={tableData}
          scroll={{y:200}}
        />
    </Card>
    <Card title='表格列排序'>
        <Table
          columns={tableColumn}
          dataSource={tableData}
        />
    </Card>
  </div> ;
};

export default HightPage;
