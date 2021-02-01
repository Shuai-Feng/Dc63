import * as React from 'react';
import { Card, Button, Table, Form, message } from 'antd';
import { ColumnProps, TableRowSelection } from 'antd/es/table';
import './style.less';
import SFaxios from '@/utils/SFaxios';
import UserFilterForm from './components/UserFilterForm';
import SFevent from '@/utils/SFevent';

/*
    /user/list 员工列表
    /user/edit 编辑员工
    /user/delete 删除员工
    /user/add 添加员工
*/

interface IUserPageProps {}

const UserPage: React.FunctionComponent<IUserPageProps> = props => {
  const [tableData, setTable] = React.useState<any[]>([]);

  const [tableKey, setKey] = React.useState<string[] | number[]>([]);
  const [tabelRow, setRow] = React.useState<object[]>([]);

  const columns: ColumnProps<{}>[] = [
    {
      title: '用户Id',
      dataIndex: 'id',
    },
    {
      title: '用户性别',
      dataIndex: 'sex',
      render: sex => {
        return sex == 1 ? '男' : '女';
      },
    },
    {
      title: '状态',
      dataIndex: 'state',
      render: state => {
        return {
          '1': '资深工程师',
          '2': '高级工程师',
          '3': '中级工程师',
          '4': '产品经理',
          '5': 'UI',
        }[state];
      },
    },
    {
      title: '爱好',
      dataIndex: 'interest',
      render: state => {
        return {
          '1': '打篮球',
          '2': '踢足球',
          '3': '烹饪',
          '4': '健身',
          '5': '音乐',
        }[state];
      },
    },
    {
      title: '生日',
      dataIndex: 'birthday',
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '入职时间',
      dataIndex: 'time',
    },
  ];

  //请求员工数据
  const requstList = async (params?: any) => {
    try {
      let data: any = await SFaxios.ajax({
        url: '/user/list',
        data: {
          params,
        },
      });
      data = data.result.item_list;
      data.forEach((item: any, index: number) => {
        item.key = index;
      });
      setTable(data);
    } catch (e) {
      message.info(e.message);
    }
  };

  const rowSelectTion: TableRowSelection<{}> = {
    type: 'radio',
    onChange: (selectKey, selectRow) => {
      setRow(selectRow);
      setKey(selectKey);
    },
    selectedRowKeys: tableKey,
  };

  React.useEffect(() => {
    requstList();
    SFevent.ee_on('handleUserFilter', (formData: Object) => {
      //触发handleUserFilter
      requstList(formData);
      message.success('查询成功');
    });
  }, []);

  return (
    <div className="UserPage">
      <Card>
        <UserFilterForm />
      </Card>
      <Card>
        <div className="content-wrapper">
          <Button icon={'plus'} type="primary">
            创建员工
          </Button>
          <Button icon={'edit'} type="primary">
            编辑员工
          </Button>
          <Button icon={'copy'} type="primary">
            员工详情
          </Button>
          <Button icon={'delete'} type="danger">
            删除员工
          </Button>
        </div>
      </Card>
      <Card>
        <Table
          columns={columns}
          dataSource={tableData}
          rowSelection={rowSelectTion}
        />
      </Card>
    </div>
  );
};

export default UserPage;
