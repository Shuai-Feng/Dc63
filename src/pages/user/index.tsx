import * as React from 'react';
import { Card, Button, Table, message, Modal } from 'antd';
import { ColumnProps, TableRowSelection } from 'antd/es/table';
import './style.less';
import SFaxios from '@/utils/SFaxios';
import SFevent from '@/utils/SFevent';
import UserFilterForm from './components/UserFilterForm';
import OperateForm from './components/OperateForm';

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
  const [tabelRow, setRow] = React.useState<any[]>([]);
  const [visible, setModal] = React.useState<boolean>(false);
  const [op_form, setForm] = React.useState<any>();

  const [type, setType] = React.useState<'detail' | 'edit' | 'create'>(
    'detail',
  );

  const columns: ColumnProps<{}>[] = [
    {
      title: '用户Id',
      dataIndex: 'id',
    },
    {
      title: '用户姓名',
      dataIndex: 'username',
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

  const rowSelectTion: TableRowSelection<{}> = {
    type: 'radio',
    onChange: (selectKey, selectRow) => {
      setRow(selectRow);
      setKey(selectKey);
    },
    selectedRowKeys: tableKey,
  };

  let footer = {};
  if (type == 'detail') {
    footer = {
      footer: null,
    };
  }

  //请求员工数据
  const requestList = async (params?: any) => {
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

  //员工创建的表单
  const handleCreate = () => {
    setType('create');
    setModal(true);
  };
  //员工操作函数
  const handleOperate = (type: 'detail' | 'edit' | 'delete') => {
    //未选定表格行

    //确定当前表单状态

    if (tableKey.length <= 0) {
      Modal.info({
        title: '提示',
        content: '必须选定某员工数据',
      });
      return;
    }
    switch (type) {
      case 'delete':
        Modal.confirm({
          title: `删除员工`,
          content: `你是否要删除员工 ${tabelRow[0].username} `,
          onOk: () => {
            handleDelete();
          },
        });
        break;

      case 'detail':
        setType(type);
        setModal(true);
        break;
      case 'edit':
        setType(type);
        setModal(true);
        break;

      default:
        break;
    }
  };

  //删除指定员工
  const handleDelete = async () => {
    try {
      await SFaxios.ajax({
        url: '/user/delete',
        data: {
          params: {
            userID: tabelRow[0].id,
          },
        },
      });
      message.success('员工已删除');
      requestList();
    } catch (e) {
      message.info(e.message);
    }
  };

  //创建和修改员工实行的回调函数
  const handleSubmit = async () => {
    try {
      await SFaxios.ajax({
        url: type == 'create' ? '/user/add' : '/user/edit',
        data: {
          params: op_form.getFieldsValue(),
        },
      });
      message.success('已经完成更改');
      op_form.resetFields();
      requestList();
      setModal(false);
    } catch (e) {
      message.info(e.message);
    }
  };

  React.useEffect(() => {
    requestList();
    SFevent.ee_on('handleUserFilter', (formData: Object) => {
      //触发handleUserFilter
      requestList(formData);
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
          <Button
            icon={'plus'}
            type="primary"
            onClick={() => {
              handleCreate();
            }}
          >
            创建员工
          </Button>
          <Button
            icon={'edit'}
            type="primary"
            onClick={() => {
              handleOperate('edit');
            }}
          >
            编辑员工
          </Button>
          <Button
            icon={'copy'}
            type="primary"
            onClick={() => {
              handleOperate('detail');
            }}
          >
            员工详情
          </Button>
          <Button
            icon={'delete'}
            type="danger"
            onClick={() => {
              handleOperate('delete');
            }}
          >
            删除员工
          </Button>
        </div>
      </Card>
      <Card>
        <Table
          columns={columns}
          dataSource={tableData}
          rowSelection={rowSelectTion}
          onRow={(selectRow, selectKey) => {
            return {
              onClick: () => {
                setKey([selectKey]);
                setRow([selectRow]);
              },
            };
          }}
        />
      </Card>
      <Modal
        title={
          {
            detail: '员工详情',
            create: '员工创建',
            edit: '员工编辑',
          }[type]
        }
        visible={visible}
        onOk={handleSubmit}
        onCancel={() => {
          setModal(false);
        }}
        {...footer}
        okText={'确定'}
        cancelText={'取消'}
      >
        <OperateForm
          type={type}
          rowData={tabelRow[0] || {}}
          getForm={(inst: any) => {
            setForm(inst);
          }}
        />
      </Modal>
    </div>
  );
};

export default UserPage;
