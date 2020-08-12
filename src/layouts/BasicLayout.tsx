import React, { useEffect } from 'react';
import BottomNav from '@/components/BotomNav';
import { connect } from 'umi';
import { ConnectState, ConnectProps, UserModelState } from '@/models/connect';
import '@/statics/iconfont/iconfont.css';
import styles from './BasicLayout.less';

interface BasicLayoutProps extends ConnectProps {
  user: UserModelState;
}

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const { children, location, dispatch, user } = props;
  const { pathname } = location;

  useEffect(() => {
    //获取用户基本信息
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }, []);

  console.log(props);
  return (
    <div className={styles.main}>
      <article>{children}</article>
      <BottomNav pathname={pathname} />
    </div>
  );
};

export default connect(({ user }: ConnectState) => ({ user }))(BasicLayout);
