import * as React from 'react';
import { Countcontext } from '../CounterContext';
interface IGrandChildProps {}

const GrandChild: React.FunctionComponent<IGrandChildProps> = props => {
  let { state, dispatch } = React.useContext(Countcontext);

  return (
    <div className="GrandChild">
      {state.count}
      <button
        onClick={() => {
          dispatch({ type: 'ADD' });
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          dispatch({ type: 'SUB' });
        }}
      >
        -
      </button>
    </div>
  );
};

export default GrandChild;
