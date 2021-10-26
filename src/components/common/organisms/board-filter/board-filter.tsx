import { useEffect } from 'react';
import { Typography, Button, Space, Form } from 'antd';
import { palette } from '@pickk/design-token';

import { BoardFilterProps } from './board-filter.types';

const { Title } = Typography;

export default function BoardFilter(props: BoardFilterProps) {
  const { defaultFilter = {}, onFilterChange, inputs } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(defaultFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultFilter]);

  const handleSubmit = (newFilter: any) => {
    Object.keys(newFilter).map((key) => {
      if (newFilter[key] === undefined) {
        delete newFilter[key];
      }
    });

    onFilterChange(newFilter);
  };

  const initFilter = () => {
    form.resetFields();
  };

  const renderInputs = () => {
    return inputs.map(({ name, label, Component }) => (
      <Form.Item key={label} name={name} label={label}>
        <Component />
      </Form.Item>
    ));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '0.8rem 1.2rem',
        marginBottom: '0.8rem',
        backgroundColor: palette.white,
      }}
    >
      <Title level={5}>필터</Title>
      <Form
        form={form}
        onFinish={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '0.8rem 4rem',
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
          <Button onClick={initFilter}>초기화</Button>
        </Space>
      </Form>
    </div>
  );
}
