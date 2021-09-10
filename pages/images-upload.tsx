import { ImagesUploadContainer } from '@containers/images-upload';

export default function ImagesUploadPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>이미지 업로드 페이지</h1>
      <pre>
        이 곳은 이미지를 업로드하는 곳이다. 업로드하고 생성된 URL을 사용한다.
      </pre>
      <ImagesUploadContainer />
    </div>
  );
}
