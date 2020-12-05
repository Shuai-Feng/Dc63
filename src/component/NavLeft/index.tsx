import  React,{ useEffect } from 'react';
import { NavLink } from 'umi';
import { Menu } from 'antd';
import menuConfig,{ menuItem } from './menuConfig';


const { Item,SubMenu } =  Menu;

import './style.less';


interface INavLeftProps {
}

const NavLeft: React.FunctionComponent<INavLeftProps> = (props) => {

    //函数组件的  componentDidMount
    let renderMenu = (data:Array<menuItem>)=>{
        return data.map((item,index)=>{
            if(item.children){
                //有子 菜单
                return <SubMenu  title={item.title} key={item.key}>
                    { renderMenu(item.children) }
                </SubMenu>
            }else{
                return <Item title={item.title} key={item.key} >
                    <NavLink to={item.key}>{item.title}</NavLink>
                </Item>
            }
        })
    }
  return <div className="NavLeft">
      <div className="Icon">
          <img src="./asset/logo-ant.svg" alt=""/>
          <h1>TS 单车</h1>
      </div>
      <Menu theme={'dark'}>
        {renderMenu(menuConfig)}
      </Menu>
  </div> ;
};

export default NavLeft;
