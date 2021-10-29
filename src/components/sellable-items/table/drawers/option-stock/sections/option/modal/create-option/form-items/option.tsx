import { Form, Input, Button, Divider, Modal } from 'antd';
import { FormListFieldData } from 'antd/lib/form/FormList';

import OptionValueFormItem from './option-value';
import OptionValueAddButton from './option-value-add-button';

const { confirm } = Modal;

export type OptionFormItemProps = Pick<
  FormListFieldData,
  'key' | 'name' | 'fieldKey'
> & {
  onRemoveClick: () => void;
};

export default function OptionFormItem(props: OptionFormItemProps) {
  const { key, name, fieldKey, onRemoveClick } = props;

  const handleRemoveClick = () => {
    confirm({
      content: `선택한 옵션을 삭제 하시겠습니까?`,
      okText: '예',
      okType: 'danger',
      cancelText: '아니오',
      async onOk() {
        onRemoveClick();
      },
    });
  };

  return (
    <>
      <Form.Item
        key={key}
        label="옵션명"
        name={[name, 'name']}
        fieldKey={[fieldKey, 'name']}
        rules={[{ required: true, message: '옵션명을 입력해주세요' }]}
        style={{
          width: '100%',
          marginRight: '1.2rem',
        }}
      >
        <Input placeholder="옵션명" />
      </Form.Item>
      <Form.Item
        label="옵션값 및 옵션별 추가금"
        name={[name, 'values']}
        fieldKey={[fieldKey, 'values']}
      >
        <Form.List name={[name, 'values']}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((props) => (
                <OptionValueFormItem
                  key={props.key}
                  {...props}
                  onRemoveClick={() => remove(props.name)}
                />
              ))}
              <OptionValueAddButton onAddClick={add} />
            </>
          )}
        </Form.List>
      </Form.Item>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'end',
          marginBottom: '0.8rem',
        }}
      >
        <Button type="ghost" danger onClick={handleRemoveClick}>
          옵션 삭제
        </Button>
      </div>
      <Divider />
    </>
  );
}
