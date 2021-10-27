import { ItemSizeChart } from '@pickk/common';

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

  return (
    <table width="100%">
      <tr>
        <th>키</th>
        <th>몸무게</th>
        <th>추천사이즈</th>
      </tr>
      {recommendations.map((v, index) => (
        <tr key={index}>
          <td>{v.height}cm</td>
          <td>{v.weight}kg</td>
          <td>{v.sizeName} 추천</td>
        </tr>
      ))}
    </table>
  );
}
