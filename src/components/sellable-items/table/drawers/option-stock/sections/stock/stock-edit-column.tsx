import { ChangeEvent, useEffect, useState } from 'react';
import { Button, Input, message, Space, Typography } from 'antd';
import { ButtonType } from 'antd/lib/button';

import { useUpdateProduct } from './hooks';

const { Text } = Typography;

export type StockEditColumnProps = {
  productId: number;
  defaultStock: number;
  isInfiniteStock: boolean;
};

function StockEditColumn({
  productId,
  defaultStock,
  isInfiniteStock,
}: StockEditColumnProps) {
  const [isEditable, setIsEditable] = useState(false);
  const [stock, setStock] = useState<number>(defaultStock);
  const { updateProduct } = useUpdateProduct();

  useEffect(() => {
    setStock(defaultStock);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultStock]);

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleSaveClick = async () => {
    try {
      await updateProduct(productId, stock);

      setIsEditable(false);
    } catch (err) {
      message.error('재고 수정에 실패했습니다. err - ' + err);
    }
  };

  const [handleSubmit, buttonType, buttonText]: [
    () => void,
    ButtonType,
    string
  ] = isEditable
    ? [handleSaveClick, 'primary', '저장']
    : [handleEditClick, 'default', '수정'];

  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    const newStock = parseInt(value || '0', 10);
    if (Number.isNaN(newStock)) {
      return;
    }

    setStock(newStock);
  };

  const handleCancle = () => {
    setStock(defaultStock);
    setIsEditable(false);
  };

  if (isInfiniteStock) {
    return <>무한재고 ✅</>;
  }

  const StockInfo = (
    <>
      {isEditable && (
        <Input value={stock} onChange={handleChange} size="small" />
      )}
      {!isEditable && <Text>{stock} 개</Text>}
    </>
  );

  return (
    <>
      {StockInfo}
      <Space style={{ display: 'flex', marginTop: '0.4rem' }}>
        <Button onClick={handleSubmit} type={buttonType} size="small">
          {buttonText}
        </Button>
        {isEditable && (
          <Button onClick={handleCancle} size="small">
            취소
          </Button>
        )}
      </Space>
    </>
  );
}

export default StockEditColumn;
