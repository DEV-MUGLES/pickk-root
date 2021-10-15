import { useState } from 'react';
import { ColumnsType } from 'antd/lib/table';

import { SellableItemDataType } from '@containers/sellable-item-list/hooks';

import SellableItemManageButtons from '../sellable-item-manage-buttons';
import ItemCategory from '../item-category';

import { sellableItemColumns } from '../columns';

type SellableItemsDrawerType = 'price' | 'optionStock' | 'info';

export const useSellableItemColumns = () => {
  const [selectedRowId, setSelectedRowId] = useState(null);

  const [drawerVisible, setDrawerVisible] = useState<
    Record<SellableItemsDrawerType, boolean>
  >({
    price: false,
    optionStock: false,
    info: false,
  });
  const [isCategoryModalVisible, setIsCategoryModalVisible] =
    useState<boolean>(false);

  const handleDrawerOpen =
    (name: SellableItemsDrawerType) => (open: boolean) => () => {
      setDrawerVisible({
        ...drawerVisible,
        [name]: open,
      });
    };

  const openDrawer = (name: SellableItemsDrawerType) =>
    handleDrawerOpen(name)(true);

  const closeDrawer = (name: SellableItemsDrawerType) =>
    handleDrawerOpen(name)(false);

  const newSellableItemColumns: ColumnsType<SellableItemDataType> = [
    {
      title: '상품 관리',
      dataIndex: 'itemManage',
      key: 'itemManage',
      width: 100,
      render: (_, { id }) => (
        <SellableItemManageButtons
          buttons={[
            {
              label: '가격 관리',
              onClick: () => {
                setSelectedRowId(id);
                openDrawer('price')();
              },
            },
            {
              label: '옵션/재고 관리',
              onClick: () => {
                setSelectedRowId(id);
                openDrawer('optionStock')();
              },
            },
            {
              label: '정보 수정',
              onClick: () => {
                setSelectedRowId(id);
                openDrawer('info')();
              },
            },
          ]}
        />
      ),
    },
    ...sellableItemColumns.slice(0, 2),
    {
      title: '카테고리',
      dataIndex: 'category',
      key: 'category',
      width: 140,
      align: 'center',
      render: (_, { id, majorCategory, minorCategory }) => (
        <ItemCategory
          majorCategoryName={majorCategory?.name}
          minorCategoryName={minorCategory?.name}
          onUpdateClick={() => {
            setSelectedRowId(id);
            setIsCategoryModalVisible(true);
          }}
        />
      ),
    },
    ...sellableItemColumns.slice(2),
  ];

  return {
    sellableItemColumns: newSellableItemColumns,
    selectedRowId,
    isPriceManageVisible: drawerVisible.price,
    isOptionStockManageVisible: drawerVisible.optionStock,
    isInfoManageVisible: drawerVisible.info,
    isCategoryModalVisible,
    onPriceManageClose: closeDrawer('price'),
    onOptionStockManageClose: closeDrawer('optionStock'),
    onInfoManageClose: closeDrawer('info'),
    onCategoryModalClose: () => setIsCategoryModalVisible(false),
  };
};
