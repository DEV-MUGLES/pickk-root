import React from 'react';
import { Upload, message, UploadProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { useUploadImages } from './hooks';

export type ImageUploadProps = {
  imageUrl: string;
  setImageUrl: (imageUrl: string) => void;
  alt?: string;
};

export default function ImageUpload({
  imageUrl,
  setImageUrl,
  alt = 'image url',
}: ImageUploadProps) {
  const { uploadImages } = useUploadImages();

  const uploadProps: UploadProps = {
    name: 'file',
    listType: 'picture-card',
    showUploadList: false,
    customRequest: async (options) => {
      const { file, onError, onSuccess } = options;

      try {
        const urls = await uploadImages([file as File]);
        onSuccess(urls, null);
      } catch (error) {
        onError(error as any);
      }
    },
    onChange(info) {
      const {
        file: { status, name, response },
      } = info;
      if (status !== 'uploading') {
        setImageUrl(response);
      }
      if (status === 'done') {
        message.success(`${name} 이미지 업로드에 성공했습니다!`);
      } else if (status === 'error') {
        message.error(`${name} 이미지 업로드를 실패했습니다.`);
      }
    },
    maxCount: 1,
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Upload
      {...uploadProps}
      style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
  );
}
