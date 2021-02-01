import * as React from 'react';
import { FormComponentProps } from 'antd/es/form';
import { Form, Button, Input, DatePicker, message } from 'antd';
import Moment from 'moment';
import SFevent from '@/utils/SFevent';

interface IUserFilterFormProps extends FormComponentProps {}

const UserFilterForm: React.FunctionComponent<IUserFilterFormProps> = props => {
  //对表单进行操作
  const {
    getFieldDecorator,
    validateFields,
    resetFields,
    getFieldsValue,
  } = props.form;

  const FormItem = Form.Item;

  const handleFilter = async () => {
    try {
      await validateFields();

      SFevent.ee_emit('handleUserFilter', getFieldsValue());
    } catch (e) {
      message.info('表单有问题，请重试');
    }
  };

  return (
    <div className="div">
      <Form layout="inline">
        <FormItem label="员工姓名">
          {getFieldDecorator(
            'user_name',
            {},
          )(<Input placeholder="请输入员工姓名" />)}
        </FormItem>
        <FormItem label="手机号">
          {getFieldDecorator(
            'user_moblie',
            {},
          )(<Input placeholder="请输入员工手机号" />)}
        </FormItem>
        <FormItem label="员工的入职时间">
          {getFieldDecorator('user_roleinDate', {
            initialValue: Moment(+new Date()),
          })(<DatePicker placeholder="请输入员工手机号" />)}
        </FormItem>

        <FormItem>
          <Button
            type="primary"
            style={{ marginRight: 10 }}
            onClick={() => {
              handleFilter();
            }}
          >
            查询
          </Button>
          <Button
            type="primary"
            onClick={() => {
              resetFields();
            }}
          >
            重置
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};

export default Form.create()(UserFilterForm);
