import { BoardTemplate } from '@components/common/templates';
import { completedRefundRequestsTableColumns } from '@components/completed-refund-requests';
import { confirmedRefundRequestsFilterInputs } from '@components/completed-refund-requests/filter';

import { useCopmletedRefundRequests } from './hooks';

export default function CompletedRefundRequestListBoardContainer() {
  return (
    <BoardTemplate
      title="완료된 반품신청내역"
      subTitle="반품완료 상태인 건들만 표시됩니다."
      useTableData={useCopmletedRefundRequests}
      columns={completedRefundRequestsTableColumns}
      filterInputs={confirmedRefundRequestsFilterInputs}
    />
  );
}
