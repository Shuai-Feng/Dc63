import * as React from 'react';
import { Form, Input, Select, Tree, Button } from 'antd';
import { FormComponentProps, FormItemProps } from 'antd/es/form';
import menuConfig, { menuItem } from '@/component/NavLeft/menuConfig';

const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;

interface IRoleSettingFormProps extends FormComponentProps {
  getForm?: Function;
  rowData: any;
}

const RoleSettingForm: React.FunctionComponent<IRoleSettingFormProps> = props => {
  let { getFieldDecorator, setFieldsValue } = props.form;
  let { rowData } = props;
  const [menus, setMenus] = React.useState<any>([]);

  React.useEffect(() => {
    if (props.getForm) {
      props.getForm(props.form);
    }
  }, []);

  React.useEffect(() => {
    setMenus(props.rowData.menus);
  }, [props.rowData]);

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

  const renderTree = (configData: menuItem[]) => {
    return configData.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key}>
            {renderTree(item.children)}
          </TreeNode>
        );
      } else {
        return <TreeNode title={item.title} key={item.key}></TreeNode>;
      }
    });
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
        {getFieldDecorator('menus')(
          <Tree
            checkable
            defaultExpandAll
            checkedKeys={menus}
            onCheck={checkKey => {
              setMenus(checkKey);
              setFieldsValue({ menus: checkKey });
            }}
          >
            <TreeNode title="平台权限" key="platform_all">
              {renderTree(menuConfig)}
            </TreeNode>
          </Tree>,
        )}
      </Form>
      <Button
        onClick={() => {
          console.log(menus);
        }}
      >
        +
      </Button>
    </div>
  );
};

export default Form.create<IRoleSettingFormProps>()(RoleSettingForm);
