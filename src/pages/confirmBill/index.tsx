import React, { PureComponent, ReactNode } from 'react';
import { WingBlank, WhiteSpace, Toast } from 'antd-mobile';
import ReceivingInfo, { ReceivingInfoType } from './ReceivingInfo';
import styles from './index.less';
import { connect } from 'umi';
import { getDefaultReceivingInfo } from '@/services/confirmBill';
import { ConnectProps, ConnectState, CartModelState } from '@/models/connect';
import ListNode from './ListNode';
import PayBar from './PayBar';

interface ConFirmBillProps extends ConnectProps {
  cart: CartModelState;
}
interface ConFirmBillState {
  receivingInfo: ReceivingInfoType;
}

class ConFirmBill extends PureComponent<ConFirmBillProps, ConFirmBillState> {
  state: ConFirmBillState = {
    receivingInfo: {
      name: '',
      tel: '',
      address: '',
    },
  };
  componentDidMount() {
    const { data } = this.props.cart;
    if (data.length === 0) {
      Toast.info('请重新进入确认订单页面！');
      history.go(-1);
    } else {
      getDefaultReceivingInfo().then(res => {
        this.setState({
          receivingInfo: { ...res },
        });
      });
    }
  }
  render() {
    const { receivingInfo } = this.state;
    const { data } = this.props.cart;
    let totalPrice = 0,
      allCount = 0;
    const getList = data.map(item => {
      if (item.checked) {
        totalPrice += item.price * item.count;
        allCount += item.count;
      }
      return <ListNode key={item.id} {...item} />;
    });
    return (
      <WingBlank size="lg">
        <WhiteSpace size="lg" />
        <ReceivingInfo {...receivingInfo} />
        <WhiteSpace size="lg" />
        <div>{getList}</div>
        <PayBar totalPrice={totalPrice} count={allCount} />
      </WingBlank>
    );
  }
}

export default connect(({ cart }: ConnectState) => ({ cart }))(ConFirmBill);
