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
  const [updating, setUpdating] = useState({
    info: false,
    imageUrl: false,
    detailImages: false,
    crawlOption: false,
  });

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
  const [crawlItemOptionSet] = useMutation(gql`
    mutation crawlItemOptionSet($itemId: Int!) {
      crawlItemOptionSet(itemId: $itemId) {
        id
      }
    }
  `);

  const [itemId, setItemId] = useState(null);

  const updateByCrawl = async () => {
    setUpdating({ ...updating, info: true });

    try {
      await updateRootItemByCrawl({ variables: { itemId } });
      message.success('업데이트되었습니다.');
    } catch (err) {
      message.error('실패했습니다' + err);
    } finally {
      setUpdating({ ...updating, info: false });
    }
  };

  const updateImageUrl = async () => {
    setUpdating({ ...updating, imageUrl: true });

    try {
      await updateRootItemImageUrl({ variables: { itemId } });
      message.success('업데이트되었습니다.');
    } catch (err) {
      message.error('실패했습니다' + err);
    } finally {
      setUpdating({ ...updating, imageUrl: false });
    }
  };

  const updateDetailImages = async () => {
    setUpdating({ ...updating, detailImages: true });

    try {
      await updateRootItemDetailImages({ variables: { itemId } });
      message.success('업데이트되었습니다.');
    } catch (err) {
      message.error('실패했습니다' + err);
    } finally {
      setUpdating({ ...updating, detailImages: false });
    }
  };

  const crawlOption = async () => {
    setUpdating({ ...updating, crawlOption: true });

    try {
      await crawlItemOptionSet({ variables: { itemId } });
      message.success('업데이트되었습니다.');
    } catch (err) {
      message.error('실패했습니다' + err);
    } finally {
      setUpdating({ ...updating, crawlOption: false });
    }
  };

  return (
    <StyledWrapper>
      아래에 아이템 ID를 입력하세요
      <InputNumber min={1} value={itemId} onChange={setItemId} />
      <Button
        type="primary"
        disabled={!itemId}
        loading={updating.info}
        onClick={updateByCrawl}
      >
        이름,가격 업데이트
      </Button>
      <Button
        type="primary"
        disabled={!itemId}
        loading={updating.imageUrl}
        onClick={updateImageUrl}
      >
        대표 이미지 업데이트
      </Button>
      <Button
        type="primary"
        disabled={!itemId}
        loading={updating.detailImages}
        onClick={updateDetailImages}
      >
        상세 이미지들 업데이트
      </Button>
      <Button
        type="primary"
        disabled={!itemId}
        loading={updating.crawlOption}
        onClick={crawlOption}
      >
        옵션 크롤링+재생성 (기존 product 모두 삭제됩니다.)
      </Button>
      <StyledA target="_blank" href={`https://pickk.one/items/${itemId}`}>
        핔 링크 (https://pickk.one/items/{itemId})
      </StyledA>
    </StyledWrapper>
  );
}
