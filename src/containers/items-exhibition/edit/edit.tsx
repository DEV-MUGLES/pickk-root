import { useRouter } from 'next/router';
import { SketchPicker } from 'react-color';

import { ItemsExhibitionCard } from '@components/common/renderers';

import { useItemsExhibitionForm } from './hooks';

import styles from './edit.module.scss';

export default function ItemsExhibitionEditContainer({ id }: { id?: number }) {
  const router = useRouter();

  const { form, handleFieldChange, submit } = useItemsExhibitionForm(id);

  const handleInputChange = (e: any) => {
    if (e.target.name === 'isVisible') {
      handleFieldChange(e.target.name, e.target.checked);
    } else {
      handleFieldChange(
        e.target.name,
        e.target.type === 'number' ? Number(e.target.value) : e.target.value
      );
    }
  };

  const handleSubmit = async () => {
    await submit();
    alert('저장되었습니다.');
    router.back();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.edit}>
        <h2>추가/수정</h2>
        <h4>제모옥은</h4>
        <textarea
          name="title"
          value={form.title}
          onChange={handleInputChange}
        />
        <h4>설명</h4>
        <textarea
          name="description"
          value={form.description}
          onChange={handleInputChange}
        />
        <h4>이미지 URL</h4>
        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleInputChange}
        />
        <h4>이미지 상단 이동</h4>
        <input
          type="number"
          name="imageTop"
          value={form.imageTop}
          onChange={handleInputChange}
        />
        <h4>이미지 우측 이동</h4>
        <input
          type="number"
          name="imageRight"
          value={form.imageRight}
          onChange={handleInputChange}
        />
        <h4>배경색</h4>
        <SketchPicker
          color={form.backgroundColor ?? '#fff'}
          onChange={(color) => {
            handleFieldChange('backgroundColor', color?.hex);
          }}
        />
        <br />
        <h4>노출여부</h4>
        <input
          type="checkbox"
          name="isVisible"
          checked={form.isVisible}
          onChange={handleInputChange}
        />
        <h4>순서</h4>
        <input
          type="number"
          name="order"
          value={form.order}
          onChange={handleInputChange}
        />
        <h4>아이템ID들</h4>
        <input
          name="itemIdsStr"
          value={form.itemIdsStr}
          onChange={handleInputChange}
        />
        <br />
        <button onClick={handleSubmit}>저장하기</button>
      </div>
      <div>
        <h2>미리보기</h2>
        <ItemsExhibitionCard
          {...form}
          items={form.itemIds.map((id) => ({ id }))}
        />
      </div>
    </div>
  );
}
