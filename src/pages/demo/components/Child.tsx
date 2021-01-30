import * as React from 'react';
import GrandChild from './GrandChild';
interface IChildProps {}

const Child: React.FunctionComponent<IChildProps> = props => {
  return (
    <div className="Child">
      <GrandChild />
    </div>
  );
};

export default Child;
