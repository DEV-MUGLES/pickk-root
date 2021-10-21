import {useState} from 'react';

export const useToggleModals = <ModalType extends string>(
  types: readonly ModalType[],
) => {
  const [isModalOpen, setIsModalOpen] = useState<Record<ModalType, boolean>>(
    types.reduce((acc, curr) => ({...acc, [curr]: false}), {}) as Record<
      ModalType,
      boolean
    >,
  );

  const toggleOpenModal = (type: ModalType, input: boolean) => {
    setIsModalOpen({...isModalOpen, [type]: input});
  };

  const openModal = (type: ModalType) => {
    toggleOpenModal(type, true);
  };

  const closeModal = (type: ModalType) => {
    toggleOpenModal(type, false);
  };

  return {isModalOpen, openModal, closeModal};
};
