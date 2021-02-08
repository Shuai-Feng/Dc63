import * as React from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';
import { Card } from 'antd';

interface ILinePageProps {}

const LinePage: React.FunctionComponent<ILinePageProps> = props => {
  const myLineOption1: EChartsOption = {
    title: {
      text: '折线图统计',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    toolbox: {
      left: 0,
      top: '10%',
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    },
    yAxis: {
      type: 'value',
      boundaryGap: false,
    },
    series: [
      {
        type: 'line',
        data: [140, 232, 101, 264, 90, 340, 250],
      },
    ],
  };
  const myLineOption2: EChartsOption = {
    title: {
      text: '折线图统计',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    },
    yAxis: {
      type: 'value',
      boundaryGap: false,
    },
    series: [
      {
        name: 'Line 1',
        type: 'line',
        stack: '总量',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(128, 255, 165)' },
            { offset: 1, color: 'rgba(1, 191, 236)' },
          ]),
        },
        data: [140, 232, 101, 264, 90, 340, 250],
      },
      {
        name: 'Line 2',
        type: 'line',
        stack: '总量',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(0, 221, 255)' },
            { offset: 1, color: 'rgba(77, 119, 255)' },
          ]),
        },
        data: [120, 282, 111, 234, 220, 340, 310],
      },
      {
        name: 'Line 3',
        type: 'line',
        stack: '总量',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(255, 0, 135)' },
            { offset: 1, color: 'rgba(135, 0, 157)' },
          ]),
        },
        data: [320, 132, 201, 334, 190, 130, 220],
      },
    ],
  };
  return (
    <div className="LinePage">
      <Card title={'炫彩折线图 '}>
        <ReactEcharts option={myLineOption2} style={{ height: 500 }} />
      </Card>
      <Card title={'折线图 '}>
        <ReactEcharts option={myLineOption1} style={{ height: 500 }} />
      </Card>
    </div>
  );
};

export default LinePage;
