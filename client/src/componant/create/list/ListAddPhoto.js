import { useState } from "react";
import axios from "axios"; // axios를 import

export default function ListAddPhoto({showExample, setShowExample}) {
  // 파일 상태 관리
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);



  const handlePhotoChange = async (event) => {
    const photo = event.target.files[0];
    if (photo) {
      setSelectedPhoto(photo);
      console.log("선택된 사진:", photo.name);

      // 파일 데이터를 서버로 보낼 객체 생성
      const formData = new FormData();
      formData.append("photo", photo);

      // try {
      //   const response = await axios.post("http://localhost:5000/createList", formData, {
      //     headers: {
      //       "Content-Type": "multipart/form-data", // 파일 업로드를 위한 헤더 설정
      //     },
      //   });

      //   if (response.status === 200) {
      //     setUploadStatus("사진이 성공적으로 업로드되었습니다!");
      //   } else {
      //     setUploadStatus("사진 업로드에 실패했습니다.");
      //   }
      // } catch (error) {
      //   console.error("업로드 중 오류 발생:", error);
      //   setUploadStatus("업로드 중 오류가 발생했습니다.");
      // }
    }
  };

  // 사진 업로드 버튼
  // const handlePhotoUpload = () => {
  //   document.getElementById("photoInput").click();
  // };

  
  return (
    <>
      {/* 사진 첨부 버튼 */}
      <button
        className="bg-white border rounded py-1 px-4 text-gray-500 mr-1.5"
        onClick={() => {setShowExample(true)}}
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
