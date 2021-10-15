import styled from 'styled-components';
import { Button, Typography } from 'antd';

const { Text } = Typography;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButton = styled(Button).attrs({
  size: 'small',
})`
  margin-top: 0.6rem;
`;

export type ItemCategoryProps = {
  majorCategoryName: string;
  minorCategoryName: string;
  onUpdateClick: () => void;
};

export default function ItemCategory(props: ItemCategoryProps) {
  const {
    majorCategoryName = '-',
    minorCategoryName = '-',
    onUpdateClick = () => null,
  } = props;

  return (
    <StyledWrapper>
      <Text>{`${majorCategoryName}/${minorCategoryName}`}</Text>
      <StyledButton onClick={onUpdateClick}>수정</StyledButton>
    </StyledWrapper>
  );
}
