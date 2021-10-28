import {Form, Button} from 'antd';
import {PlusOutlined} from '@ant-design/icons';

export type OptionValueAddButtonProps = {
  onAddClick: () => void;
};

export default function OptionValueAddButton({
  onAddClick,
}: OptionValueAddButtonProps) {
  return (
    <Form.Item>
      <Button type="dashed" onClick={onAddClick} block icon={<PlusOutlined />}>
        옵션값 추가
      </Button>
    </Form.Item>
  );
}
