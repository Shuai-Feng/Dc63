import * as React from 'react';
import { Carousel,Card, Button } from 'antd';
import { DotPosition } from 'antd/es/carousel';
import './carousel.less';


interface ICarouselPageProps {
}

const CarouselPage: React.FunctionComponent<ICarouselPageProps> = (props) => {

    const [dotPostion,setDot] = React.useState<DotPosition>('right'); 

  return <div className="CarouselPage">
    <Card title='轮播组件'>
        <Carousel>
            <div><h3>1</h3></div>
            <div><h3>2</h3></div>
            <div><h3>3</h3></div>
            <div><h3>4</h3></div>
        </Carousel>
    </Card>
    <Card title={<span>轮播组件 渐变切换 
        <Button.Group style={{marginLeft:10}}>
            <Button onClick={()=>{setDot('top')}} >top</Button>
            <Button onClick={()=>{setDot('right')}} >right</Button>
            <Button onClick={()=>{setDot('bottom')}} >bottom</Button>
            <Button onClick={()=>{setDot('left')}} >left</Button>
        </Button.Group>
    </span>}>
        <Carousel dotPosition={dotPostion} effect='fade' autoplay={true}>
            <div><h3>1</h3></div>
            <div><h3>2</h3></div>
            <div><h3>3</h3></div>
            <div><h3>4</h3></div>
        </Carousel>
    </Card>
    <Card title='轮播组件'>
        <Carousel>
            <div><img src="./asset/1.png" alt=""/></div>
            <div><img src="./asset/2.png" alt=""/></div>
            <div><img src="./asset/3.png" alt=""/></div>
            <div><img src="./asset/4.png" alt=""/></div>
        </Carousel>
    </Card>
  </div> ;
};

export default CarouselPage;
