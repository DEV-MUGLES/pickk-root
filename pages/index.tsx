import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <h1>루트 어드민 페이지에 당도한 것을 환영하오</h1>
      <Link href="/images-upload">이미지업로드하러가기</Link>
    </div>
  );
}
