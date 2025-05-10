import '../App.css';
import Block from './community/block';
import Chatroom from './community/chatroom';
import Chatting from './community/chatting';
import Friend from './community/friend';
import Menu from './menu';
import { useState } from "react";

export default function Community() {
  // 플렉스 요소 가로세로 센터
  const flexCenter = "flex justify-center items-center";
  // 플렉스 요소 세로 센터
  const flexColCenter = "flex justify-start items-center";
  // 레이아웃 그림자
  const shadow = "shadow-xl border border-solid border-t-gray-200";
  // 커뮤니티 탭 요소
  const communityTab = [
    "친구",
    "채팅",
    "차단",
  ]
  // 대화목록 정보
  const chattingList = [
    { id: 1, name: "상열" },
    { id: 2, name: "레이첼" },
    { id: 3, name: "상열" },
    { id: 4, name: "레이첼" },
    { id: 5, name: "상열" },
    { id: 6, name: "레이첼" },
  ]
  // 친구목록 정보
  const friendList = [
    { id: 1, name: "김상열" },
    { id: 2, name: "김원재" },
    { id: 1, name: "김상열" },
    { id: 2, name: "김원재" },
    { id: 1, name: "김상열" },
    { id: 2, name: "김원재" },
  ]
  // 차단목록 정보
  const blockedList = [
    {id: 1, name: "레이첼"},
    {id: 2, name: "김해원"},
    {id: 1, name: "레이첼"},
    {id: 2, name: "김해원"},
  ]

  // 탭메뉴 상태관리 
  const [selectedTab, setSelectedTab] = useState("채팅");

  // 대화창 선택 시 상태관리
  const [selectedList, setSelectedList] = useState("");

  // 탭메뉴 상태관리 함수
  const handleChangeTab = (item) => {
    setSelectedTab(item)
  }

  // 대화창 선택 시 상태관리 함수
  const handleChangeList = (item) => {
    setSelectedList(item);
  }


  return (
    <>
      {/*가장 바깥영역 화면의 최대로 설정*/}
      <div className="grid grid-cols-1 grid-rows-9 sm:grid-rows-1 sm:grid-cols-9 h-screen">
        {/* 왼쪽: 가로 1 비율 (1/9) */}
        <Menu current_src={2} />
        {/* 오른쪽: 가로 8 비율 (8/9) */}
        <div className=" flex flex-nowrap row-span-9 sm:col-span-8 ">



          {/* 커뮤니티 레이아웃 영역 */}
          <div className={` ${flexCenter} sm:w-[30%] w-[100%] min-w-[350px] h-full`}>
            {/* 커뮤니티 요소 영역 */}
            <div className={`${shadow} rounded-3xl w-[87%] h-[93%]`}>
              {/* 커뮤니티 탭 영역 */}
              <div className={`flex justify-end flex-col w-full h-[100px]`}>
                <div className={`${flexColCenter} h-[55px] ml-6 w-full font-sans`}><span className={`font-sans font-bold`}>전체</span><span>(40)</span> <span className={`text-[0.5rem] mx-1`}>▼</span></div>
                <div className={`flex items-center w-full h-[45px] border-b border-solid border-gray-200 px-3`}>
                  {communityTab.map((item) => {
                    const isActive = selectedTab === item;
                    return (
                      <div key={item} onClick={() => {
                        handleChangeTab(item);
                      }} className={`${flexCenter} ${isActive ? "bg-gray-200" : "bg-white"} border border-solid border-gray-300 h-[30px] w-[60px] rounded-md ml-3 text-[0.9rem]`}>{item}</div>
                    )
                  })}
                  <div className={`ml-auto mr-2`}><img src={`/images/검색.png`} alt='검색' className={`w-6 h-6 opacity-50`}></img></div>
                </div>
              </div>


              {/*목록영역 */}
              <div className="flex flex-col justify-start items-center h-[calc(100%-100px)] w-full pt-8 rounded-b-3xl overflow-x-hidden overflow-y-auto sm:scrollbar-none ">


                {/* 채팅목록 컴포넌트 */}
                <Chatting
                  flexCenter={flexCenter}
                  chattingList={chattingList}
                  selectedTab={selectedTab}
                  selectedList={selectedList}
                  communityTab={communityTab}
                  handleChangeList={handleChangeList}
                  setSelectedList={setSelectedList}
                />


                {/* 친구목록 컴포넌트 */}
                <Friend
                  selectedTab={selectedTab}
                  communityTab={communityTab}
                  flexCenter={flexCenter}
                  friendList={friendList}
                />


                {/* 차단목록 컴포넌트 */}
                <Block 
                selectedTab = {selectedTab}
                communityTab = {communityTab}
                flexCenter = {flexCenter}
                blockedList = {blockedList}
                />

              </div>
            </div>
          </div>


          {/* 채팅창 영역 */}
          <div className={`sm:${flexColCenter} hidden w-[70%] h-full`}>
            <div className={`${shadow} rounded-3xl w-[97%] h-[93%]`}>
                  <Chatroom
                  selectedList = {selectedList}
                  chattingList = {chattingList}
                  flexCenter = {flexCenter}
                  />
            </div>
          </div>



        </div>
      </div>
    </>
  );
}