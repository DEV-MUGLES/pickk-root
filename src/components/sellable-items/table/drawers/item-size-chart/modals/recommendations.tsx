import { useEffect } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Space } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { ItemSizeRecommendation, ItemSizeChart } from '@pickk/common';

const AddButton = ({
  children,
  onClick,
}: {
  children: string;
  onClick: () => void;
}) => {
  return (
    <Button type="ghost" onClick={onClick} block icon={<PlusOutlined />}>
      {children}
    </Button>
  );
};

type ItemSizeRecommendationsModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (recommendations: ItemSizeRecommendation[]) => Promise<boolean>;
} & Pick<ItemSizeChart, 'recommendations'>;

export default function ItemSizeRecommendationsModal(
  props: ItemSizeRecommendationsModalProps
) {
  const { recommendations = [], visible, onClose, onSubmit } = props;

  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue({
      recommendations: recommendations,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFinish = async ({
    recommendations,
  }: {
    recommendations: ({
      height: string;
      weight: string;
      sizeName: string;
    } & unknown)[];
  }) => {
    const result = await onSubmit(
      recommendations.map(({ height, weight, sizeName }) => ({
        height: parseInt(height),
        weight: parseInt(weight),
        sizeName,
      }))
    );

    if (result) {
      onClose();
    }
  };

  return (
    <Modal closable={false} width="60%" visible={visible} onCancel={onClose}>
      <Form form={form} onFinish={handleFinish}>
        <Form.List name="recommendations">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey }) => (
                <Space
                  key={key}
                  style={{ display: 'flex', marginBottom: 8 }}
                  align="baseline"
                  size="middle"
                >
                  <Form.Item
                    name={[name, 'height']}
                    fieldKey={[fieldKey, 'height']}
                    rules={[{ required: true, message: '?????? ??????????????????' }]}
                  >
                    <Input placeholder="???" />
                  </Form.Item>
                  <Form.Item
                    name={[name, 'weight']}
                    fieldKey={[fieldKey, 'weight']}
                    rules={[
                      { required: true, message: '???????????? ??????????????????' },
                    ]}
                  >
                    <Input placeholder="?????????" />
                  </Form.Item>
                  <Form.Item
                    name={[name, 'sizeName']}
                    fieldKey={[fieldKey, 'sizeName']}
                  >
                    <Input
                      placeholder="?????? ?????????"
                      style={{ width: '16rem' }}
                    />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <AddButton onClick={add}>?????? ????????? ??????</AddButton>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item style={{ marginTop: '4rem' }}>
          <Button type="primary" htmlType="submit" style={{ width: '6rem' }}>
            ??????
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
