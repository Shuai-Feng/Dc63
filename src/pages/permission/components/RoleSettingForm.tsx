import * as React from 'react';
import { Form, Input, Select, Tree } from 'antd';
import { FormComponentProps, FormItemProps } from 'antd/es/form';

const FormItem = Form.Item;
const Option = Select.Option;

interface IRoleSettingFormProps extends FormComponentProps {
  getForm?: Function;
  rowData: any;
}

const RoleSettingForm: React.FunctionComponent<IRoleSettingFormProps> = props => {
  let { getFieldDecorator } = props.form;
  let { rowData } = props;

  React.useEffect(() => {
    if (props.getForm) {
      props.getForm(props.form);
    }
    console.log(props.rowData);
  }, []);

  //表单项的响应式设置
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
  return (
    <div className="RoleSettingForm">
      <Form>
        <FormItem {...formatItems} label="姓名">
          {getFieldDecorator('user_name', {
            initialValue: rowData.authorize_user_name,
          })(<Input disabled />)}
        </FormItem>
        <FormItem {...formatItems} label="状态">
          {getFieldDecorator('status', {
            initialValue: rowData.status,
          })(
            <Select>
              <Option value={1}>开启</Option>
              <Option value={0}>关闭</Option>
            </Select>,
          )}
        </FormItem>
      </Form>
    </div>
  );
};

export default Form.create<IRoleSettingFormProps>()(RoleSettingForm);
