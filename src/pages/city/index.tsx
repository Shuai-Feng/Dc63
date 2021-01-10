import * as React from 'react';
import { Card, Button, Table, message } from 'antd';
//antd/es/组件名
import { ColumnProps } from 'antd/es/table';
import SFaxios from '@/utils/SFaxios';
import SFevent from '@/utils/SFevent';
//引入FilterForm
import FilterForm from './components/FilterForm';

interface ICityPageProps {}

const CityPage: React.FunctionComponent<ICityPageProps> = props => {
  //存放数据的state
  const [tableData, setTable] = React.useState<Array<any>>([]);

  React.useEffect(() => {
    requestList();

    //出发筛选框的时间
    SFevent.ee_on('filterRequest', (arg: any) => {
      requestList(arg);
      message.info('数据已筛选');
    });
  }, []);

  //请求列表
  const requestList = async (param?: any) => {
    let res: any = await SFaxios.ajax({
      url: '/open/city',
      data: {
        params: param,
      },
    });
    //获取数据
    let data: any[] = res.result.item_list;
    //每一行的列表数据有一个键值
    data.forEach((item, index) => {
      item.key = index;
    });
    setTable(data);
  };

  //表格列的构建
  const columns: Array<ColumnProps<{}>> = [
    {
      title: '城市Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '城市名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '用车模式',
      dataIndex: 'mode',
      key: 'mode',
    },
    {
      title: '授权加盟商',
      dataIndex: 'franchisee_name',
      key: 'franchisee_name',
    },
    {
      title: '城市管理员',
      dataIndex: 'city_admins',
      key: 'city_admins',
      render: arr => {
        return arr
          .map((item: any) => {
            return item.user_name;
          })
          .join(',');
      },
    },
    {
      title: '城市开通时间',
      dataIndex: 'open_time',
      key: 'open_time',
    },
    {
      title: '操作时间',
      dataIndex: 'update_time',
      key: 'update_time',
    },
    {
      title: '操作人',
      dataIndex: 'sys_user_name',
      key: 'sys_user_name',
    },
  ];

  return (
    <div className="CityPage">
      <Card style={{ marginBottom: 10 }}>
        <FilterForm />
      </Card>
      <Card>
        <Button type="primary">开通城市</Button>
      </Card>
      <Card>
        <Table columns={columns} dataSource={tableData} />
      </Card>
    </div>
  );
};

export default CityPage;
