import { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import { Modal, Space, Input, Divider, Typography } from 'antd';
import { ItemSizeChart } from '@pickk/common';

const { Text } = Typography;

const Label = ({
  title,
  children,
  guidText,
}: {
  title: string;
  children: ReactNode;
  guidText?: string;
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
    }}
  >
    <Text style={{ width: '10rem' }}>{title}</Text>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
      <Text type="secondary" style={{ marginTop: '0.4rem' }}>
        {guidText}
      </Text>
    </div>
  </div>
);

type ItemSizeChartInput = Pick<
  ItemSizeChart,
  'labels' | 'sizes' | 'recommendations'
>;

type ItemSizeTableModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (input: ItemSizeChartInput) => Promise<boolean>;
} & {
  itemSizeChart: ItemSizeChartInput;
};

export default function ItemSizeTableModal(props: ItemSizeTableModalProps) {
  const { itemSizeChart, visible, onClose, onSubmit } = props;

  const [labels, setLabels] = useState<string[]>([]);
  const [sizeNames, setSizeNames] = useState<string[]>([]);
  const [sizeValues, setSizeValues] = useState<string[][]>([]);

  useEffect(() => {
    setLabels(itemSizeChart?.labels ?? []);
    setSizeNames(itemSizeChart?.sizes?.map((v) => v.name) ?? []);
    setSizeValues(itemSizeChart?.sizes?.map((v) => v.values) ?? []);
  }, [itemSizeChart]);

  useEffect(() => {
    /**
     * 값이 있는 경우 디폴트값 설정이 덮어 씌워지지 않기 위해
     * 라벨과 사이즈 이름이 모두 없는 경우 새로운 빈 배열값을 할당하지 않는다.
     *  */
    if (!labels.length && !sizeNames.length) {
      return;
    }

    const nextSizeValues = [...Array(sizeNames.length)].map((_, i) =>
      [...Array(labels.length)].map((_, j) => sizeValues?.[i]?.[j] ?? '')
    );
    setSizeValues(nextSizeValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labels.length, sizeNames.length]);

  const handleLabelsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const labels = e.target.value.split(',').map((v) => v.trim());
    setLabels(labels);
  };

  const handleSizeNamesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const names = e.target.value.split(',').map((v) => v.trim());
    setSizeNames(names);
  };

  const handleSizeValuesChange = (i: number, j: number, value: string) => {
    const newValue = [...sizeValues];
    newValue[i][j] = value;
    setSizeValues(newValue);
  };

  const handleSubmit = async () => {
    if (!confirm('저장하시겠습니까?')) {
      return;
    }

    const result = await onSubmit({
      labels,
      sizes: sizeNames.map((name, i) => ({ name, values: sizeValues[i] })),
    });

    if (result) {
      onClose();
    }
  };

  const renderLabels = () => {
    return ['', ...labels].map((label) => <th key={label}>{label}</th>);
  };

  const renderSizeRows = () => {
    return sizeNames?.map((name, i) => (
      <tr key={name}>
        <td>{name}</td>
        {labels.map((_, j) => (
          <td key={`${i}_${j}`}>
            <Input
              value={sizeValues?.[i]?.[j] ?? ''}
              onChange={(e) => handleSizeValuesChange(i, j, e.target.value)}
            />
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      onOk={handleSubmit}
      closable={false}
      width="60%"
    >
      <Space direction="vertical">
        <Label
          title="사이즈 기준값"
          guidText="각각의 열은 ,로 구분합니다. (ex) 어깨, 가슴, 총장)"
        >
          <Input value={labels.join(',')} onChange={handleLabelsChange} />
        </Label>
        <Label
          title="사이즈 명"
          guidText="각각의 열은 ,로 구분합니다. (ex) S, M, L, XL)"
        >
          <Input value={sizeNames.join(',')} onChange={handleSizeNamesChange} />
        </Label>
        <Divider />
        <table width="100%">
          <tr>{renderLabels()}</tr>
          {renderSizeRows()}
        </table>
      </Space>
    </Modal>
  );
}
