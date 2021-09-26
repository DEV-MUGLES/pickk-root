import { Image, Typography } from 'antd';
import styled from 'styled-components';

const { Text } = Typography;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledImg = styled(Image).attrs({ width: '6rem' })`
  margin-right: 0.4rem;
`;

type InquiriesTableItemCardProps = {
  imageUrl: string;
  name: string;
};

export default function InquiriesTableItemCard({
  imageUrl,
  name,
}: InquiriesTableItemCardProps) {
  return (
    <StyledWrapper>
      <StyledImg src={imageUrl} alt={name} />
      <Text>{name}</Text>
    </StyledWrapper>
  );
}
