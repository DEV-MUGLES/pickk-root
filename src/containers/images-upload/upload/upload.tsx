import { ChangeEvent, useState } from 'react';

import { useUploadImages } from './hooks';

const ID = 'images-uploader';

export default function ImagesUploadContainer() {
  const [imageUrls, setImageUrls] = useState([]);
  const [isUploading, setUploading] = useState(false);

  const { uploadImages } = useUploadImages();

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (isUploading) {
      alert('업로드 중인 이미지가 있습니다');
      return;
    }

    try {
      setUploading(true);
      const files = Array.from<File>(e.target.files);
      const urls = await uploadImages(files);
      setImageUrls(urls);
    } catch {
      alert(
        '이미지 업로드에 실패했습니다!\n너무 큰 용량이 원인일 수 있습니다. (1번에 총 128MB까지 업로드 가능)'
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <label htmlFor={ID} style={{ fontSize: 30, color: 'red' }}>
        나를 클릭해서 업로드하세요
      </label>
      <input
        id={ID}
        type="file"
        accept="image/*"
        hidden
        multiple
        onChange={handleUpload}
      />

      {imageUrls?.map((imageUrl) => (
        <div
          key={imageUrl}
          style={{ width: 'fit-content', border: '1px solid gray' }}
        >
          <p>{imageUrl}</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="업로드된 이미지"
            width={200}
            style={{ marginBottom: 50 }}
          />
        </div>
      ))}
    </>
  );
}
