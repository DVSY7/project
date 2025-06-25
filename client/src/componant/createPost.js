import { useState } from "react";
import Menu from "./menu";

export default function CreatePost() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleClose = () => {
    if (window.confirm("게시물을 삭제하시겠습니까?")) setIsOpen(false);
  };

  const handleImageSelect = (event) => {
    // 사용자가 선택한 파일들을 가져와서 배열로 변환
    // event.target.files는 FileList 겍체이기 때문에 배열로 바꿔줌
    const files = Array.from(event.target.files);

    // 각 파일을 FileReader로 읽어들이기 위한 Promise 배열 생성
    const readers = files.map((file) => {
      return new Promise((resolve) => {
        // 브라우저 내장 객체 FileReader 생성
        const reader = new FileReader();

        // 파일이 성공적으로 읽혔을 때 실행되는 콜백
        // 읽은 결과(Base64 문자열)를 resolve로 반환 
        reader.onload = (e) => resolve(e.target.result);

        // 파일을 Base64 형식의 URL로 읽기 시작
        reader.readAsDataURL(file);
      });
    });
    // 모든 파일 읽기가 끝나면 실행되는 Promise.all
    // readers 배열의 모든 Promise가 완료되면 then 실행
    Promise.all(readers).then((images) => {
      // 이전에 선택된 이미지들(prev)에 새 이미지들(images)을 추가해서 상태 업데이트
      // setSelectedImages는 상태를 배열로 관리하고 있다고 가정
      setSelectedImages((prev) => [...prev, ...images]);
    });
  };

  const triggerFileInput = () => {
    document.getElementById("imageInput").click();
  };

  if (!isOpen) {
    return null;
  }

  return (
    // <>
    // <div className="grid grid-cols-1 grid-rows-9 sm:grid-rows-1 sm:grid-cols-sm-minmax sm:grid-cols-9 h-screen overflow-x-hidden">
    // {/* 왼쪽: 가로 1 비율 (1/9) */}
    // <Menu current_src={5} />
    // {/* 오른쪽: 가로 8 비율 (8/9) */}
    // <div className="flex flex-col flex-wrap row-span-9 sm:col-span-8 ">
    //     </div></div>
    // </>
    <>
      <div
        className={`flex justify-center items-center fixed bg-black bg-opacity-50 w-screen h-screen left-0 top-0 z-20`}
      >
        <div
          className={`flex relative w-[60vw] h-[75vh] rounded-md bg-white bg-opacity-100`}
        >
          <span
            onClick={handleClose}
            className={`flex justify-end absolute right-0 mr-2 text-[1.5rem] h-[60px] w-[50px] cursor-pointer text-gray-500 hover:text-black transition-colors duration-500`}
          >
            {/* 닫기버튼 요소 */}X
          </span>
          {/* 갤러리 이미지 영역 */}
          <div className={`relative w-[60%] rounded-l-md`}>
            {/* 갤러리 이미지 */}
            <div className="bg-blue-100 w-full h-full">
              {selectedImages.length === 0 ? (
                <button className="bg-red-400" onClick={triggerFileInput}>
                  이미지를 선택하세요
                </button>
              ) : (
                <>
                  {/* 메인 이미지 표시 */}
                  <img
                    src={selectedImages[currentImageIndex]}
                    alt="선택된 이미지"
                    className="w-full h-full object-cover rounded-l-md"
                  />
                  
                  {/* 이미지가 여러 장일 때 썸네일과 + 버튼 표시 */}
                  {selectedImages.length > 0 && (
                    <div className="absolute bottom-5 right-5 bg-white rounded-lg p-2 shadow-lg">
                      <div className="flex gap-2 items-center">
                        {/* 썸네일들 */}
                        {selectedImages.map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`썸네일 ${index + 1}`}
                            className={`w-12 h-12 object-cover rounded cursor-pointer ${
                              currentImageIndex === index ? 'border-2 border-blue-500' : ''
                            }`}
                            onClick={() => setCurrentImageIndex(index)}
                          />
                        ))}
                    
                        {/* + 버튼 */}
                        <div 
                          className="w-12 h-12 bg-blue-400 text-white text-2xl rounded flex items-center justify-center cursor-pointer hover:bg-blue-500"
                          onClick={triggerFileInput}
                        >
                          +
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
              
              {/* 파일 입력 (하나만 유지) */}
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                multiple
                onChange={handleImageSelect}
                style={{ display: "none" }}
              />
            </div>
          </div>
          {/* 갤러리 본문 영역 */}
          <div className={`w-[40%] rounded-r-md`}>
            {/* 갤러리 제목 요소 */}
            <div
              className={`h-[10%] flex items-center pl-4 border-b-[2px] border-gray-200`}
            >
              {/* 갤러리 제목 프로필 */}
              <img
                className={`w-[40px] h-[40px] mr-4`}
                src="images/미니프로필.png"
                alt="미니프로필"
              ></img>
              {/* <span>{username}의 게시글</span> */}
              <span>레이첼</span>
            </div>
            {/* 갤러리 본문 요소 */}
            <div className={`h-[32.5%] flex border-b-[2px] border-gray-200`}>
              {/* 갤러리 본문 프로필 */}
              <div className={`w-[15%] flex justify-center mt-4`}>
                {/* 갤러리 본문 프로필 요소 */}
                <img
                  className={`w-[40px] h-[40px]`}
                  src={`images/미니프로필.png`}
                  alt="미니프로필"
                ></img>
              </div>
              {/* 갤러리 본문 내용 및 태그 영역 */}
              <div className={`w-[85%]`}>
                {/* 갤러리 본문 내용 */}
                <div
                  className={`h-[87%] flex justify-center items-center bg-blue-300`}
                >
                  <textarea
                    className="w-full h-[80%]"
                    placeholder="글을 입력하세요"
                  ></textarea>
                </div>
                {/* 갤러리 본문 태그 */}
                <div className={`h-[13%]`}>
                  #<input type="text" placeholder="태그입력"></input>
                </div>
              </div>
            </div>
            {/* 갤러리 댓글 영역 */}
            <div className={`h-[37%] overflow-y-auto hide-scrollbar`}></div>
            {/* 갤러리 아이콘 영역 */}
            <div
              className={`h-[13%] pl-4 font-sans font-bold text-[0.8rem] border-b-[2px] border-gray-200`}
            ></div>
            {/* 갤러리 댓글 입력창 */}
            <div className={`h-[7.5%] flex`}>
              {/* 갤러리 댓글 인풋 영역 */}
              <div
                className={`resize-none outline-none w-[85%] h-full pt-4 pl-4 `}
              ></div>
              {/* 갤러리 댓글 게시버튼 */}
              <div
                className={`w-[15%] flex justify-center items-center text-blue-500`}
              >
                공유하기
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
