import * as React from 'react';

interface ICarouselProps {
  imgList?: string[];
}

//创建两个自定义的hook函数

/**
 *
 * @param {*} callback 定时器的回调函数
 * @param {*} delay  定时器的时间间隔
 */

function userInterval(callback: Function, delay: number) {
  React.useEffect(() => {
    const start = new Date().getTime();
    const I = setInterval(() => {
      callback(new Date().getTime() - start);
    }, delay);
    return () => clearInterval(I);
  }, []);
}

/**
 *
 * @param {*} imgNum 轮播图的数量
 * @param {*} delay  定时器的时间间隔
 */

function userSlider(imgNum: number, delay = 1000) {
  const [slider, setSlider] = React.useState(0);
  userInterval((diff: number) => {
    setSlider(_ => Math.floor(diff / delay) % imgNum);
  }, delay);
  return slider;
}

const Carousel: React.FunctionComponent<ICarouselProps> = props => {
  let { imgList } = props;
  imgList = imgList ? imgList : [];
  const slider = userSlider(imgList.length, 2000);

  return (
    <div className="Carousel">
      <div
        className="wrapper"
        style={{
          width: `${imgList.length * 100}%`,
          transform: `translateX(-${(slider / imgList.length) * 100}%)`,
        }}
      >
        {imgList.map(item => {
          return <img src={item} alt={item} />;
        })}
      </div>
    </div>
  );
};

export default Carousel;
