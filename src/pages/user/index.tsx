import React, { useEffect } from 'react';
import { connect } from 'umi';
import { ConnectState, UserModelState, ConnectProps } from '@/models/connect';
import Header from './Header';
import MyList from './MyList';
import Logout from './Logout';

interface UserProps extends ConnectProps {
  user: UserModelState;
}

const User: React.FC<UserProps> = ({ user, dispatch }) => {
  useEffect(() => {
    dispatch({ type: 'user/queryDetail' });
  }, []);

  const logut = () => {
    dispatch({ type: 'user/logout' });
  };

  const { name, icon } = user.detail;
  return (
    <div>
      <Header name={name} icon={icon} />
      <MyList />
      <Logout logout={logut} />
    </div>
  );
};

export default connect(({ user }: ConnectState) => ({ user }))(User);
