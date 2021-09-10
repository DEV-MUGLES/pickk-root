import Link from 'next/link';
import { User } from '@pickk/common';

import { useRefreshJwtToken } from '@common/hooks';

export type HomePageProps = {
  me?: User;
};

export default function HomePage({ me }: HomePageProps) {
  useRefreshJwtToken();

  return (
    <div>
      <h1>
        {me.nickname}님 안녕하세요! {getRandomMessage()}
      </h1>
      <Link href="/images-upload">이미지업로드하러가기</Link>
    </div>
  );
}

const getRandomMessage = () => {
  const index = Math.floor(Math.random() * GREETING_MESSEGES.length);

  return GREETING_MESSEGES[index];
};

const GREETING_MESSEGES = [
  '좋은 하루 되세요 ㅎㅎ',
  '즐거운 하루 되세요 😸',
  '항상 감사합니다 🥰',
  '화이팅 넘치는 하루 보내세요~',
  '오늘 메뉴는 부리또 어떤가요? 😂',
  '😃😃😄😁😆',
];
