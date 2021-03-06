import React from 'react';
import { InputItem, Button, WingBlank, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';

interface LoginFormProps {
  form: {
    getFieldProps: Function;
    getFieldsValue: Function;
  };
  handleSubmit: Function;
}

const LoginForm: React.FC<LoginFormProps> = ({ form, handleSubmit }) => {
  const { getFieldProps, getFieldsValue } = form;
  const submit = () => {
    // 登录
    let values = getFieldsValue();
    handleSubmit(values);
  };

  return (
    <WingBlank size="lg">
      <WhiteSpace size="lg" />
      <InputItem
        {...getFieldProps('name')}
        type="text"
        placeholder="请输入账号"
        clear
      >
        账号
      </InputItem>
      <InputItem
        {...getFieldProps('password')}
        type="password"
        placeholder="请输入密码"
        clear
      >
        密码
      </InputItem>
      <WhiteSpace size="lg" />
      <Button type="primary" onClick={submit}>
        登录
      </Button>
    </WingBlank>
  );
};

export default createForm()(LoginForm);
