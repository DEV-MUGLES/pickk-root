import styled from 'styled-components';
import { palette } from '@pickk/design-token';

import BoardTableActionButton from './button';

import { BoardTableActionsProps } from './actions.types';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 0.4rem 0.8rem 0 0.4rem;
  margin-top: 0.4rem;
  border-top: 1px solid ${palette.gray2};

  & > * {
    margin-right: 0.4rem;
  }
`;

export default function BoardTableActions(props: BoardTableActionsProps) {
  const { actions } = props;

  if (!actions?.length) {
    return null;
  }

  const renderActionButtons = () => {
    return actions.map((action) => (
      <BoardTableActionButton key={action.text} action={action} {...props} />
    ));
  };

  return <StyledWrapper>{renderActionButtons()}</StyledWrapper>;
}
