import * as React from 'react';
import { Form, Button, Input, Card, Icon, message, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import QueueAnim from 'rc-queue-anim';
import './style.less';

interface ILoginPageProps extends FormComponentProps {}

const { Item } = Form;

const LoginPage: React.FunctionComponent<ILoginPageProps> = props => {
  const { getFieldDecorator, getFieldsValue, validateFields } = props.form;
  // 获取我们表单项的值  getFieldDecorator
  // 获取表单的值 getFieldsValue

  let handleSubmit = async () => {
    try {
      await validateFields();
      let data = getFieldsValue();
      message.success(`用户名 ${data.userName}  密码${data.password}`);
    } catch (e) {
      message.info('表单不对哦，再检查一下吧');
    }
  };
  return (
    <div className="LoginPage">
      <Card title="内联表单">
        <Form layout={'inline'}>
          <Item>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '用户名 不为空哦' }],
            })(
              <Input
                prefix={<Icon type="user" />}
                type="text"
                placeholder={'用户名'}
              />,
            )}
          </Item>
          <Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '密码不能为空' }],
            })(
              <Input
                prefix={<Icon type="lock" />}
                type="text"
                placeholder={'密码'}
              />,
            )}
          </Item>
          <Item>
            <Button type="primary" onClick={handleSubmit}>
              登录
            </Button>
          </Item>
        </Form>
      </Card>
      <Card title="普通登录框" style={{ width: 400, marginTop: 10 }}>
        <Form>
          <QueueAnim delay={300}>
            <Item key="1" label={'用户名'}>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '用户名不能为空' }],
              })(<Input prefix={<Icon type="user" />} />)}
            </Item>
            <Item key="2" label={'密码'}>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '密码不为空' }],
              })(<Input type="password" prefix={<Icon type="lock" />} />)}
            </Item>
            <Item key="3">
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox />)}
              记住我
              <a href="javascript:;" className="login-form-forget">
                忘记密码
              </a>
            </Item>
            <Item key="4">
              <Button type="primary" className="login-form-button">
                登录
              </Button>
            </Item>
          </QueueAnim>
        </Form>
      </Card>
    </div>
  );
};

export default Form.create()(LoginPage);

//高阶组件封装
