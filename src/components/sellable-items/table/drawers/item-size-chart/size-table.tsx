import { Typography } from 'antd';
import { ItemSizeChart } from '@pickk/common';

const { Text } = Typography;

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

    return ['', ...labels].map((label) => <th key={label}>{label}</th>);
  };

  const renderSizeRows = () => {
    return sizes?.map((size) => (
      <tr key={size.name}>
        <td>{size.name}</td>
        {size.values.map((value) => (
          <td key={value}>{value}</td>
        ))}
      </tr>
    ));
  };

  return (
    <table width="100%" style={{ borderCollapse: 'collapse' }}>
      <tr>{renderLabels()}</tr>
      {renderSizeRows()}
    </table>
  );
}
