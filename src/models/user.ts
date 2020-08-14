import { Effect, Reducer } from 'umi';
import { Toast } from 'antd-mobile';
import {
  queryCurrent,
  queryDetail,
  fakeAccountLoginout,
} from '@/services/userService';
import { fakeAccountLogin } from '@/services/loginService';

interface CurrentUser {
  name?: string;
  icon?: string;
  userId?: string;
}

interface DetailUser {
  name: string;
  icon: string;
  userid: string;
  email: string;
  phone: string;
  address: string;
  signature?: string;
  title?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  country: string;
}

export interface UserModelState {
  currentUser: CurrentUser;
  detail:
    | DetailUser
    | {
        name: string;
        icon: string;
      };
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetchCurrent: Effect;
    login: Effect;
    queryDetail: Effect;
    logout: Effect;
  };
  reducers: {
    saveUser: Reducer<UserModelState>;
    clearUser: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    currentUser: {},
    detail: {
      name: '',
      icon: '',
    },
  },
  effects: {
    *fetchCurrent(_, { call, put }) {
      const res = yield call(queryCurrent);
      yield put({
        type: 'saveUser',
        payload: { currentUser: { ...res } },
      });
    },
    *login({ payload }, { call, put }) {
      const res = yield call(fakeAccountLogin, payload);
      if (res.status === 1) {
        yield put({
          type: 'saveUser',
          payload: { currentUser: { ...res } },
        });
      } else {
        Toast.fail(res.msg || '系统开小差，请稍后再试');
      }
    },
    *queryDetail(_, { call, put }) {
      const res = yield call(queryDetail);
      yield put({
        type: 'saveUser',
        payload: { detail: { ...res } },
      });
    },
    *logout(_, { call, put }) {
      const res = yield call(fakeAccountLoginout);
      yield put({
        type: 'clearUser',
        payload: { currentUser: {}, detail: { name: '', icon: '' } },
      });
    },
  },
  reducers: {
    saveUser(state, action) {
      return { ...state, ...action.payload };
    },
    clearUser(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
export default UserModel;
