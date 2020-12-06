import * as React from 'react';
interface IHomePageProps {
}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
  return <div className="Homepage">
      欢迎进入后台管理界面
  </div> ;
};

export default HomePage;
