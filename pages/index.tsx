import Link from 'next/link';

import { useRefreshJwtToken } from '@common/hooks';

export default function HomePage() {
  useRefreshJwtToken();

  return (
    <div>
      <h1>안녕하세요! {getRandomMessage()}</h1>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h3>일반</h3>
        <Link href="/my">👮 내정보수정</Link>
        <Link href="/images-upload">🖼 이미지업로드</Link>
        <h3>주문/판매</h3>
        <Link href="/inquiries">💬 문의내역</Link>
        <Link href="/order-items">🛍 주문상품내역</Link>
        <h3>정산</h3>
        <Link href="/confirmed-order-items">💰 구매확정 주문상품내역</Link>
        <Link href="/completed-refund-requests">💰 완료된 반품신청내역</Link>
        <h3>상품</h3>
        <Link href="/sellable-items">👕 활성 상품관리</Link>
        <Link href="/items">👖 전체 상품관리 </Link>
        <Link href="/item">👕 (임시) 상품 업데이트</Link>
        <h3>기획전</h3>
        <Link href="/exhibition/items">👕 아이템 기획전</Link>
      </div>
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
