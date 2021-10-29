import { ColumnsType } from 'antd/lib/table';

import { itemsColumns, CategoryRenderer } from '@components/items';

import { ItemDataType } from '@containers/items/hooks';

export const useItemsColumns = () => {
  const newItemsColumns: ColumnsType<ItemDataType> = [
    ...itemsColumns.slice(0, 3),
    {
      title: '카테고리',
      dataIndex: 'category',
      key: 'category',
      render: (_, props) => <CategoryRenderer {...props} />,
      width: 100,
      ellipsis: true,
      align: 'center',
    },
    ...itemsColumns.slice(3),
  ];

  return { itemsColumns: newItemsColumns };
};
