import BoardTableActionButton from './button';

import { BoardTableActionsProps } from './actions.types';

import styles from './actions.module.scss';

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

  return <div className={styles.wrapper}>{renderActionButtons()}</div>;
}
