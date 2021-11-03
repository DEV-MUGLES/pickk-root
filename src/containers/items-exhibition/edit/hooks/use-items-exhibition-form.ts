import { useEffect, useState } from 'react';
import { ItemsExhibition } from '@pickk/common';

import { useCreateItemsExhibition } from './create-root-items-exhibition';
import { useUpdateItemsExhibition } from './update-root-items-exhibition';
import { useItemsExhibition } from './use-items-exhibition';

export type ItemsExhibitionFormType = Pick<
  ItemsExhibition,
  | 'title'
  | 'description'
  | 'imageUrl'
  | 'imageTop'
  | 'imageRight'
  | 'backgroundColor'
  | 'order'
  | 'isVisible'
> & {
  itemIds: number[];
  itemIdsStr: string;
};

export const useItemsExhibitionForm = (id?: number) => {
  const { data: existing } = useItemsExhibition(id);

  const create = useCreateItemsExhibition();
  const update = useUpdateItemsExhibition();

  const [form, setForm] = useState<ItemsExhibitionFormType>(INITIAL_FORM);

  useEffect(() => {
    if (existing) {
      setForm(serialize(existing));
    }
  }, [existing]);

  const handleFieldChange = (
    fieldName: keyof ItemsExhibitionFormType,
    value: unknown
  ) => {
    setForm({
      ...form,
      [fieldName]: value,
      itemIds:
        fieldName === 'itemIdsStr'
          ? (value as string).split(',').map((v) => Number(v.trim()))
          : form.itemIds,
    });
  };

  const submit = async () => {
    const { itemIdsStr, ...input } = form;

    if (existing) {
      await update(id, input);
    } else {
      await create(input);
    }
  };

  return { form, handleFieldChange, submit };
};

const INITIAL_FORM: ItemsExhibitionFormType = {
  title: null,
  description: null,
  imageUrl: null,
  imageTop: null,
  imageRight: null,
  backgroundColor: null,
  order: null,
  isVisible: true,
  itemIds: [],
  itemIdsStr: '',
};

const serialize = (input: ItemsExhibition): ItemsExhibitionFormType => ({
  title: input.title,
  description: input.description,
  imageUrl: input.imageUrl,
  imageTop: input.imageTop,
  imageRight: input.imageRight,
  backgroundColor: input.backgroundColor,
  order: input.order,
  isVisible: input.isVisible,
  itemIds: input.items.map((v) => v.id),
  itemIdsStr: input.items.map((v) => v.id).join(', '),
});
