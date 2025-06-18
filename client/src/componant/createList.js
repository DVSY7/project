// client/createList.js

import { useEffect, useState } from "react";
import Menu from "./menu.js";
import TopButtons from "./create/list/TopButtons.js";
import IsPlanned from "./create/list/IsPlanned.js";
import TagManager from "./create/list/TagManager.js";
import TitleAndSelectInterest from "./create/list/TitleAndSelectInterest.js";
import DayList from "./create/list/DayList.js";
import axios from 'axios';

export default function CreateList() {
  // 계획형, 비계획형 상태관리 스테이트
  const [isPlanned, setIsPlanned] = useState(true);
  // 제목과 소개글 상태 추가
  const [title,setTitle] = useState("");
  const [text, setText] = useState("");

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

  // 혼자하기, 같이하기 상태관리 스테이트
  const [Group, setGroup] = useState(true);
   // 대면, 비대면 여부 상태관리 스테이트
  const [Offline, setOffline] = useState(true);

  // 일차 목록 스태이트
  const [days, setDays] = useState(["1일차"]);
  // 등록된 항목 상태
  const [registeredItems, setRegisteredItems] = useState({});

  // 태그 추가 함수
  const handleAddTag = () => {
    if (currentTag.trim() !== "") {
      // 제목과 글에서 단어 추출
      const titleWords = title.split(/\s+/).filter(word => word.length > 1);
      const textWords = text.split(/\s+/).filter(word => word.length > 1);
      // 태그로 사용할수 있는 단어 목록 생성
      const availableWords = [...new Set([...titleWords, ...textWords])];

      // 앞에 #이 붙였으면 자르고, 없으면 그래로 비교
      const tagWithoutHash = currentTag.startsWith("#") ? currentTag.slice(1) : currentTag;
      // 입력된 태그다 제목이나 글에 포함된 단어인지 확인
      if(!availableWords.some(word=>word.includes(tagWithoutHash))){
        alert("태그는 제목이나 글에 포함된 단어만 사용할 수 있습니다.");
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
      // 제목과 글에서 단어 추출
      const titleWords = title.split(/\s+/).filter(word => word.length > 1);
      const textWords = text.split(/\s+/).filter(word => word.length > 1);
      const availableWords = [...new Set([...titleWords,...textWords])];

      // 수정된 태그가 앞에 #붙어있으면 자르고, 없으면 그대로 비교
      const tagWithoutHash = editingTag.startsWith("#") ? editingTag.slice(1) : editingTag;
      // 포함된 단어가 없다면 alert창 실행
      if(!availableWords.some(word=>word.includes(tagWithoutHash))) {
        alert("태그는 제목이나 글에 포함된 단어만 사용할 수 있습니다.");
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

  // 제목이나 글 수정 할때마다 태그 검사
  useEffect(() => {
    const titleWords = title.split(/\s+/).filter(word => word.length > 1);
    const textWords = text.split(/\s+/).filter(word => word.length > 1);
    const availableWords = [...new Set([...titleWords,textWords])];

    // 태그들 중에서 유효하지 않은 태그 제거
    const validTags = tags.filter(tag => {
      const tagWithoutHash = tag.startsWith("#") ? tag.slice(1) : tag;
      return !availableWords.some(word=>word.includes(tagWithoutHash));
    });
    // 유효하지 않은 태그가 있다면 태그 목록 업데이트
    if (validTags.length !== tags.length){
      setTags(validTags);
    }
  }, [title, text]);

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

  // 등록버튼 로직
  const handleSubmit = async () => {
    try {

      if(!title.trim()) {
        alert("제목을 입력해주세요");
        return;
      }
      if(!text.trim()) {
        alert("소개글을 입력해주세요");
        return;
      }
      if(!selectedInterest) {
        alert("테마를 선택해주세요");
        return;
      }

      // ---일차별 항목 유효성 검사---
      const hasValidItems = days.every((day, index) => {
        const dayItems = registeredItems[day] || []; // 각 일차에 등로된 항목들
        if(dayItems.length === 0) {
          alert(`${index + 1}일차에 최소 하나이상의 항목(이미지 또는 장소)를 등록해주세요`);
          return false;
        }
        return true;
      })

      // 유효하지 않으면 아래 코드 실행하지 않음
      if(!hasValidItems) return;

      // ---서버에 보낼 데이터 구성---
      const listData = {
        title: title.trim(),
        description: text.trim(),
        isPlanned,
        isGroup : Group,
        maxParticipants: Group ? parseInt(document.querySelector('select').value) : 1,
        isOffline: Offline,
        interest: selectedInterest,
        days: days.map((day, index) => ({
          dayNumber: index + 1,
          // 각 날짜에 등록된 항목들(사진, 장소)
          items: registeredItems[day] || []
        })),
        // # 제거
        tags: tags.map(tag => tag.replace(/^#/, ''))
    };

    // post 요청으로 로컬호스트 5000번에 보냄, 2번째 인자: 전송할 json데이터, 3번째 인자: 옴션 
    const response = await axios.post('http://localhost:5000/api/lists/create', listData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.success) {
        alert('리스트가 성공적으로 등록되었습니다.');
        // 등록 성공 후 홈으로 이동
        window.location.href = '/home';
      }
    } catch (error) {
      console.error('리스트 등록 중 오류 발생: ',error);
      alert(error.response?.data?.message || "리스트 등록 중 오류가 발생했습니다.");
    } 
  }

  return (
    <>
      {/*가장 바깥영역 화면의 최대로 설정*/}
      <div className="grid grid-cols-1 grid-rows-9 sm:grid-rows-1 sm:grid-cols-sm-minmax sm:grid-cols-9 h-screen overflow-x-hidden">
        {/* 왼쪽: 가로 1 비율 (1/9) */}
        <Menu current_src={5} />
        {/* 오른쪽: 가로 8 비율 (8/9) */}
        <div className="flex flex-col flex-wrap  row-span-9 sm:col-span-8 ">
          {/* <div className="flex items-center justify-center  w-full h-full"> */}
            <div
              className={`w-full h-full grid grid-cols-[3fr_2fr] bg-white`}
            >
              {/* 왼쪽 영역 */}
              <div className="grid grid-rows-[1fr_6.5fr_0.5fr] px-4 py-8">
                {/* 상단 영역 */}
                <div className="flex grid grid-rows-[0.5fr_1fr]">
                  <TopButtons 
                  isPlanned={isPlanned} 
                  setIsPlanned={setIsPlanned} 
                  Group={Group}
                  setGroup={setGroup}
                  Offline={Offline}
                  setOffline={setOffline}
                  />
                  {/* 제목, 프로필, 관심사 선택 영역 */}
                  <TitleAndSelectInterest
                    selectInterest={selectInterest}
                    selectedInterest={selectedInterest}
                    setSelectedInterest={setSelectedInterest}
                    title={title}
                    setTitle={setTitle}
                  />
                </div>
                {/* 중간 영역 */}
                {/* 일차 추가 버튼 */}
                <div className="grid grid-rows-[1fr_10fr]">
                  <DayList 
                  days={days}
                  setDays={setDays}
                  registeredItems={registeredItems}
                  setRegisteredItems={setRegisteredItems}
                  />
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
                    title={title}
                    setTitle={setTitle}
                  />
                </div>
              </div>
              {/* 오른쪽 영역 */}
              <div className="border-l grid grid-rows-[9fr_1fr]  overflow-hidden">
                <div className="flex items-center justify-center">
                  {/* 계획형 작성 란 */}
                  {isPlanned ? (
                    <IsPlanned text={text} setText={setText}/>
                  ) : (
                    <textarea
                      className="w-[90%] h-[90%] border rounded p-2 resize-none px-3"
                      placeholder="소개 글을 자유롭게 입력하세요"  value={text} onChange={(e) => setText(e.target.value)}
                    ></textarea>
                  )}
                </div>
                {/* 끝 영역: 텍스트 입력란 */}
                <div className="flex justify-end items-center">
                  <button className="bg-blue-500 text-white h-10 mr-8 px-3 rounded-xl" onClick={handleSubmit}>
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
