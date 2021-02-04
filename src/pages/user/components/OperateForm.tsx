import * as React from 'react';
import { DatePicker, Form, Input, Radio, Select } from 'antd';
import { FormComponentProps, FormItemProps } from 'antd/es/form';
import Moment from 'moment';
import SFevent from '@/utils/SFevent';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;

interface IOperateFormProps extends FormComponentProps {
  type?: 'detail' | 'edit' | 'create';
  rowData?: any;
}

const OperateForm: React.FunctionComponent<IOperateFormProps> = props => {
  let {
    getFieldDecorator,
    resetFields,
    validateFields,
    getFieldsValue,
  } = props.form;

  let type = props.type || 'detail';
  let rowData = props.rowData;

  const formLayout: FormItemProps = {
    labelCol: {
      sm: 24,
      md: 4,
    },
    wrapperCol: {
      sm: 24,
      md: 18,
    },
  };

  return (
    <div className="OperateForm">
      <Form>
        <FormItem {...formLayout} label="姓名">
          {type == 'detail'
            ? rowData.username
            : getFieldDecorator('user_name', {
                initialValue: type == 'edit' ? rowData.username : '',
              })(<Input placeholder={'请输入员工姓名'} />)}
        </FormItem>
        <FormItem {...formLayout} label="性别">
          {type == 'detail'
            ? rowData.sex == 1
              ? '男'
              : '女'
            : getFieldDecorator('sex', {
                initialValue: type == 'edit' ? rowData.sex : '',
              })(
                <RadioGroup>
                  <Radio value={1}>男</Radio>
                  <Radio value={2}>女</Radio>
                </RadioGroup>,
              )}
        </FormItem>
        <FormItem {...formLayout} label="状态">
          {type == 'detail'
            ? {
                '1': '资深工程师',
                '2': '高级工程师',
                '3': '中级工程师',
                '4': '产品经理',
                '5': 'UI',
              }[rowData.state]
            : getFieldDecorator('user_state', {
                initialValue: type == 'edit' ? rowData.state : '',
              })(
                <Select placeholder={'请选择身份状态'}>
                  <Option value={1}>咸鱼一条</Option>
                  <Option value={2}>风华浪子</Option>
                  <Option value={3}>百度FE</Option>
                  <Option value={4}>创业者</Option>
                  <Option value={4}>北大才子</Option>
                </Select>,
              )}
        </FormItem>
        <FormItem {...formLayout} label="生日">
          {type == 'detail'
            ? rowData.birthday
            : getFieldDecorator('user_birthday', {
                initialValue:
                  type == 'edit'
                    ? Moment(rowData.birthday)
                    : Moment(+new Date()),
              })(<DatePicker />)}
        </FormItem>
        <FormItem {...formLayout} label="联系地址">
          {type == 'detail'
            ? rowData.address
            : getFieldDecorator('user_addresss', {
                initialValue: type == 'edit' ? rowData.address : '',
                rules: [
                  {
                    required: true,
                    message: '联系地址不能为空',
                  },
                ],
              })(<TextArea />)}
        </FormItem>
      </Form>
    </div>
  );
};
//Hoc 高阶组件  Hight Order Components
export default Form.create<IOperateFormProps>()(OperateForm);
