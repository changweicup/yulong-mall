import React, { useEffect, useRef, useState, useCallback } from 'react';
import { InputItem, Button } from 'antd-mobile';
import { history } from 'umi';
import styles from './index.less';

interface SearchInputProps {
  queryList: Function;
}

const SearchInput: React.FC<SearchInputProps> = props => {
  const inputRef = useRef<any>(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const [input, setInput] = useState('');

  const inputChange = useCallback((val: string) => {
    setInput(val);
  }, []);

  const [searchMode, setSearchMode] = useState(false);
  const handle = () => {
    if (searchMode) {
      // 搜索
      const val = input.trim();
      props.queryList({ searchKey: val, pageNo: 0 });
    } else {
      history.push('/');
    }
  };

  useEffect(() => {
    const val = input.trim();
    setSearchMode(val !== '');
  }, [input]);

  return (
    <div className={styles.main}>
      <InputItem
        ref={inputRef}
        value={input}
        onChange={inputChange}
        className={styles.searchBar}
        clear
      />
      <Button type="primary" onClick={handle} className={styles.btn}>
        {searchMode ? '搜索' : '取消'}
      </Button>
    </div>
  );
};

export default SearchInput;
