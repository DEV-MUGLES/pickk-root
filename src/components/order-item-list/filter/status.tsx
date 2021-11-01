import { OrderItemStatus } from '@pickk/common';

import { SelectInput, SelectInputProps } from '@components/common/molecules';

import { getOrderItemStatusDisplayName } from '@common/helpers';

export default function StatusSelect(props: Omit<SelectInputProps, 'options'>) {
  return (
    <SelectInput
      {...props}
      options={Object.keys(OrderItemStatus).map((status) => ({
        label: getOrderItemStatusDisplayName(status as OrderItemStatus, false),
        value: status,
      }))}
    />
  );
}
