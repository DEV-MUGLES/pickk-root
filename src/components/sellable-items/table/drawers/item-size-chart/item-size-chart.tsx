import { ReactNode } from 'react';
import { Collapse, Drawer, Space, Button, message } from 'antd';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import { ItemSizeChart } from '@pickk/common';

import { useToggleModals } from '@common/hooks';

import ItemSizeTable from './size-table';
import { ItemSizeTableModal } from './modals';

import {
  useCreateSizeChart,
  useItemSizeChart,
  useUpdateSizeChart,
  useRemoveSizeChart,
} from './hooks';

const StyledSection = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => (
  <Collapse defaultActiveKey="1">
    <CollapsePanel key="1" header={title}>
      <Space direction="vertical" style={{ width: '100%' }}>
        {children}
      </Space>
    </CollapsePanel>
  </Collapse>
);

type ItemSizeChartInput = Pick<
  ItemSizeChart,
  'labels' | 'sizes' | 'recommendations'
>;

type ItemSizeChartDrawerProps = {
  itemId: number;
  visible: boolean;
  onClose: () => void;
};

export default function ItemSizeChartDrawer({
  itemId,
  visible,
  onClose,
}: ItemSizeChartDrawerProps) {
  const { data: sizeChart } = useItemSizeChart(itemId);

  const { isModalOpen, openModal, closeModal } = useToggleModals([
    'sizeTable',
    'recommendations',
  ]);

  const { createSizeChart } = useCreateSizeChart();
  const { updateSizeChart } = useUpdateSizeChart();
  const { removeSizeChart } = useRemoveSizeChart();

  const handleItemSizeTableModalSubmit = async (input: ItemSizeChartInput) => {
    try {
      if (!sizeChart) {
        await createSizeChart(itemId, input);
      } else {
        await updateSizeChart(itemId, input);
      }

      return true;
    } catch (error) {
      message.error('실패했습니다. - ' + error);
      return false;
    }
  };

  const handleRemoveClick = async () => {
    if (
      !confirm(
        '사이즈 정보를 삭제하시겠습니까? (삭제 시 추천사이즈도 모두 초기화됩니다)'
      )
    ) {
      return;
    }
    try {
      await removeSizeChart(itemId);
    } catch (error) {
      message.error('실패했습니다. - ' + error);
    }
  };

  return (
    <Drawer visible={visible} onClose={onClose} width={'60%'} closeIcon={null}>
      <Space direction="vertical" style={{ width: '100%' }} size="small">
        <StyledSection title="실측 사이즈">
          <Space>
            <Button onClick={() => openModal('sizeTable')}>
              사이즈 {!!sizeChart ? '수정' : '등록'}
            </Button>
            {!!sizeChart && (
              <Button danger onClick={handleRemoveClick}>
                사이즈 삭제
              </Button>
            )}
          </Space>
          <ItemSizeTable {...sizeChart} />
          {isModalOpen.sizeTable && (
            <ItemSizeTableModal
              itemSizeChart={sizeChart}
              visible={isModalOpen.sizeTable}
              onClose={() => closeModal('sizeTable')}
              onSubmit={handleItemSizeTableModalSubmit}
            />
          )}
        </StyledSection>
      </Space>
    </Drawer>
  );
}
