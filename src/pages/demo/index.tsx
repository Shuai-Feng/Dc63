import * as React from 'react';
import Carousel from '@/component/Carousel';
import './style.less';
interface IDemoProps {}

const Demo: React.FunctionComponent<IDemoProps> = props => {
  const ImgList = ['./banner/1.jpg', './banner/2.jpg', './banner/3.jpg'];
  return (
    <div className="Demo">
      <Carousel imgList={ImgList} />
    </div>
  );
};

export default Demo;
