import dayjs from 'dayjs';
import { DatePicker, message, Modal } from 'antd';
import { AddItemPriceInput } from '@pickk/common';

import { BaseForm } from '@components/common/organisms';

import { isBeforeDate, isDateIncluded, isSameDate } from '@src/common/helpers';

import StartAtInput from './start-at-input';

import {
  useAddItemPrice,
  useSellerPickkDiscountRate,
  useUpdateItemPrice,
} from './hooks';
import { PriceEditModalProps } from './price-edit-modal.types';

import { priceEditFormItems } from './form-items';

export default function PriceEditModal({
  type,
  itemId,
  sellerId,
  prices,
  selectedPriceRecord,
  visible,
  onClose,
}: PriceEditModalProps) {
  const { addItemPrice } = useAddItemPrice();
  const { updateItemPrice } = useUpdateItemPrice();
  const { data: pickkDiscountRate } = useSellerPickkDiscountRate(sellerId);

  const handleAddItemPrice = async (addItemPriceInput: AddItemPriceInput) => {
    await addItemPrice(itemId, {
      ...addItemPriceInput,
      isCrawlUpdating: false,
      isActive: isSameDate(addItemPriceInput.startAt, new Date()),
    });

    message.success('새로운 가격을 추가했습니다.');
    onClose();
  };

  const handleUpdateItemPrice = async (formInput: AddItemPriceInput) => {
    const { isActive, ...updateItemPriceInput } = formInput;

    await updateItemPrice(selectedPriceRecord.id, updateItemPriceInput);

    message.success('가격을 수정했습니다.');
    onClose();
  };

  const [title, submitButtonText, defaultValue, handleSave]: [
    string,
    string,
    AddItemPriceInput,
    (input: AddItemPriceInput) => void
  ] =
    type === 'add'
      ? ['가격 추가', '추가', undefined, handleAddItemPrice]
      : ['가격 수정', '저장', selectedPriceRecord, handleUpdateItemPrice];

  const validateDate = (formInput: AddItemPriceInput): boolean => {
    const { startAt, endAt } = formInput;
    if (isBeforeDate(startAt, new Date())) {
      message.error('시작일은 금일 이전일 수 없습니다.');
      return false;
    }

    if (endAt && isBeforeDate(endAt, startAt)) {
      message.error('종료일이 시작일보다 전일 수 없습니다.');
      return false;
    }

    // 겹치는 기간을 가진 가격이 있는지 확인
    const hasOverlapPeriod = prices
      .filter(({ id }) => id !== selectedPriceRecord?.id)
      .find((price) => {
        const isStartAtIncluded = isDateIncluded(
          startAt,
          price.startAt,
          price.endAt
        );
        const isEndAtIncluded = isDateIncluded(
          endAt,
          price.startAt,
          price.endAt
        );
        const isIncludePrice =
          isDateIncluded(price.startAt, startAt, endAt) &&
          isDateIncluded(price.endAt, startAt, endAt);
        return isStartAtIncluded || isEndAtIncluded || isIncludePrice;
      });

    if (hasOverlapPeriod) {
      message.error('겹치는 기간을 갖는 가격이 존재합니다.');
      return false;
    }

    return true;
  };

  const handleSaveButtonClick = async (value: {
    originalPrice: string;
    sellPrice: string;
    startAt: Date;
    endAt: Date;
  }) => {
    // if (!validateDate(value)) {
    //   return false;
    // }

    try {
      await handleSave({
        originalPrice: parseInt(value.originalPrice),
        sellPrice: parseInt(value.sellPrice),
        startAt: dayjs(value.startAt).startOf('day'),
        endAt: dayjs(value.endAt).endOf('day'),
        pickkDiscountRate,
        isCrawlUpdating: false,
      });
      return true;
    } catch (err: any) {
      message.error('가격 수정을 실패했습니다. err - ' + err);
    }
  };

  return (
    <Modal
      visible={visible}
      title={title}
      onCancel={onClose}
      footer={false}
      width="80%"
    >
      <p>[판매가에서 핔 할인률 {pickkDiscountRate}%가 적용됩니다.]</p>
      <BaseForm
        formItems={[
          ...priceEditFormItems,
          {
            name: 'startAt',
            label: '시작일',
            Component: (props) => (
              <StartAtInput {...props} hideCheckbox={type === 'edit'} />
            ),
            rules: [{ required: true, message: '시작일을 입력해주세요' }],
          },
          {
            name: 'endAt',
            label: '종료일',
            Component: DatePicker,
          },
        ]}
        defaultValue={{ ...defaultValue }}
        onSaveClick={handleSaveButtonClick}
      />
    </Modal>
  );
}
