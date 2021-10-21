import { stringSorter } from '@common/helpers';
import { SelectInput, SelectInputProps } from '@components/common/molecules';

import { useBrands } from './hooks';

/**
 * showSearch가 value만 검색 가능하므로
 * value를 nameKor로 설정하고, 매핑 함수를 추가한다
 * */
export default function BrandSelector(
  props: Omit<SelectInputProps, 'options'>
) {
  const { data: brands = [] } = useBrands();

  const brandNameKor2Id = (nameKor: string): number => {
    if (!nameKor) {
      return undefined;
    }

    return brands.find((brand) => brand.nameKor === nameKor)?.id;
  };

  const brandId2NameKor = (id: number): string => {
    if (!id) {
      return undefined;
    }

    return brands.find((brand) => brand.id === id)?.nameKor;
  };

  return (
    <SelectInput
      {...props}
      value={brandId2NameKor(props.value as number)}
      onChange={(value) => props.onChange(brandNameKor2Id(value as string))}
      options={[...brands]
        .sort((a, b) => stringSorter(a.nameKor, b.nameKor))
        .map(({ nameKor }) => ({
          label: nameKor,
          value: nameKor,
        }))}
      showSearch
    />
  );
}
