import axios from 'axios';

import { getCookie } from '@common/helpers';

export const useUploadImages = () => {
  const uploadImages = async (files: File[]): Promise<string[]> => {
    if (!files?.length) {
      return;
    }

    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file);
    }

    const { data: urls } = await axios.post<string[]>(
      process.env.NEXT_PUBLIC_API_URL + '/images',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      }
    );

    return urls;
  };

  return { uploadImages };
};
