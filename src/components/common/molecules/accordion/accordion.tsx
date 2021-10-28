import { ReactNode } from 'react';
import { Collapse, Space } from 'antd';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';

type AccordionProps = {
  title: string;
  children: ReactNode;
};

export default function Accordion(props: AccordionProps) {
  const { title, children } = props;

  return (
    <Collapse defaultActiveKey="1">
      <CollapsePanel key="1" header={title}>
        <Space direction="vertical" style={{ width: '100%' }}>
          {children}
        </Space>
      </CollapsePanel>
    </Collapse>
  );
}
