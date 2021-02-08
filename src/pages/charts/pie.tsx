import * as React from 'react';
import { Card } from 'antd';
import ReactEcharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';

interface IPiePageProps {}

const PiePage: React.FunctionComponent<IPiePageProps> = props => {
  const myPieOption1: EChartsOption = {
    title: {
      text: '单车行程统计',
    },
    tooltip: {},
    legend: {},
    series: [
      {
        type: 'pie',

        data: [
          { value: 735, name: '周一' },
          { value: 580, name: '周二' },
          { value: 484, name: '周三' },
          { value: 300, name: '周四' },
          { value: 1048, name: '周五' },
          { value: 300, name: '周六' },
          { value: 1048, name: '周日' },
        ],
      },
    ],
  };
  const myPieOption2: EChartsOption = {
    title: {
      text: '单车行程统计',
    },
    tooltip: {},
    legend: {},
    toolbox: {
      show: true,
      feature: {
        restore: {},
        saveAsImage: {},
      },
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        label: {
          show: false,
          position: 'center',
          fontSize: 28,
          fontWeight: 'bold',
        },
        labelLine: {
          show: false,
        },
        itemStyle: {
          borderWidth: 3,
          borderColor: '#fff',
          borderRadius: 5,
        },
        emphasis: {
          label: {
            show: true,
          },
        },
        data: [
          { value: 735, name: '周一' },
          { value: 580, name: '周二' },
          { value: 484, name: '周三' },
          { value: 300, name: '周四' },
          { value: 1048, name: '周五' },
          { value: 300, name: '周六' },
          { value: 1048, name: '周日' },
        ],
      },
    ],
  };
  return (
    <div className="PiePage">
      <Card title="环形图">
        <ReactEcharts option={myPieOption1} style={{ height: 500 }} />
      </Card>

      <Card>
        <ReactEcharts option={myPieOption2} style={{ height: 500 }} />
      </Card>
    </div>
  );
};

export default PiePage;
