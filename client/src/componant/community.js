import '../App.css';
import Block from './community/block';
import Chatroom from './community/chatroom';
import Chatting from './community/chatting';
import Friend from './community/friend';
import Menu from './menu';
import { useState, useRef, useEffect } from "react";
import { checkedToken } from './function/checkedToken';
import { fetchList } from './community/api/fetchListAPI';
import { fetchUserInfo } from './community/api/fetchUserInfo';

export default function Community() {

  // 페이지를 사용하는 유저 상태관리
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  // 페이지 이동 시 토큰 검증
  useEffect(()=>{
    const getUsername = async ()=>{
      await checkedToken(setUsername,setName);
    }
    getUsername();
  },[]);

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

  // 커뮤니티 탭 필터링 요소
  const communityTabFilter = [
    "전체",
    "친구",
  ]

  // 대화목록 정보
  const [chattingList, setChattingList] = useState([]);
  // 친구목록 정보
  const [friendList, setFriendList] = useState([]);
  // 차단목록 정보
  const [blockedList, setBlockedList] = useState([]);
  // 유저 정보
  const [userInfo, setUserInfo] = useState();

  console.log("userInfo",userInfo);

  // 차단 & 해제 동작 업데이트
  const [actionList, setActionList] = useState(Date.now());

   useEffect(()=>{
        const getList = async ()=>{
            try{
                const friendsData = await fetchList("friendList",name);
                const blockedData = await fetchList("blockList",name);
                const chattingData = await fetchList("chattingList",name);
                const UserInfo = await fetchUserInfo(name);
                
                setFriendList(friendsData);
                setBlockedList(blockedData);
                setChattingList(chattingData);
                setUserInfo(UserInfo[0]);

                console.log("목록 불러오기 실행");
            }catch(error){
                console.error("친구목록 불러오기 실패",error);
            }
        }
        getList();
    },[name,actionList]);

  // 탭메뉴 상태관리 
  const [selectedTab, setSelectedTab] = useState("채팅");
  // 탭메뉴 필터링 상태관리
  const [selectedTabFilter, setSelectedTabFilter] = useState("전체");
  // 탭메뉴 토글 상태관리
  const [toggleFilter, setToggleFilter] = useState(false);

  // 탭메뉴 필터링 함수
  const handleChangeFilter = {
    "전체" : ()=>{ setSelectedTabFilter("전체")},
    "친구" : ()=>{ setSelectedTabFilter("친구")},
  }

  // 대화창 선택 시 상태관리
  const [selectedList, setSelectedList] = useState("");

  // 검색 창 노출 상태관리
  const [search, setSearch] = useState(false);

  // 검색어 상태관리
  const [searchKeyWord, setSearchKeyWord] = useState("");

  // 탭메뉴 상태관리 함수
  const handleChangeTab = (item) => {
    setSelectedTab(item)
  }

  // 대화창 선택 시 상태관리 함수
  const handleChangeList = (item) => {
    setSelectedList(item);
  }

  // 검색창 포커스 이동 함수
  const RefFocus = useRef(null);
  const handleFocus = ()=>{
    if(RefFocus.current){
      RefFocus.current.focus();
    }
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
                {/* 선택된 탭이 채팅일 경우에만 랜더링 */}
                {selectedTab === "채팅" && 
                <div 
                onClick={()=> { setToggleFilter(prev => !prev) }}
                className={`${flexColCenter} h-[55px] ml-6 w-[80px] font-sans cursor-pointer`}><span className={`font-sans font-bold`}>{selectedTabFilter}</span><span>({chattingList.length})</span> <span className={`text-[0.5rem] mx-1`}>{toggleFilter ? "▲" : "▼"}</span></div>}
                {/* 채팅목록 필터링 */}
                <div className={`ml-7 translate-y-[-200%] h-1 relative`}>
                  <div className={`inline-flex flex-col border-[1px] border-gray-300 rounded-md`}>
                    {communityTabFilter.map((item, idx) => {
                      // 선택된 탭이 "채팅이고" 토글이 true 일때만 랜더링
                      if(selectedTab !== "채팅" || !toggleFilter)return(null);
                      return(
                        <span 
                        key={idx}
                        // 클릭된 값이 필터에 반영되고 토글 false 
                        onClick={()=>{handleChangeFilter[`${item}`](); setToggleFilter(false);}}
                        className={`${idx === 0 ? "rounded-t-md":`${idx === communityTabFilter.length -1 ? "rounded-b-md" : ""}`} bg-white px-4 py-1 hover:bg-gray-200`}>{item}</span>
                      )
                    })}
                  </div>
                </div>

                <div className={`flex items-center w-full h-[45px] border-b border-solid border-gray-200 px-3`}>
                  {communityTab.map((item) => {
                    const isActive = selectedTab === item;
                    return (
                      <div key={item} onClick={() => {
                        handleChangeTab(item);
                      }} className={`${flexCenter} ${isActive ? "bg-gray-200" : "bg-white"} border border-solid border-gray-300 h-[30px] w-[60px] rounded-md ml-3 text-[0.9rem] cursor-pointer`}>{item}</div>
                    )
                  })}
                  {/* 검색어 입력란 */}
                  <input 
                  ref={RefFocus}
                  onChange={(e)=>{setSearchKeyWord(e.target.value);}}
                  type='text' className={`${search || searchKeyWord !==  "" ? "opacity-100" : "opacity-0"}  w-[150px] ml-3 pl-2 border-[3px] outline-none border-gray-500 h-[30px] rounded-md`}></input>
                  {/* 검색버튼 영역 */}
                  <div className={`ml-auto mr-2`}>
                    <img 
                    onClick={()=> {setSearch(prev => !prev);handleFocus(); console.log(search);}}
                    src={`/images/검색.png`} alt='검색' className={`w-6 h-6 opacity-50`}></img>
                  </div>
                  
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
                  setActionList={setActionList}
                  userID={userInfo ? userInfo.user_id : ""}
                  userInfo={userInfo}
                />


                {/* 차단목록 컴포넌트 */}
                <Block 
                selectedTab = {selectedTab}
                communityTab = {communityTab}
                flexCenter = {flexCenter}
                blockedList = {blockedList}
                setActionList = {setActionList}
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
                  userName = {username}
                  friendList = {friendList}
                  blockedList = {blockedList}
                  setActionList = {setActionList}
                  userInfo = {userInfo}
                  />
            </div>
          </div>

        

        </div>
      </div>
    </>
  );
}