import React, { useEffect, useState } from 'react';
import { queryRecommend } from '@/services/homeService';
import { WingBlank, Card, Grid } from 'antd-mobile';
import { DataItem } from 'antd-mobile/lib/grid/PropsType';
import { Link } from 'umi';

import styles from './index.less';

function node({ id, title, img }: DataItem) {
  return (
    <Link to={'/product/' + id}>
      <div className="oneRow">{title}</div>
      <img src={img} alt="" className={styles.nodeImg} />
    </Link>
  );
}

const Recommend = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    queryRecommend().then(res => {
      setList(res.list.data);
    });
  }, []);

  return (
    <>
      <WingBlank size="lg" className={styles.main}>
        <Card>
          <Card.Header title="好货推荐" />
          <Grid
            data={list.splice(0, 6)}
            columnNum={3}
            renderItem={data => node({ ...data })}
          />
        </Card>
      </WingBlank>
      <WingBlank size="lg" className={styles.main2}>
        <Card>
          <Card.Header title="猜你喜欢" />
          <Grid
            data={list.splice(6)}
            columnNum={2}
            renderItem={data => node({ ...data })}
          />
        </Card>
      </WingBlank>
    </>
  );
};

export default Recommend;
