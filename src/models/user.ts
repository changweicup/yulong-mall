import { Effect, Reducer } from 'umi';
import { queryCurrent } from '@/services/userService';

export interface CurrentUser {
  name?: string;
  icon?: string;
  userId?: string;
}

export interface UserModelState {
  currentUser: CurrentUser;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetchCurrent(_, { call, put }) {
      const res = yield call(queryCurrent);
      console.log('res' + res);
      yield put({
        type: 'saveCurrentUser',
        payload: { currentUser: { ...res } },
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
export default UserModel;
