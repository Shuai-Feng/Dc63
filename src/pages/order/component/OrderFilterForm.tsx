import * as React from 'react';
import { Button, Form, Select, DatePicker } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import moment from 'moment';
import SFevent from '@/utils/SFevent';
const Option = Select.Option;
const FormItem = Form.Item;

interface IOrderFilterFormProps extends FormComponentProps {}

const OrderFilterForm: React.FunctionComponent<IOrderFilterFormProps> = props => {
  const { getFieldDecorator, resetFields, getFieldsValue } = props.form;

  const handleSearch = () => {
    SFevent.ee_emit('Order_search', getFieldsValue());
  };

  return (
    <div className="OrderFilterForm">
      <Form layout="inline">
        <FormItem label="订单城市">
          {getFieldDecorator('order_city', {
            initialValue: 1,
          })(
            <Select>
              <Option value={1}>全部</Option>
              <Option value={2}>北京</Option>
              <Option value={3}>杭州</Option>
            </Select>,
          )}
        </FormItem>
        <FormItem label="订单时间">
          {getFieldDecorator('start_time', {
            initialValue: moment(+new Date()),
          })(<DatePicker />)}
        </FormItem>
        <FormItem label="~" colon={false}>
          {getFieldDecorator('end_time', {
            initialValue: moment(+new Date()),
          })(<DatePicker />)}
        </FormItem>
        <FormItem label="订单城市">
          {getFieldDecorator('status', {
            initialValue: 0,
          })(
            <Select style={{ width: 120 }}>
              <Option value={0}>全部</Option>
              <Option value={1}>已完成</Option>
              <Option value={2}>未完成</Option>
            </Select>,
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            onClick={handleSearch}
            style={{ marginRight: 10 }}
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

export default Form.create()(OrderFilterForm);
