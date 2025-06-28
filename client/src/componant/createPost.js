import { useState } from "react";
import Menu from "./menu";
import exifr from "exifr";
import TagManager from "./create/list/TagManager";

export default function CreatePost() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // 이미지별 메타데이터 배열
  const [imageMeta, setImageMeta] = useState([]);
  const [imageAddress, setImageAddress] = useState([]);

  // 태그 관련 상태 추가
  const [tags, setTags] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [currentTag, setCurrentTag] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTag, setEditingTag] = useState("");
  const [postText, setPostText] = useState("");

  const handleClose = () => {
    if (window.confirm("게시물을 삭제하시겠습니까?")) setIsOpen(false);
  };

  async function getAddressFromCoords(lat, lng) {
    const res = await fetch(
      `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`,
      {
        headers: {
          Authorization: 'KakaoAK e3edda565841b375880733ac67c7e2f8'
        }
      }
    );
    const data = await res.json();
    if (data.documents && data.documents.length > 0) {
      return data.documents[0].address.address_name;
    }
    return null;
  }

  const handleImageSelect = async (event) => {
    // 사용자가 선택한 파일들을 가져와서 배열로 변환
    // event.target.files는 FileList 겍체이기 때문에 배열로 바꿔줌
    const files = Array.from(event.target.files);

    // 각 파일을 FileReader로 읽어들이기 위한 Promise 배열 생성
    const readers = files.map((file) => {
      return new Promise((resolve) => {
        // 브라우저 내장 객체 FileReader 생성
        const reader = new FileReader();
        reader.onload = async (e) => {
          // exifr로 위치정보 추출
          const gps = await exifr.gps(file);
          let address = null;
          if (gps && gps.latitude && gps.longitude) {
            address = await getAddressFromCoords(gps.latitude, gps.longitude);
          }
          resolve({ src: e.target.result, gps, address });
        };
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then((images) => {

      if(images.some(img => !img.address)){
        window.alert("위치 정보가 존재하지 않습니다. 위치 정보가 있는 사진만 첨부할 수 있습니다.")
        return;
      };
      setSelectedImages((prev) => [...prev, ...images.map(img => img.src)]);
      setImageMeta((prev) => [...prev, ...images.map(img => img.gps)]);
      setImageAddress((prev) => [...prev, ...images.map(img => img.address)]);
    });

   
  };

  const triggerFileInput = () => {
    document.getElementById("imageInput").click();
  };

  // 태그 추가 함수
  const handleAddTag = () => {
    if (currentTag.trim() !== "") {
      // 글에서 단어 추출
      const textWords = postText.split(/\s+/).filter((word) => word.length > 1);
      const availableWords = [...new Set(textWords)];

      // 앞에 #이 붙였으면 자르고, 없으면 그대로 비교
      const tagWithoutHash = currentTag.startsWith("#")
        ? currentTag.slice(1)
        : currentTag;
      // 입력된 태그가 글에 포함된 단어인지 확인
      if (!availableWords.some((word) => word.includes(tagWithoutHash))) {
        alert("태그는 글에 포함된 단어만 사용할 수 있습니다.");
        // 잘못된 태그 입력시 입력값 초기화
        setCurrentTag("");
        // 잘못된 태그 입력시 입력 필드 숨김
        setShowInput(false);
        return;
      }

      // 태그 앞에 #이 없으면 추가
      const formattedTag = currentTag.startsWith("#")
        ? currentTag.trim()
        : `#${currentTag.trim()}`;

      setTags([...tags, formattedTag]);
      // 입력 필드 초기화
      setCurrentTag("");
      // 입력 필드 숨기기
      setShowInput(false);
    }
  };

  // 태그 수정 완료 함수
  const handleEditTag = () => {
    if (editingTag.trim() !== "") {
      // 글에서 단어 추출
      const textWords = postText.split(/\s+/).filter((word) => word.length > 1);
      const availableWords = [...new Set(textWords)];

      // 수정된 태그가 앞에 #붙어있으면 자르고, 없으면 그대로 비교
      const tagWithoutHash = editingTag.startsWith("#")
        ? editingTag.slice(1)
        : editingTag;
      // 포함된 단어가 없다면 alert창 실행
      if (!availableWords.some((word) => word.includes(tagWithoutHash))) {
        alert("태그는 글에 포함된 단어만 사용할 수 있습니다.");
        return;
      }

      const formattedTag = editingTag.startsWith("#")
        ? editingTag.trim()
        : `#${editingTag.trim()}`;

      const updatedTags = [...tags];
      // 수정된 태그 저장
      updatedTags[editingIndex] = formattedTag;
      setTags(updatedTags);
    }
    // 수정 상태 초기화
    setEditingIndex(null);
    // 수정 필드 초기화
    setEditingTag("");
  };

  // 태그 삭제 함수
  const handleDeleteTag = (index) => {
    // 해당 인덱스의 태그 제거
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
  };

  // 엔터 키로 태그 추가
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTag();
    }
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
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 w-full h-full flex items-center justify-center">
              {selectedImages.length === 0 ? (
                <div className="text-center">
                  <button 
                    className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out border-0 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    onClick={triggerFileInput}
                  >
                    <svg 
                      className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                      />
                    </svg>
                    이미지를 선택하세요
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                  <p className="mt-4 text-gray-600 text-sm font-medium">
                    📍 위치 정보가 포함된 사진을 선택해주세요
                  </p>
                  <div className="mt-6 flex justify-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      <span>지원 형식: JPG, PNG, GIF</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                      <span>최대 10MB</span>
                    </div>
                  </div>
                </div>
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
                          <div key={index} className="relative w-12 h-12">
                            <img
                              src={img}
                              alt={`썸네일 ${index + 1}`}
                              className={`w-12 h-12 object-cover rounded cursor-pointer ${currentImageIndex === index ? 'border-2 border-blue-500' : ''}`}
                              onClick={() => setCurrentImageIndex(index)}
                            />
                            {/* X 버튼 */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation(); // 썸네일 클릭 이벤트와 겹치지 않게
                                setSelectedImages(prev => prev.filter((_, i) => i !== index));
                                setImageMeta(prev => prev.filter((_, i) => i !== index));
                                setImageAddress(prev => prev.filter((_, i) => i !== index));
                                // 삭제 후 인덱스 조정
                                if (currentImageIndex === index) setCurrentImageIndex(0);
                                else if (currentImageIndex > index) setCurrentImageIndex(currentImageIndex - 1);
                              }}
                              className="absolute top-0 right-0 bg-black bg-opacity-60 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-500"
                              style={{transform: 'translate(40%,-40%)'}}
                              tabIndex={-1}
                            >
                              ×
                            </button>
                          </div>
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
            <div className={`h-[42.5%] flex border-b-[2px] border-gray-200`}>
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
                  className={`h-[80%] flex justify-center items-end`}
                >
                  <textarea
                    className="w-full h-[90%] resize-none outline-none pb-0" 
                    placeholder="글을 입력하세요"
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                  ></textarea>
                </div>
                {/* 갤러리 본문 태그 */}
                <div className={`h-[20%] flex  items-center`}>
                  <TagManager
                    tags={tags}
                    setTags={setTags}
                    showInput={showInput}
                    setShowInput={setShowInput}
                    currentTag={currentTag}
                    setCurrentTag={setCurrentTag}
                    editingIndex={editingIndex}
                    setEditingIndex={setEditingIndex}
                    editingTag={editingTag}
                    setEditingTag={setEditingTag}
                    handleAddTag={handleAddTag}
                    handleEditTag={handleEditTag}
                    handleDeleteTag={handleDeleteTag}
                    handleKeyPress={handleKeyPress}
                  />
                </div>
              </div>
            </div>
            {/* 갤러리 아이콘 영역 */}
            <div
              className={`h-[40%] p-4 font-sans font-bold text-[0.8rem] border-b-[2px] border-gray-200`}
            >
              <div className="text-xl ">{imageAddress[currentImageIndex] ? imageAddress[currentImageIndex] : "위치"}</div>
            </div>
            {/* 갤러리 댓글 입력창 */}
            <div className={`h-[7.5%] flex`}>
              {/* 갤러리 댓글 인풋 영역 */}
              <div
                className={`resize-none outline-none w-[85%] h-full pt-4 pl-4 `}
              ></div>
              {/* 게시물 댓글 게시버튼 */}
              <div
                className={`w-[15%] flex justify-center items-center text-blue-500 hover:font-bold`}
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
