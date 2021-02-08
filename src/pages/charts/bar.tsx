import * as React from 'react';
import ReactEchart from 'echarts-for-react';
import { EChartsOption } from 'echarts';
import { Card } from 'antd';

interface IBarpageProps {}

const Barpage: React.FunctionComponent<IBarpageProps> = props => {
  const myChartOption1: EChartsOption = {
    title: {
      text: '用户骑行订单',
    },
    xAxis: {
      type: 'category', //横轴类别,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    tooltip: {
      trigger: 'axis',
    },
    series: [
      {
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
        data: [25, 63, 64, 53, 23, 45, 63],
      },
    ],
  };
  const myChartOption2: EChartsOption = {
    title: {
      text: '用户骑行订单',
    },
    xAxis: {
      type: 'category', //横轴类别,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['ofo', '摩拜', '小蓝'],
    },
    series: [
      {
        name: 'ofo',
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
        data: [25, 63, 64, 53, 23, 45, 63],
      },
      {
        name: '摩拜',
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
        data: [25, 32, 34, 53, 23, 35, 62],
      },
      {
        name: '小蓝',
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
        data: [63, 63, 64, 53, 23, 25, 45],
      },
    ],
  };
  return (
    <div className="Barpage">
      <Card title="柱状图" style={{ marginBottom: 10 }}>
        <ReactEchart option={myChartOption1} style={{ height: 500 }} />
      </Card>
      <Card>
        <ReactEchart option={myChartOption2} style={{ height: 500 }} />
      </Card>
    </div>
  );
};

export default Barpage;
