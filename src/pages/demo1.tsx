import { Button } from 'antd';
import * as React from 'react';

interface IDemo1Props {}

interface inter_state {
  count: number;
}

const Demo1: React.FunctionComponent<IDemo1Props> = props => {
  const reducer = (
    state: inter_state,
    action: { type: string; payload?: any },
  ) => {
    switch (action.type) {
      case 'add':
        return { count: state.count + 1 };
      case 'sub':
        return { count: state.count - 1 };
      default:
        return state;
    }
  };
  const [state, dispatch] = React.useReducer(reducer, { count: 0 });
  return (
    <div>
      <h1>counter{state.count}</h1>
      <Button
        onClick={() => {
          dispatch({ type: 'add' });
        }}
      >
        计数器+1
      </Button>
      <Button
        onClick={() => {
          dispatch({ type: 'sub' });
        }}
      >
        计数器-1
      </Button>
    </div>
  );
};

export default Demo1;
