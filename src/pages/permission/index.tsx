import * as React from 'react';
import { Table, Card, Button, Modal, message } from 'antd';
import './style.less';
import { ColumnProps, TableRowSelection } from 'antd/es/table';
import SFaxios from '@/utils/SFaxios';

//引入子组件集
import { RoleCreate, RoleSetting } from './components';

interface IPermissionPageProps {}

const PermissionPage: React.FunctionComponent<IPermissionPageProps> = props => {
  //选的的行编号
  const [tableKey, setTableKey] = React.useState<string[] | number[]>([]);
  //选定行的内容
  const [tableRow, setTableRow] = React.useState<any>([]);
  //表格的数据
  const [tableData, setTableData] = React.useState();

  const [visible, setVisibel] = React.useState(false);

  const [type, setType] = React.useState<'create' | 'setting' | 'editUser'>(
    'create',
  );

  const [myForm, setForm] = React.useState<any>();

  React.useEffect(() => {
    SFaxios.ajax({ url: '/role/list' }).then(res => {
      res.result.item_list.forEach((item: any, index: number) => {
        item.key = index;
      });
      setTableData(res.result.item_list);
    });
  }, []);

  //表单逻辑提交
  const handleValidate = async () => {
    // 如果是设置权限和用户权限 必须
    console.log(myForm.getFieldsValue());

    try {
      // console.log(myForm.getFieldsValue())
      await myForm.validateFields();
      Modal.confirm({
        title: '确认提交',
        content: '你确定要进行此操作吗',
        onOk: handleSubmit,
      });
    } catch (e) {
      message.info('表单有误哦，请检查一下');
    }
  };

  const handleSubmit = async () => {
    //选择需要的接口
    let urlList = {
      create: '/role/create',
      setting: '/role/setting',
      editUser: '/role/editUser',
    }[type || ''];

    try {
      await SFaxios.ajax({
        url: urlList,
        data: {
          params: myForm.getFieldsValue(),
        },
      });
      message.success('操作成功');
      //重置表单
      myForm.resetFields();
      //关闭模态框
      setVisibel(false);
    } catch (e) {
      message.info(e.message);
    }
  };

  const columns: ColumnProps<{}>[] = [
    {
      dataIndex: 'id',
      title: 'id',
    },
    {
      dataIndex: 'role_name',
      title: '角色名称',
    },
    {
      dataIndex: 'status',
      title: '当前状态',
    },
    {
      dataIndex: 'authorize_user_name',
      title: '授权人姓名',
    },
    {
      dataIndex: 'authorize_time',
      title: '授权时间',
    },
    {
      dataIndex: 'create_time',
      title: '创建时间',
    },
  ];

  //对表格行选进行设置                  //放的是表格数据的类型
  const rowSelection: TableRowSelection<{}> = {
    type: 'radio',
    selectedRowKeys: tableKey,
    onChange: (selectKey, selectRow) => {
      setTableKey(selectKey);
      setTableRow(selectRow);
    },
  };

  //
  const handleOpen = (type: 'setting' | 'editUser') => {
    setType(type);

    if (tableKey.length == 0) {
      message.info('必须选定一条记录');
      return;
    }
    setVisibel(true);
  };

  return (
    <div className="PermissionPage">
      <Card style={{ marginBottom: 10 }}>
        <div className="myContent">
          <Button
            type="primary"
            onClick={() => {
              setVisibel(true);
              setType('create');
            }}
          >
            创建角色
          </Button>
          <Button
            type="primary"
            onClick={() => {
              handleOpen('setting');
            }}
          >
            设置权限
          </Button>
          <Button
            type="primary"
            onClick={() => {
              handleOpen('editUser');
            }}
          >
            用户权限
          </Button>
        </div>
      </Card>
      <Card>
        <Table
          columns={columns}
          dataSource={tableData}
          rowSelection={rowSelection}
          onRow={(record, index) => {
            return {
              onClick: () => {
                setTableKey([index]);
                setTableRow([record]);
              },
            };
          }}
        />
      </Card>
      <Modal
        title={
          {
            create: '创建角色',
            setting: '设置权限',
            editUser: '用户权限',
          }[type || 'create']
        }
        visible={visible}
        onCancel={() => {
          setVisibel(false);
        }}
        onOk={handleValidate}
        okText={'确定'}
        cancelText={'取消'}
      >
        {type == 'create' ? (
          <RoleCreate
            getForm={(inst: any) => {
              setForm(inst);
            }}
          />
        ) : (
          ''
        )}
        {type == 'setting' ? (
          <RoleSetting
            getForm={(inst: any) => {
              setForm(inst);
            }}
            rowData={tableRow[0]}
          />
        ) : (
          ''
        )}
      </Modal>
    </div>
  );
};

export default PermissionPage;
