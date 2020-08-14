import { Effect, Reducer } from 'umi';

export interface DemoModelState {}

export interface DemoModelType {
  namespace: 'demo';
  state: DemoModelState;
  effects: {
    fetch: Effect;
  };
  reducers: {
    save: Reducer<DemoModelState>;
  };
}

const DemoModel: DemoModelType = {
  namespace: 'demo',
  state: {},
  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({ type: 'save' });
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
export default DemoModel;
