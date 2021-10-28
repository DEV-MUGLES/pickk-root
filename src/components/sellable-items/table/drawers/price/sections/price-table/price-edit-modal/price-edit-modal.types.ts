import { ItemPrice, Item } from '@pickk/common';

export type PriceEditModalType = 'add' | 'edit';
export type PriceEditModalProps = {
  type: PriceEditModalType;
  visible: boolean;
  onClose: () => void;
  selectedPriceRecord: ItemPrice;
  itemId: number;
  sellerId: number;
} & Pick<Item, 'prices'>;
