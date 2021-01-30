import * as React from 'react';
import { message,Descriptions,Card } from 'antd';
import SFaxios from '@/utils/SFaxios';
import './style.less';


const DesItem = Descriptions.Item;

interface IOrderDetailProps {

}

interface bmapPoint {
  lon:number,
  lat:number
}

//百度地图api
const BMap = window.BMap;



// 订单详情  /order/detail
const OrderDetail: React.FunctionComponent<IOrderDetailProps> = (props) => {

    const [detailData,setDetail] = React.useState<any>({});

    //组件渲染后触发
    
    React.useEffect(()=>{
      requestList();
    },[])

    //地图实例
    let myBmap:any;

  //初始化地图的函数
  const initialMap  = (position_list:bmapPoint[],area_list:bmapPoint[])=>{
    if(!window.BMap){
      message.info('地图api有问题 请重试')
      return false;
    }
    myBmap = new BMap.Map('mymap')

  
    myBmap.addControl(new BMap.ScaleControl({anchor:1}));
    myBmap.addControl(new BMap.NavigationControl({anchor:1}))

    drawArea(area_list);
    drawRoute(position_list);
  
  }
  

  const drawRoute = (position_list:bmapPoint[])=>{
    let first = position_list[0];
    let last = position_list[position_list.length-1];


    //绘制起点坐标
    let startPoint = new BMap.Point(first.lon,first.lat);
    let startIcon = new BMap.Icon('./asset/start_point.png',new BMap.Size(36,42),{
      imageSize:new BMap.Size(36,42),
      anchor:new BMap.Size(18,42)
    })
    let startMaker = new BMap.Marker(startPoint,{icon:startIcon});
    myBmap.addOverlay(startMaker);

    //绘制路线
    let endPoint = new BMap.Point(last.lon,last.lat);
    let endIcon = new BMap.Icon('./asset/end_point.png',new BMap.Size(36,42),{
      imageSize:new BMap.Size(36,42),
      anchor:new BMap.Size(18,42)
    })
    let endMarker =  new BMap.Marker(endPoint,{icon:endIcon});
    myBmap.addOverlay(endMarker);


    let tarckPoint:any[] = [];
    position_list.map(point=>{
      tarckPoint.push(new BMap.Point(point.lon,point.lat))
    })
    let polyLine  = new BMap.Polyline(tarckPoint,{
      strokeColor:'#1869AD',
      strokeWeight:3,
      strokeOpacity:1
    })
    myBmap.addOverlay(polyLine);


    var miiddlePoint = new BMap.Point((first.lon + last.lon)/2, (first.lat + last.lat)/2);
    myBmap.centerAndZoom(miiddlePoint, 13);
  }
  const drawArea = (area_list:bmapPoint[])=>{
    
    let trackPoint:any[] = [];
    area_list.map(point=>{
      trackPoint.push(new BMap.Point(point.lon,point.lat))
    })
    let polygon = new BMap.Polygon(trackPoint,{
      strokeColor:'#09f',
      strokeWeight:3,
      strokeOpacity:1,
      fillColor:'#ff8605',
      fillOpacity:0.4
    })
    myBmap.addOverlay(polygon)
  }
  //请求订单数据
  const requestList = async ()=>{
    try{
      let data:any = await SFaxios.ajax({url:"/order/detail"})

      //数据请求完成
  
      initialMap(data.result.position_list,data.result.position_list);
      setDetail(data.result)
    }catch(e){
      message.info(e.message)
    }
  }



  return <div className="OrderDetailPage">
      <div id="mymap">地图api有问题 请重试</div>
      <Card title='订单信息' style={{marginTop:20}}>
          <Descriptions title='基础信息' bordered>
            <DesItem label="用车模式">{detailData.mode == 1?'禁停区':'停车点'}</DesItem>
            <DesItem label="订单编号">{detailData.order_sn}</DesItem>
            <DesItem label="车辆编号">{detailData.bike_sn}</DesItem>
            <DesItem label="用户姓名">{detailData.user_name}</DesItem>
            <DesItem label="手机号码">{detailData.mobile}</DesItem>
          </Descriptions>

          <Descriptions style={{marginTop:20}}  title='行驶轨迹' bordered>
            <DesItem label="行程起点">{detailData.start_location}</DesItem>
            <DesItem label="行程终点">{detailData.end_location }</DesItem>
            <DesItem label="行驶里程">{detailData.distance && detailData.distance/1000+'km'}</DesItem>
          </Descriptions>
      </Card>
  </div> ;
};

export default OrderDetail;
