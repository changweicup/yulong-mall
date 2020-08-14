import React from 'react';
import styles from './index.less';
import { connect, Redirect } from 'umi';
import { ConnectState, ConnectProps, UserModelState } from '@/models/connect';
import { LoginParams } from '@/services/loginService';
import LoginForm from './LoginForm';

interface LoginProps extends ConnectProps {
  user: UserModelState;
}

const Login: React.FC<LoginProps> = ({ user, location, dispatch }) => {
  const { userId } = user.currentUser;
  const isLogin = !!userId;

  if (isLogin) {
    const { from = '/' } = location.state || {};
    return <Redirect to={from} />;
  }

  const handleSubmit = (values: LoginParams) => {
    // 登录请求
    dispatch({ type: 'user/login', payload: values });
  };
  return (
    <div className={styles.main}>
      <div className={styles.logo}></div>
      <LoginForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default connect(({ user }: ConnectState) => ({ user }))(Login);
