import { useState } from 'react';
import styled from 'styled-components';
import { useMutation, gql } from '@apollo/client';
import { Button, InputNumber, message } from 'antd';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: fit-content;
`;

const StyledA = styled.a`
  font-size: 2rem;
  color: blue;
  text-decoration: underline;
`;

export default function ItemPage() {
  const [updateRootItemImageUrl] = useMutation(gql`
    mutation updateRootItemImageUrl($itemId: Int!) {
      updateRootItemImageUrl(itemId: $itemId) {
        id
      }
    }
  `);
  const [updateRootItemDetailImages] = useMutation(gql`
    mutation updateRootItemDetailImages($itemId: Int!) {
      updateRootItemDetailImages(itemId: $itemId) {
        id
      }
    }
  `);
  const [updateRootItemByCrawl] = useMutation(gql`
    mutation updateRootItemByCrawl($itemId: Int!) {
      updateRootItemByCrawl(itemId: $itemId) {
        id
      }
    }
  `);

  const [itemId, setItemId] = useState(null);

  const updateImageUrl = async () => {
    await updateRootItemImageUrl({ variables: { itemId } });
    message.success('업데이트되었습니다.');
  };

  const updateDetailImages = async () => {
    await updateRootItemDetailImages({ variables: { itemId } });
    message.success('업데이트되었습니다.');
  };

  const updateByCrawl = async () => {
    await updateRootItemByCrawl({ variables: { itemId } });
    message.success('업데이트되었습니다.');
  };

  return (
    <StyledWrapper>
      아래에 아이템 ID를 입력하세요
      <InputNumber min={1} value={itemId} onChange={setItemId} />
      <Button type="primary" disabled={!itemId} onClick={updateByCrawl}>
        이름,가격 업데이트
      </Button>
      <Button type="primary" disabled={!itemId} onClick={updateImageUrl}>
        대표 이미지 업데이트
      </Button>
      <Button type="primary" disabled={!itemId} onClick={updateDetailImages}>
        상세 이미지들 업데이트
      </Button>
      <StyledA target="_blank" href={`https://pickk.one/items/${itemId}`}>
        핔 링크 (https://pickk.one/items/{itemId})
      </StyledA>
    </StyledWrapper>
  );
}
