import * as React from 'react';
import { Form, Input, Transfer } from 'antd';
import { FormComponentProps, FormItemProps } from 'antd/es/form';
import FormItem from 'antd/lib/form/FormItem';

interface IRoleEditingFormProps extends FormComponentProps {
  getForm: Function;
  rowData: any;
}

const RoleEditingForm: React.FunctionComponent<IRoleEditingFormProps> = props => {
  let { getFieldDecorator, setFields } = props.form;
  let { rowData } = props;

  React.useEffect(() => {
    //获取表单实例
    if (props.getForm) {
      props.getForm(props.form);
    }
  }, []);

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

  debugger;
  return (
    <div className="RoleEditingForm">
      <Form>
        <FormItem label="状态" {...formatItems}>
          {getFieldDecorator('status', {
            initialValue: rowData.role_name,
          })(<Input disabled />)}
        </FormItem>
        <FormItem {...formatItems}>
          {getFieldDecorator('role_name', {})(<Transfer />)}
        </FormItem>
      </Form>
    </div>
  );
};

export default Form.create<IRoleEditingFormProps>()(RoleEditingForm);
