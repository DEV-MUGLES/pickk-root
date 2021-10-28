import { useEffect } from 'react';
import { Button, Space, Form } from 'antd';

import { BaseFormProps } from './base-form.types';

export default function BaseForm(props: BaseFormProps) {
  const { formItems, defaultValue, onSaveClick } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  const handleSubmit = async (value: unknown) => {
    if (!confirm(`정말로 제출하시겠습니까?`)) {
      return;
    }

    const result = await onSaveClick(value);

    if (result) {
      form.resetFields();
    }
  };

  const renderInputs = () => {
    return formItems.map(({ Component, ...formItem }) => (
      <Form.Item key={formItem.label} {...formItem}>
        <Component />
      </Form.Item>
    ));
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {renderInputs()}
      <Space
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Button htmlType="submit" type="primary">
          적용
        </Button>
      </Space>
    </Form>
  );
}
