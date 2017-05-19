import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { NavBar, Icon } from 'antd-mobile';



function IndexPage() {
  return (
    <div>
      <NavBar leftContent="back"
              mode="light"
              onLeftClick={() => console.log('onLeftClick')}
              rightContent={[
                <Icon key="0" type="search" style={{ marginRight: '0.32rem' }} />,
                <Icon key="1" type="ellipsis" />,
              ]}
      >NavBar</NavBar>
      <Icon type={require('../assets/icon-core/adduser.svg')} />
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
