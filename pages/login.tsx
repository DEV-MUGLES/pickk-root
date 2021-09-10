import { LoginFormContainer } from '@containers/login';

export default function LoginPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      로그인페이지에 온 것을 환영한다.
      <LoginFormContainer />
    </div>
  );
}
