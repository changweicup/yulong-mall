import React from 'react';
import { WingBlank, Button } from 'antd-mobile';
import styles from './index.less';

interface LogoutProps {
  logout: Function;
}

const Logout: React.FC<LogoutProps> = ({ logout }) => {
  return (
    <div className={styles.main}>
      <WingBlank size="lg">
        <Button type="primary" onClick={() => logout()}>
          退出登录
        </Button>
      </WingBlank>
    </div>
  );
};

export default Logout;
