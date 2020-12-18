import * as React from 'react';
import SFhoc from '@/component/SFHoc';
interface IDEmo1Props {
}

const DEmo1: React.FunctionComponent<IDEmo1Props> = (props) => {
    console.log(props)
  return <div className="Demo1">
      Demo1
  </div> ;
};

export default SFhoc(DEmo1);
