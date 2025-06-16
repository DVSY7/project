import { useState } from "react";
import Menu from "./menu.js";
import TopButtons from "./create/list/TopButtons.js";
import IsPlanned from "./create/list/IsPlanned.js";
import TagManager from "./create/list/TagManager.js";
import TitleAndSelectInterest from "./create/list/TitleAndSelectInterest.js";
import DayList from "./create/list/DayList.js";

export default function CreateList() {
  // 계획형, 비계획형 상태관리 스테이트
  const [isPlanned, setIsPlanned] = useState(true);

  //선택된 관심사 상태
  const [selectedInterest, setSelectedInterest] = useState("");
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
      // 입력 필드 숨기기
      setShowInput(false);
    }
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
    const updatedTags = tags.filter((_, i) => i !== index); // 삭제할 태그만 삭제, 나머지 남김
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
          {/* <div className="flex items-center justify-center  w-full h-full"> */}
            <div
              className={`w-full h-full grid grid-cols-[3fr_2fr] bg-white my-8`}
            >
              {/* 왼쪽 영역 */}
              <div className="grid grid-rows-[1fr_6.5fr_0.5fr] p-4 pl-10">
                {/* 상단 영역 */}
                <div className="flex grid grid-rows-[0.5fr_1fr]">
                  <TopButtons isPlanned={isPlanned} setIsPlanned={setIsPlanned} />
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
                  <DayList />
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
              <div className="border-l grid grid-rows-[9fr_1fr]  overflow-hidden">
                <div className="flex items-center justify-center">
                  {/* 계획형 작성 란 */}
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
          {/* </div> */}
        </div>
      </div>
    </>
  );
}
