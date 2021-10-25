import { Button, Image } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { ItemDataType } from '@containers/items/hooks';
import { renderBoolean, renderDate, renderPrice } from '@src/common/helpers';

export const itemsColumns: ColumnsType<ItemDataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 40,
    align: 'center',
  },
  {
    title: '상세보기',
    dataIndex: 'itemView',
    key: 'itemView',
    width: 40,
    render: (_, { id, urls }) => (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Button
          size="small"
          href={`https://pickk.one/item/${id}`}
          target="_blank"
          style={{ marginBottom: '0.2rem' }}
        >
          pickk 링크
        </Button>
        <Button
          type="link"
          href={urls.find((url) => url.isPrimary)?.url}
          target="_blank"
        >
          공홈 링크
        </Button>
      </div>
    ),
    align: 'center',
  },
  {
    title: '대표이미지',
    dataIndex: 'imageUrl',
    key: 'imageUrl',
    render: (text) => <Image src={text} alt="대표이미지" />,
    width: 120,
  },
  {
    title: '상품명',
    dataIndex: 'name',
    key: 'name',
    width: 240,
  },
  {
    title: '브랜드',
    dataIndex: 'brandNameKor',
    key: 'brandNameKor',
    width: 100,
    render: (_, { brand }) => brand.nameKor,
  },
  {
    title: '정가',
    dataIndex: 'originalPrice',
    key: 'originalPrice',
    render: renderPrice,
    ellipsis: true,
    align: 'center',
  },
  {
    title: '판매가',
    dataIndex: 'sellPrice',
    key: 'sellPrice',
    render: renderPrice,
    ellipsis: true,
    align: 'center',
  },
  {
    title: '활성화 여부',
    dataIndex: 'isSellable',
    key: 'isSellable',
    render: renderBoolean,
    align: 'center',
  },
  {
    title: '상품등록일',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: renderDate,
    ellipsis: true,
  },
];
