import * as React from 'react';
import { NavLink } from 'umi';
import { Layout, Col, Row } from 'antd';
import './style.less';

const { Header } = Layout;

interface INavHeaderProps {
  menuType?: 'second';
}

const NavHeader: React.FunctionComponent<INavHeaderProps> = props => {
  const username = 'tom';
  const { menuType } = props;

  return (
    <div className="NavHeader">
      <Header className={menuType == 'second' ? 'second' : 'normal'}>
        <Row>
          {menuType == 'second' ? (
            <Col offset={2} span={18}>
              <div className="Icon">
                <img src="./asset/logo-ant.svg" alt="" />
                <h1>TS 单车</h1>
              </div>
            </Col>
          ) : (
            ''
          )}
          <Col span={menuType == 'second' ? 2 : 22}>
            欢迎你 {username}
            <NavLink to={'/logout'}> 退出 </NavLink>
          </Col>
        </Row>
      </Header>

      {menuType == 'second' ? (
        ''
      ) : (
        <div className="header_bottom">
          <div className="pagetitle">首页</div>
        </div>
      )}
    </div>
  );
};

export default NavHeader;
