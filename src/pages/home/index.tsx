import React from 'react';
import SearchInput from './SearchInput';
import Carousel from './Carousel';
import NavTable from './NavTable';
import Recommend from './Recommend';
import Arc from '@/components/Arc';

import styles from './index.less';

export default () => {
  return (
    <div className={styles.main}>
      <SearchInput />
      <Carousel />
      <Arc />
      <NavTable />
      <Recommend />
    </div>
  );
};
