import * as React from 'react';
import { Form, Select, Input, Tree } from 'antd';
import { FormComponentProps, FormItemProps } from 'antd/es/Form';

const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;

interface IRoleCreateProps extends FormComponentProps {
  getForm?: Function;
}

const RoleCreate: React.FunctionComponent<IRoleCreateProps> = props => {
  let { getFieldDecorator } = props.form;

  const formatItems: FormItemProps = {
    labelCol: {
      sm: 24,
      md: 6,
    },
    wrapperCol: {
      sm: 24,
      md: 16,
    },
  };

  React.useEffect(() => {
    //获取表单实例
    if (props.getForm) {
      props.getForm(props.form);
    }
  }, []);
  return (
    <div className="RoleCreateForm">
      <FormItem {...formatItems} label={'用户名'}>
        {getFieldDecorator('use_name', {
          initialValue: '',
          rules: [
            {
              required: true,
              message: '用户名不能为空',
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem {...formatItems} label={'状态'}>
        {getFieldDecorator('status', {
          initialValue: 1,
        })(
          <Select style={{ width: 100 }}>
            <Option value={1}>开启</Option>
            <Option value={0}>关闭</Option>
          </Select>,
        )}
      </FormItem>
    </div>
  );
};

export default Form.create<IRoleCreateProps>()(RoleCreate);
