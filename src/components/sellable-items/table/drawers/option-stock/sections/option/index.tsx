import {useState, Fragment} from 'react';
import {Button, Table, Tooltip} from 'antd';
import {PlusOutlined, EditOutlined} from '@ant-design/icons';
import {ItemOption} from '@pickk/common';

import {useToggleModals} from '@common/hooks';

import {CreateOptionModal, OptionNameEditModal} from './modal';

export type ModalType = 'createOption' | 'nameEdit';

export type OptionManageSectionProps = {
  itemId: number;
  options?: Array<ItemOption>;
};

function OptionManageSection({itemId, options = []}: OptionManageSectionProps) {
  const {isModalOpen, openModal, closeModal} = useToggleModals([
    'createOption',
    'nameEdit',
  ]);

  const [selectedOptionId, setSelectedOptionId] = useState<number>();

  const hasOption = options.length > 0;
  const [buttonText, ButtonIcon, warningMessage] = hasOption
    ? [
        '옵션 수정',
        EditOutlined,
        '옵션 수정시 기존 재고값이 모두 초기화 됩니다.',
      ]
    : ['옵션 추가', PlusOutlined, undefined];

  return (
    <>
      <Tooltip title={warningMessage}>
        <Button
          onClick={() => openModal('createOption')}
          icon={<ButtonIcon />}
          style={{marginBottom: '0.8rem'}}>
          {buttonText}
        </Button>
      </Tooltip>
      <Table
        columns={[
          {
            title: '옵션명',
            dataIndex: 'name',
            key: 'name',
            render: (value, {id}) => (
              <Fragment key={id}>
                {value}
                <Button
                  size="small"
                  style={{marginLeft: '0.8rem'}}
                  onClick={() => {
                    setSelectedOptionId(id);
                    openModal('nameEdit');
                  }}>
                  수정
                </Button>
              </Fragment>
            ),
          },
          {title: '옵션값', dataIndex: 'values', key: 'values'},
        ]}
        dataSource={[...options]
          .sort((a, b) => a.order - b.order)
          .map(({id, name, values}) => ({
            key: name,
            id,
            name,
            values: values.map(({name}) => name).join(', '),
          }))}
        pagination={false}
      />
      {isModalOpen.createOption && (
        <CreateOptionModal
          title={buttonText}
          visible={isModalOpen.createOption}
          onClose={() => closeModal('createOption')}
          warningMessage={warningMessage}
          itemId={itemId}
          defaultOptions={options.map(({name, values}) => ({
            name,
            values: values.map(({name, priceVariant = 0}) => ({
              name,
              priceVariant,
            })),
          }))}
        />
      )}
      {isModalOpen.nameEdit && (
        <OptionNameEditModal
          optionId={selectedOptionId}
          visible={isModalOpen.nameEdit}
          onClose={() => closeModal('nameEdit')}
        />
      )}
    </>
  );
}

export default OptionManageSection;
