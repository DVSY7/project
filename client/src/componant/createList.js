import { useState } from "react";
import Menu from "./menu.js";
import TopButtons from "./create/list/TopButtons.js";
import ListAddPhoto from "./create/list/ListAddPhoto.js";
import IsPlanned from "./create/list/IsPlanned.js";
import TagManager from "./create/list/TagManager.js";
import TitleAndSelectInterest from "./create/list/TitleAndSelectInterest.js";
import DayList from "./create/list/DayList.js";
import AddButtons from "./create/list/AddButtons.js";

export default function CreateList() {
  // 예시 이미지 표시 여부
  const [showExample, setShowExample] = useState(false);
  //  이미지 URL 상태
  const [ImageSrc, setImageSrc] = useState(null);
  // 텍스트 상태
  const [text, setText] = useState("");
  // 등록된 항목 상태
  const [registeredItems, setRegisteredItems] = useState([
    { day: "Day 1", image: "image1.jpg", description: "Day 1의 첫 번째 항목" },
    { day: "Day 1", image: "image2.jpg", description: "Day 1의 두 번째 항목" },
    { day: "Day 2", image: "image3.jpg", description: "Day 2의 첫 번째 항목" },
  ]);

  //이미지 업로드 핸들러
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // 이미지 URL 상태에 저장
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = () => {
    if (ImageSrc && text.trim() !== "") {
      // 기존 배열 복사하고, 그 뒤에 새 아이템 추가
      setRegisteredItems([
        ...registeredItems,
        { image: ImageSrc, description: text },
      ]);
      //이미지 초기화
      setImageSrc(null);
      //텍스트 초기화
      setText("");
      // 사진 첨부 폼 숭기기
      setShowExample(false);
    } else {
      setShowExample(false);
    }
  };

  // 인원 수 선택 항목변수
  const selectNumber = [2, 4, 8, 12, 16, 20, 30, 50, 100, "기타"];
  // 관심사 선택 항목변수
  const selectInterest = [
    "여행 & 탐험",
    "도전 & 어드벤처",
    "자기계발 & 교육",
    "건강 & 운동",
    "문화 & 예술",
    "요리 & 미식",
    "봉사 & 나눔",
    "취미 & 라이프",
    "기타",
  ];

  //선택된 관심사 상태
  const [selectedInterest, setSelectedInterest] = useState("");

  // 계획형, 비계획형 상태관리 스테이트
  const [isPlanned, setIsPlanned] = useState(true);
  // 혼자하기, 같이하기 상태관리 스테이트
  const [Group, setGroup] = useState(true);
  // 대면, 비대면 여부 상태관리 스테이트
  const [Offline, setOffline] = useState(true);

  // 일차 목록 스태이트
  const [days, setDays] = useState([]);
  // 현재 활성화된 날짜
  const [activeDay, setActiveDay] = useState(null);


  // 버튼 표시 여부 스테이트
  const [showAddDayButton, setShowAddDayButton] = useState(true);

  // 일차 추가 함수
  const handleAddDay = () => {
    // 새로운 일차 생성
    const newDay = `${days.length + 1}일차`;
    // 일차 목록애 추가
    setDays([...days, newDay]);
    //버튼 숨기기
    setShowAddDayButton(false);
  };





  // 태그 목록
  const [tags, setTags] = useState([]);
  // 입력 필드 표시 여부
  const [showInput, setShowInput] = useState(false);
  // 현재 입력된 태그
  const [currentTag, setCurrentTag] = useState("");
  // 수정 중인 태그의 인덱스
  const [editingIndex, setEditingIndex] = useState(null);
  // 수정 중인 태그 값
  const [editingTag, setEditingTag] = useState("");

  // 태그 추가 함수
  const handleAddTag = () => {
    if (currentTag.trim() !== "") {
      // 태그 앞에 #이 없으면 추가
      const formattedTag = currentTag.startsWith("#")
        ? currentTag.trim()
        : `#${currentTag.trim()}`;

      setTags([...tags, formattedTag]);
      // 입력 필드 초기화
      setCurrentTag("");
    }
    // 입력 필드 숨기기
    setShowInput(false);
  };

  // 태그 수정 완료 함수
  const handleEditTag = () => {
    if (editingTag.trim() !== "") {
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

  return (
    <>
      {/*가장 바깥영역 화면의 최대로 설정*/}
      <div className="grid grid-cols-1 grid-rows-9 sm:grid-rows-1 sm:grid-cols-sm-minmax sm:grid-cols-9 h-screen overflow-x-hidden">
        {/* 왼쪽: 가로 1 비율 (1/9) */}
        <Menu current_src={5} />
        {/* 오른쪽: 가로 8 비율 (8/9) */}
        <div className=" flex flex-col flex-wrap  row-span-9 sm:col-span-8 ">
          <div className="flex items-center justify-center  w-full h-full">
            <div
              className={`w-[95%] h-[93%] rounded-3xl grid grid-cols-[3fr_2fr] shadow-lg border  bg-white`}
            >
              {/* 왼쪽쪽 영역 */}
              <div className="grid grid-rows-[1fr_6.5fr_0.5fr] p-4 pl-10">
                {/* 상단 영역 */}
                <div className="flex grid grid-rows-[0.5fr_1fr]">
                  <TopButtons
                    isPlanned={isPlanned}
                    setIsPlanned={setIsPlanned}
                    Group={Group}
                    setGroup={setGroup}
                    Offline={Offline}
                    setOffline={setOffline}
                    selectNumber={selectNumber}
                  />
                  {/* 제목, 프로필, 관심사 선택 영역 */}
                  <TitleAndSelectInterest
                    selectInterest={selectInterest}
                    selectedInterest={selectedInterest}
                    setSelectedInterest={setSelectedInterest}
                  />
                </div>
                {/* 중간 영역 */}

                {/* 일차 추가 버튼 */}
                <div className="grid grid-rows-[1fr_10fr]">
                  <DayList
                    days={days}
                    showAddDayButton={showAddDayButton}
                    handleAddDay={handleAddDay}
                    activeDay={activeDay}
                    setActiveDay={setActiveDay}
                    showExample={showExample}
                    setShowExample={setShowExample}
                    registeredItems={registeredItems}
                  />
                  {/* 이미지 예시 영역 */}
                  {showExample ? (
                    <div className="p-4 bg-gray-100 border rounded-xl z-10">
                      {/* 이미지가 있을 경우 이미지 크기만큼 공간 차지 */}
                      {ImageSrc ? (
                        <div className="w-full h-[300px] mb-4">
                          <img
                            src={ImageSrc}
                            alt="첨부된 이미지"
                            className="w-full h-full object-cover rounded-xl"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-[300px] mb-4 bg-red-100"></div>
                      )}
                      {/* 텍스트 입력 영역 */}
                      <div className="flex flex-col w-full">
                        <textarea
                          className="flex w-full h-44 resize-none p-2 mb-4 border rounded"
                          placeholder="이미지에 대한 설명을 입력하세요..."
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                        />

                        {/* 파일 첨부 버튼 */}
                        <div className="flex justify-between">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="flex mb-4"
                          />

                          <button
                            className="bg-blue-500 text-white w-16 rounded mb-4"
                            onClick={handleRegister}
                          >
                            등록
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      {/* 등록된 항복 표시 */}
                      <div>
                        {registeredItems.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center rounded-lg bg-gray-200 mb-4 h-36"
                          >
                            {/* 이미지 */}
                            <div>
                              <img
                                src={item.image}
                                alt="등록된 이미지"
                                className="ml-2 w-48 h-32 object-cover rounded"
                              />
                            </div>
                            {/* 설명 글 */}
                            <div className="flex-1 p-4">
                              <p>{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <AddButtons
                        showExample={showExample}
                        setShowExample={setShowExample} />
                    </div>
                  )}
                </div>
                {/* 하단 영역 */}
                <div className="mt-5">
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
              {/* 오른쪽 영역 */}
              <div className="border-l grid grid-rows-[2.5fr_3fr_0.5fr]  overflow-hidden">
                {/* 상단 영역: 지도영역 */}
                <div className="bg-red-200">지도</div>
                {/* 중간 영역: 텍스트 입력란 */}
                <div className="flex items-center justify-center">
                  {isPlanned ? (
                    <IsPlanned />
                  ) : (
                    <textarea
                      className="w-[90%] h-[90%] border rounded p-2 resize-none px-3"
                      placeholder="소개 글을 자유롭게 입력하세요"
                    ></textarea>
                  )}
                </div>
                {/* 끝 영역: 텍스트 입력란 */}
                <div className="flex justify-end items-center">
                  <button className="bg-blue-500 text-white h-10 mr-8 px-3 rounded-xl">
                    등록하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
