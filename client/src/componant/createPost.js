import { useState } from "react";
import Menu from "./menu";

export default function CreatePost() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedImage, setSelectedImage] = useState([]);
  const [severalImages, setSeveralImages] = useState(null);
  const [,] = useState(null);

  const handleClose = () => {
    if (window.confirm("게시물을 삭제하시겠습니까?")) setIsOpen(false);
  };

  const handleImageSelect = (event) => {
    const files = Array.from(event.target.files);
    const readers = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then((images) => {
      setSelectedImage((prev) => [...prev, ...images]);
      console.log(selectedImage)
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
              {selectedImage.length === 0 ? (
                <button className="bg-red-400" onClick={triggerFileInput}>
                  이미지를 선택하세요
                </button>
              ) : (
                <>
                  <img
                    src={selectedImage}
                    alt="선택된 이미지"
                    className="relative w-full h-full object-cover rounded-1-md"
                  />
                  <div
                    className="absolute bottom-5 right-5 bg-white z-10"
                    onClick={() => setSeveralImages(true)}
                  >
                    안녕
                  </div>
                  {severalImages && (
                    <div className="bg-red-300 absolute bottom-16 right-5 h-36 p-2 flex items-center">
                      <div className="w-32 h-32">
                        <img
                          src={selectedImage}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="bg-blue-400 text-3xl" onClick={triggerFileInput}>+</div>
                      <input
                        type="file"
                        id="imageInput"
                        accept="image/*"
                        onChange={handleImageSelect}
                        style={{ display: "none" }}
                      />
                    </div>
                  )}
                </>
              )}
              <input
                type="file"
                id="imageInput"
                accept="image/*"
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
