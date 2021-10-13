import { useUpdateMyPassword } from '@common/hooks';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';

export default function MyPage() {
  const router = useRouter();
  const { updateMyPassword } = useUpdateMyPassword();

  const [form, setForm] = useState<{
    oldPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
  }>({ oldPassword: '', newPassword: '', newPasswordConfirm: '' });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const renderInput = (name: string, value: string) => {
    return (
      <>
        <label htmlFor={name}>{name}</label>
        <input
          id={name}
          type="password"
          name={name}
          value={value}
          onChange={handleInputChange}
        />
      </>
    );
  };

  const handleSubmit = async () => {
    if (form.newPassword !== form.newPasswordConfirm) {
      alert('새로운 비밀번호(확인)이 새로운 비밀번호와 일치하지 않습니다.');
      return;
    }
    try {
      await updateMyPassword(form.oldPassword, form.newPassword);
      alert('변경되었습니다.');
      router.back();
    } catch (err) {
      alert('실패했습니다.' + err);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {renderInput('oldPassword', form.oldPassword)}
      {renderInput('newPassword', form.newPassword)}
      {renderInput('newPasswordConfirm', form.newPasswordConfirm)}
      <Button
        disabled={
          !form.oldPassword ||
          !form.newPassword ||
          form.newPassword !== form.newPasswordConfirm
        }
        onClick={handleSubmit}
      >
        변경하기
      </Button>
    </div>
  );
}
