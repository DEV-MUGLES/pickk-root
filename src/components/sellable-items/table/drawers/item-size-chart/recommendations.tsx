import styled from 'styled-components';
import { ItemSizeChart } from '@pickk/common';
import { palette } from '@pickk/design-token';

const StyledTr = styled.tr`
  display: flex;
  flex-direction: row;

  border-bottom: 1px solid ${palette.gray2};
`;

const StyledTh = styled.td`
  width: 5rem;
  font-weight: 700;
`;

const StyledTd = styled.td`
  width: 5rem;
`;

export type ItemSizeRecommendationsProps = Pick<
  ItemSizeChart,
  'recommendations'
>;

export default function ItemSizeRecommendations({
  recommendations,
}: ItemSizeRecommendationsProps) {
  if (!recommendations?.length) {
    return null;
  }

  /**
   * @TODO 표로 보여주기
   * (키, 몸무게, 추천사이즈)
   */
  return (
    <table>
      <StyledTr>
        <StyledTh>키</StyledTh>
        <StyledTh>몸무게</StyledTh>
        <StyledTh>추천사이즈</StyledTh>
      </StyledTr>
      {recommendations.map((v, index) => (
        <StyledTr key={index}>
          <StyledTd>{v.height}cm</StyledTd>
          <StyledTd>{v.weight}kg</StyledTd>
          <StyledTd>{v.sizeName} 추천</StyledTd>
        </StyledTr>
      ))}
    </table>
  );
}
