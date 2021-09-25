import { BoardTemplate } from '@components/common/template';

import { inquiriesColumns } from '@components/inquiry-list';

import { useInquiries } from './hooks';

export default function InquiryListBoardContainer() {
  return (
    <BoardTemplate
      title="문의내역"
      subTitle="문의내역입니다."
      useBoardData={useInquiries}
      tableColumns={inquiriesColumns}
    />
  );
}
