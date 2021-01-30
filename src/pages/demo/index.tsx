import * as React from 'react';
import { Button } from 'antd';
import { Countcontext } from './CounterContext';
import Child from './components/Child';

interface IDemoPageProps {}

const initialState = {
  count: 0,
};

function counter(state: any, action: any) {
  switch (action.type) {
    case 'ADD':
      return { count: state.count + 1 };
    case 'SUB':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

const DemoPage: React.FunctionComponent<IDemoPageProps> = props => {
  let [state, dispatch] = React.useReducer(counter, initialState);
  return (
    <div className="Demopage">
      <p>{state.count}</p>
      <Button
        onClick={() => {
          dispatch({ type: 'ADD' });
        }}
      >
        +
      </Button>
      <Button
        onClick={() => {
          dispatch({ type: 'SUB' });
        }}
      >
        -
      </Button>
      <hr />
      <Countcontext.Provider value={{ state, dispatch }}>
        <Child />
      </Countcontext.Provider>
    </div>
  );
};

export default DemoPage;
