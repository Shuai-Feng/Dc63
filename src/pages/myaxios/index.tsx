import * as React from 'react';
import Child from './component/Child';

interface IMyaxiosProps {}

const Myaxios: React.FunctionComponent<IMyaxiosProps> = props => {
  const [name, setName] = React.useState('姓名');
  let [count, setCount] = React.useState(0);
  return (
    <div className="Myaxios">
      {name}
      <hr />
      <button onClick={() => setCount(count + 1)}>+</button>
      <Child setname={React.useCallback(() => setName('jarry'), [])} />
      {/* <Child setname={()=>setName('jarry')}  /> */}
    </div>
  );
};

export default Myaxios;
