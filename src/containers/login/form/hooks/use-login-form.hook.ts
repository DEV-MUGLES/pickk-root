import { useState } from 'react';
import { LoginByCodeInput } from '@pickk/common';

import { setCookie } from '@common/helpers';

import { useLoginByCode } from './use-login-by-code.hook';

export type LoginFormType = Pick<LoginByCodeInput, 'code' | 'password'>;

export const useLoginForm = () => {
  const [form, setForm] = useState<LoginFormType>(INITIAL_FORM);
  const { login } = useLoginByCode();

  const isReady = form.code !== '' && form.password !== '';

  const setValue = (name: keyof LoginFormType, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const submit = async () => {
    if (!isReady) {
      alert('code 또는 password가 입력되지 않았습니다.');
      return;
    }

    const jwtToken = await login(form);

    setCookie('accessToken', jwtToken.access);
    setCookie('refreshToken', jwtToken.refresh);
  };

  return { form, setValue, isReady, submit };
};

const INITIAL_FORM: LoginFormType = {
  code: '',
  password: '',
};
