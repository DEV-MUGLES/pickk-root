import {Form, Button} from 'antd';
import {PlusOutlined} from '@ant-design/icons';

export type OptionAddButtonProps = {
  onAddClick: () => void;
};

export default function OptionAddButton({onAddClick}: OptionAddButtonProps) {
  return (
    <Form.Item>
      <Button type="ghost" onClick={onAddClick} block icon={<PlusOutlined />}>
        옵션 추가
      </Button>
    </Form.Item>
  );
}
