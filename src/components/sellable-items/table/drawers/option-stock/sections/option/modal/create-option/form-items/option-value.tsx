import {MinusCircleOutlined} from '@ant-design/icons';
import {Form, Input, Space} from 'antd';
import {FormListFieldData} from 'antd/lib/form/FormList';

export type OptionValueFormItemProps = FormListFieldData & {
  onRemoveClick: () => void;
};

export default function OptionValueFormItem(props: OptionValueFormItemProps) {
  const {key, name, fieldKey, onRemoveClick} = props;

  return (
    <Space
      key={key}
      style={{display: 'flex', marginBottom: 8}}
      align="baseline"
      size="middle">
      <Form.Item
        name={[name, 'name']}
        fieldKey={[fieldKey, 'name']}
        rules={[{required: true, message: '옵션값을 입력해주세요'}]}>
        <Input placeholder="옵션값" />
      </Form.Item>
      <Form.Item
        name={[name, 'priceVariant']}
        fieldKey={[fieldKey, 'priceVariant']}>
        <Input
          type="number"
          placeholder="미입력시 옵션별 추가금 0원"
          style={{width: '16rem'}}
        />
      </Form.Item>
      <MinusCircleOutlined onClick={onRemoveClick} />
    </Space>
  );
}
