import { OrderItemClaimStatus } from '@pickk/common';

import { SelectInput, SelectInputProps } from '@components/common/molecules';

import { getOrderItemClaimStatusDisplayName } from '@common/helpers';

export default function SettleStatusSelect(
  props: Omit<SelectInputProps, 'options'>
) {
  return (
    <SelectInput
      {...props}
      options={Object.keys(OrderItemClaimStatus).map((status) => ({
        label: getOrderItemClaimStatusDisplayName(
          status as OrderItemClaimStatus
        ),
        value: status,
      }))}
    />
  );
}
