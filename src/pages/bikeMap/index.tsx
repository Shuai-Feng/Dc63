import * as React from 'react';
import { Card, message } from 'antd';

import './style.less';
import MapForm from './components/MapForm';
import SFaxios from '@/utils/SFaxios';

//https://mapopen-pub-jsapi.bj.bcebos.com/jsapi/reference/jsapi_reference_3_0.html
const BMap = window.BMap;

interface IBikePageProps {}

interface bikePoint {
  lon: string | number;
  lat: string | number;
}

const BikePage: React.FunctionComponent<IBikePageProps> = props => {
  //地图实例
  let myMap: any;

  const [bikeNum, setNum] = React.useState(0);

  React.useEffect(() => {
    if (!BMap) {
      message.info('地图出现了问题，请联系管理与员');
    }
    initialMap();
  }, []);

  const initialMap = () => {
    myMap = new BMap.Map('myMap');
    myMap.centerAndZoom(new BMap.Point(116.404, 39.915), 13);
    myMap.enableScrollWheelZoom();

    SFaxios.ajax({ url: '/map/bike_list' }).then((res: any) => {
      //添加标尺和缩放控件

      myMap.addControl(new BMap.ScaleControl({ anchor: 1 }));
      myMap.addControl(new BMap.NavigationControl({ anchor: 1 }));

      //设置车辆综述
      setNum(res.result.total_count);
      //绘制行驶路径
      drawRoute(res.result.route_list);
      //绘制共享单车图标
      drawBikeIcon(res.result.bike_list);
      //绘制服务区
      drawServiceArea(res.result.service_list);
    });
  };

  //绘制车辆Icon
  const drawBikeIcon = (bike_list: string[]) => {
    const bikeIcon = new BMap.Icon('./asset/bike.jpg', new BMap.Size(36, 42), {
      imageSize: new BMap.Size(36, 42),
      anchor: new BMap.Size(18, 24),
    });

    bike_list.forEach(item => {
      let p = item.split(',');
      let bikeMarker = new BMap.Marker(new BMap.Point(p[0], p[1]), {
        icon: bikeIcon,
      });
      myMap.addOverlay(bikeMarker);
    });
  };

  //绘制服务区的函数
  const drawServiceArea = (service_list: bikePoint[]) => {
    let area_Point_List: any = [];
    //进行点的转换

    service_list.forEach(item => {
      area_Point_List.push(new BMap.Point(item.lon, item.lat));
    });

    let polygon = new BMap.Polygon(area_Point_List, {
      strokeWeight: 4,
      strokeColor: '#CE0000',
      strokeOpacity: 1,
      fillColor: '#ff8605',
      fillOpacity: 0.4,
    });

    myMap.addOverlay(polygon);
  };

  const drawRoute = (bike_list: string[]) => {
    let bike_Route_List: any = [];

    bike_list.forEach(item => {
      let p = item.split(',');
      bike_Route_List.push(new BMap.Point(p[0], p[1]));
    });

    let polyLine = new BMap.Polyline(bike_Route_List, {
      strokeWeight: 4,
      strokeColor: '#CE0000',
      strokeOpacity: 1,
    });

    //绘制起点Icon
    const startIcon = new BMap.Icon(
      './asset/start_point.png',
      new BMap.Size(36, 42),
      {
        imageSize: new BMap.Size(36, 42),
        anchor: new BMap.Size(18, 24),
      },
    );

    //绘制终点Iocn
    const endIcon = new BMap.Icon(
      './asset/end_point.png',
      new BMap.Size(36, 42),
      {
        imageSize: new BMap.Size(36, 42),
        anchor: new BMap.Size(18, 24),
      },
    );

    //绘制起点标记点
    let startPoint = bike_list[0].split(',');
    let startMarker = new BMap.Marker(
      new BMap.Point(startPoint[0], startPoint[1]),
      {
        icon: startIcon,
      },
    );

    //绘制终点标记点
    let endPoint = bike_list[bike_list.length - 1].split(',');
    let endMarker = new BMap.Marker(new BMap.Point(endPoint[0], endPoint[1]), {
      icon: endIcon,
    });

    myMap.centerAndZoom(new BMap.Point(endPoint[0], endPoint[1]), 11);
    myMap.addOverlay(polyLine);
    myMap.addOverlay(startMarker);
    myMap.addOverlay(endMarker);
  };

  return (
    <div className="bikePage">
      <Card style={{ marginBottom: 10 }}>
        <MapForm />
      </Card>
      <Card title={`共有 ${bikeNum} 辆`}>
        <div id="myMap"></div>
      </Card>
    </div>
  );
};

export default BikePage;
