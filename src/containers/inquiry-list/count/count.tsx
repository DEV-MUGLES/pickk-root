import dayjs from 'dayjs';

import { useRootInquiriesCount } from './hooks';

export default function InquiryListCountContainer() {
  const counts = useRootInquiriesCount();

  if (!counts) {
    return null;
  }

  return (
    <>
      <h3>
        미답변: {counts.delayed}, 미답변(1일 이상 지남): {counts.not_answered}
      </h3>
      <h4>
        {dayjs(counts.lastUpdatedAt).format('YY.MM.DD hh:mm:ss')}에 갱신됨 (캐싱
        5분)
      </h4>
    </>
  );
}
