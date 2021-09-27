import { ChangeEvent } from 'react';
import { useRouter } from 'next/router';

import { LoginFormType, useLoginForm } from './hooks';

export default function LoginFormContainer() {
  const router = useRouter();
  const { form, setValue, isReady, submit } = useLoginForm();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue(name as keyof LoginFormType, value);
  };

  const renderInput = (name: keyof LoginFormType, value: string) => {
    return (
      <>
        <label htmlFor={name}>{name}</label>
        <input
          id={name}
          type={name === 'password' ? 'password' : 'text'}
          name={name}
          value={value}
          onChange={handleInputChange}
        />
      </>
    );
  };

  const redirect = () => {
    router.push(router.query?.to?.toString() ?? '/');
  };

  const handleSubmit = async () => {
    try {
      await submit();
      alert('성공~');
      redirect();
    } catch {
      alert('로그인 실패했습니다.');
    }
  };

  return (
    <>
      {renderInput('code', form.code!)}
      {renderInput('password', form.password!)}
      <button disabled={!isReady} onClick={handleSubmit}>
        로그인
      </button>
    </>
  );
}
