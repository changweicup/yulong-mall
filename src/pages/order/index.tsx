import React, { PureComponent, ReactNode } from 'react';
import { WingBlank, WhiteSpace } from 'antd-mobile';
import { query } from '@/services/orderService';
import { CartProductType } from '@/@types/product';
import List from './List';

interface OListProps {}
interface OListState {
  data: CartProductType[];
}

class OList extends PureComponent<OListProps, OListState> {
  state: OListState = {
    data: [],
  };
  componentDidMount() {
    query().then(res => {
      this.setState({ data: res.list.data });
    });
  }

  render() {
    const { data } = this.state;
    return (
      <WingBlank size="lg">
        <WhiteSpace />
        <List data={data} />
      </WingBlank>
    );
  }
}

export default OList;
