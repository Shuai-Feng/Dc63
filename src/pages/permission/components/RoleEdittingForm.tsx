import * as React from 'react';
import { Form, Input, Transfer, message } from 'antd';
import { FormComponentProps, FormItemProps } from 'antd/es/form';
import FormItem from 'antd/lib/form/FormItem';
import SFaxios from '@/utils/SFaxios';

interface IRoleEditingFormProps extends FormComponentProps {
  getForm: Function;
  rowData: any;
}

//   /role/user_list 用户表单具体信息

const RoleEditingForm: React.FunctionComponent<IRoleEditingFormProps> = props => {
  let { getFieldDecorator, setFields } = props.form;
  let { rowData } = props;

  const [ts_dataSource, setDatasource] = React.useState<any>();
  const [ts_tagetKey, setTargetKey] = React.useState<any>();

  React.useEffect(() => {
    //获取表单实例
    if (props.getForm) {
      props.getForm(props.form);
    }
    handleRequest();
  }, []);

  const formatItems: FormItemProps = {
    labelCol: {
      sm: 24,
      md: 4,
    },
    wrapperCol: {
      sm: 24,
      md: 20,
    },
  };

  /** */
  const handleRequest = async () => {
    try {
      let data: any[] = await (
        await SFaxios.ajax({
          url: '/role/user_list',
          data: {
            params: rowData.id,
          },
        })
      ).result;
      // Transfer 数据源
      let datasource: any = [];
      //targetKet transfer中选定内容
      let targetkey: any = [];

      data.forEach(item => {
        const data = {
          key: item.user_id,
          title: item.user_name,
          status: item.status,
        };
        if (data.status == 1) {
          targetkey.push(data.key);
        }
        datasource.push(data);
      });

      setDatasource(datasource);
      setTargetKey(targetkey);
    } catch (e) {
      message.info(e.message);
    }
  };
  return (
    <div className="RoleEditingForm">
      <Form>
        <FormItem label="角色状态" {...formatItems}>
          {getFieldDecorator('status', {
            initialValue: rowData.role_name,
          })(<Input disabled />)}
        </FormItem>
        <FormItem label="人员控制" {...formatItems}>
          {getFieldDecorator(
            'role_name',
            {},
          )(
            <Transfer
              titles={['待选用户', '已选用户']}
              dataSource={ts_dataSource}
              targetKeys={ts_tagetKey}
              render={(item: any) => {
                return item.title;
              }}
              onChange={targetKey => {
                setTargetKey(targetKey);
              }}
              style={{ width: 550 }}
            />,
          )}
        </FormItem>
      </Form>
    </div>
  );
};

export default Form.create<IRoleEditingFormProps>()(RoleEditingForm);
