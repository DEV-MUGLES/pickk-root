import { useState } from 'react';
import { Button, Typography } from 'antd';
import { ItemCategory } from '@pickk/common';

import { CategoryModal } from '@components/items';

const { Text } = Typography;

export type CategoryRendererProps = {
  id: number;
  majorCategory: Pick<ItemCategory, 'id' | 'name'>;
  minorCategory: Pick<ItemCategory, 'id' | 'name'>;
};

export default function CategoryRenderer(props: CategoryRendererProps) {
  const { id, majorCategory, minorCategory } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Text>
          {majorCategory?.name ?? '-'}/{minorCategory?.name ?? '-'}
        </Text>
        <Button
          size="small"
          onClick={openModal}
          style={{ marginTop: '0.4rem' }}
        >
          수정
        </Button>
      </div>
      {isModalOpen && (
        <CategoryModal
          itemId={id}
          defaultCategory={{
            majorCategoryId: majorCategory?.id,
            minorCategoryId: minorCategory?.id,
          }}
          visible={isModalOpen}
          onClose={closeModal}
        />
      )}
    </>
  );
}
