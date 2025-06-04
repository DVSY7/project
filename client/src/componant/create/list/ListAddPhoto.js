import { useState } from "react";
import axios from "axios"; // axios를 import

export default function ListAddPhoto({ setshowImageInput }) {
  // 파일 상태 관리
  const [ setSelectedPhoto] = useState(null);
  const [ uploadStatus ] = useState(null);



  const handlePhotoChange = async (event) => {
    const photo = event.target.files[0];
    if (photo) {
      setSelectedPhoto(photo);
      console.log("선택된 사진:", photo.name);

      // 파일 데이터를 서버로 보낼 객체 생성
      const formData = new FormData();
      formData.append("photo", photo);
    }
  }
  return (
    <>
      {/* 사진 첨부 버튼 */}
      <button
        className="bg-white border rounded py-1 px-4 text-gray-500 mr-1.5"
        onClick={() => { setshowImageInput(true) }}
      >
        사진 첨부하기 +
      </button>

      {/* 숨겨진 파일 입력 */}
      <input
        id="photoInput"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handlePhotoChange} // 파일 선택 시 업로드 진행
      />

      {/* 업로드 상태 메시지 */}
      {uploadStatus && <div className="mt-2 text-gray-700">{uploadStatus}</div>}
    </>
  );
}
