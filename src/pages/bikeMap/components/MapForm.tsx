import * as React from 'react';
import { Form, DatePicker, Select, Button } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import Moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;

interface IMapFormProps extends FormComponentProps {}

const MapForm: React.FunctionComponent<IMapFormProps> = props => {
  let {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    resetFields,
  } = props.form;
  return (
    <div className="MapForm">
      <Form layout="inline">
        <FormItem label={'城市选择'}>
          {getFieldDecorator('city_choice', {
            initialValue: 0,
          })(
            <Select>
              <Option value={0}>全部</Option>
              <Option value={1}>杭州</Option>
              <Option value={2}>北京</Option>
            </Select>,
          )}
        </FormItem>
        <FormItem label={'订单时间筛选'}>
          {getFieldDecorator('start_time', {
            initialValue: Moment(+new Date()),
          })(<DatePicker />)}
        </FormItem>
        <FormItem label={'~'} colon={false}>
          {getFieldDecorator('end_time', {
            initialValue: Moment(+new Date()),
          })(<DatePicker />)}
        </FormItem>
        <FormItem label={'订单类别选择'}>
          {getFieldDecorator('bike_mode', {
            initialValue: 0,
          })(
            <Select style={{ width: 120 }}>
              <Option value={0}>全部</Option>
              <Option value={1}>进行中</Option>
              <Option value={2}>行程结束</Option>
            </Select>,
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" style={{ marginRight: 10 }}>
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

export default Form.create()(MapForm);
