import { Button } from 'antd';
import * as React from 'react';

interface IChildProps {
  setname: any;
}

const Child: React.FunctionComponent<IChildProps> = props => {
  let { setname } = props;
  console.log('子组件变化啦');
  return (
    <div className="Child2">
      123123123
      <Button onClick={setname}>子组件变化</Button>
    </div>
  );
};

export default React.memo(Child);
