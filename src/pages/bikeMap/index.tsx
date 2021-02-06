import * as React from 'react';
import { Card, message } from 'antd';

import './style.less';
import MapForm from './components/MapForm';

const BMap = window.BMap;

interface IBikePageProps {}

const BikePage: React.FunctionComponent<IBikePageProps> = props => {
  React.useEffect(() => {
    if (!BMap) {
      message.info('地图出现了问题，请联系管理与员');
    }
    initialMap();
  }, []);

  const initialMap = () => {
    console.log(BMap);
  };
  return (
    <div className="bikePage">
      <Card>
        <MapForm />
      </Card>
      <Card>
        <div id="myMap"></div>
      </Card>
    </div>
  );
};

export default BikePage;
