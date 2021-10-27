import styled from 'styled-components';
import { Typography } from 'antd';
import { ItemSizeChart } from '@pickk/common';
import { palette } from '@pickk/design-token';

const { Text } = Typography;

const StyledTable = styled.table`
  width: 100%;
`;

const StyledTr = styled.tr`
  display: flex;
  flex-direction: row;

  border-bottom: 1px solid ${palette.gray2};
`;

const StyledTh = styled.td`
  flex: 1;
  font-weight: 700;
`;

const StyledTd = styled.td`
  flex: 1;
`;

type ItemSizeTableProps = Pick<ItemSizeChart, 'id' | 'labels' | 'sizes'>;

export default function ItemSizeTable(props: ItemSizeTableProps) {
  const { labels = [], sizes = [] } = props;

  if (!props.id) {
    return <Text>등록된 실측 사이즈가 없습니다.</Text>;
  }

  const renderLabels = () => {
    if (!labels?.length) {
      return null;
    }

    return ['', ...labels].map((label) => (
      <StyledTh key={label}>{label}</StyledTh>
    ));
  };

  const renderSizeRows = () => {
    return sizes?.map((size) => (
      <StyledTr key={size.name}>
        <StyledTd>{size.name}</StyledTd>
        {size.values.map((value) => (
          <StyledTd key={value}>{value}</StyledTd>
        ))}
      </StyledTr>
    ));
  };

  return (
    <StyledTable>
      <StyledTr>{renderLabels()}</StyledTr>
      {renderSizeRows()}
    </StyledTable>
  );
}
