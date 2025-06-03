import { useEffect, useState } from "react";
import Conversation from "./conversation";
import { insertDateHeaders, formatDateKorean } from "./utilities/dateUtils";
import { CheckedCurrentMemberButton, CommunityButtons } from "./ui/button";
import { fetchMessageAPI } from "./api/fetchMessageAPI";
export default function Chatroom(props) {

    // 전달된 대화방과 해당하는 유저정보
    const { chattingList, selectedList, flexCenter } = props;
    // 모달을 관리하기 위한 props
    const {friendList, blockedList, setActionList} = props;

    // 현재 로그인한 유저
    const {userName} = props;

    // 선택 된 방 상태관리
    const [chatroom, setChatroom] = useState("");

    // 선택 된 방 테마 상태관리
    const [chatroomTheme, setChatroomTheme] = useState("");

    // 선택 된 방 방장 프로필 상태관리
    const [chatroomProfile, setChatroomProfile] = useState("");

    // 선택 된 방 아이디
    const [chatroomID, setChatroomID] = useState("");

    // 참여인원/나가기 버튼 상태관리 스테이트
    const [checkedMember, setCheckedMember] = useState(false);

    // 나가기 버튼 상태관리 스테이트
    const [checkedAction, setCheckedAction] = useState({});

    // selectedList 값이 변동이 있을때만 실행
    useEffect(() => {
        const selectedFriend = chattingList.find((friend) => friend.title === selectedList);
        if (selectedFriend) {
            setChatroom(selectedFriend.owner_name);
            setChatroomProfile(selectedFriend.profile_image_url);
            setChatroomTheme(selectedFriend.theme);
            setChatroomID(selectedFriend.chat_room_id);
            console.log(selectedFriend);
        }
    }, [selectedList, chattingList]);

    // 채팅내용 상태관리
    const [messaging, setMessaging] = useState([]);
    useEffect(() => {
        const getMessage = async () => {
            try {
                // 채팅 불러오기 API
                setMessaging(await fetchMessageAPI(chatroomID));
            } catch (error) {
                console.error("메세지 불러오기 실패:", error);
            }
        };
        getMessage();
    }, [chatroomID]);

    // 날짜 구분 로직 추가
    const formattedMessages = insertDateHeaders(messaging);

    return (
        <>
            {/* 선택된 대화방이 없을 시 조건문 */}
            {chatroom === "" ? (
                <div className={`${flexCenter} w-full h-full text-black text-opacity-50`}>
                    불러온 대화방이 없습니다. 목록을 선택해주세요.
                </div>
            ) : (
                // 대화방 선택 시
                <>
                    {/* 선택된 대화방 헤더영역 */}
                    <div className={`flex items-center w-full h-[70px] border-b border-solid border-gary-300`}>
                        {/* 선택된 대화방 헤더요소 */}
                        <img src={`${chatroomProfile}`} alt="미니프로필" className={`w-[40px] h-[40px] rounded-[50%] ml-4`} />
                        <span className={`ml-4`}>{chatroom}</span>
                        <span className={`ml-4 p-1 px-3 rounded-3xl bg-yellow-100 font-sans font-bold`}>
                            {chatroomTheme}
                        </span>
                        <div
                            onClick={() => {
                                setCheckedMember(true);
                            }}
                            className={`${flexCenter} ml-auto bg-black text-white rounded-md w-[80px] h-[30px] text-[0.8rem] font-bold cursor-pointer`}
                        >
                            참여인원
                            {/* 참여인원 버튼 클릭 모달 */}
                            <CheckedCurrentMemberButton
                                checkedMember={checkedMember}
                                setCheckedMember={setCheckedMember}
                            />
                        </div>

                        <div
                            onClick={() => {
                                setCheckedAction(prev => ({ ...prev, [chattingList.id]: true }));
                            }}
                            className={`${flexCenter} mx-2 mr-4 bg-black text-white rounded-md w-[80px] h-[30px] text-[0.8rem] font-bold cursor-pointer`}
                        >
                            방 나가기
                            {/* 나가기 버튼 클릭 모달 */}
                            <CommunityButtons
                                checkedAction={checkedAction}
                                setCheckedAction={setCheckedAction}
                                title={`${chatroom}님의 대화방`}
                                message={"정말 나가시겠습니까?"}
                                action={"나가기"}
                            />
                        </div>
                    </div>

                    {/* 선택된 대화방 채팅영역 */}
                    <div className={`flex flex-col w-full h-[calc(100%_-_140px)] overflow-y-auto`}>
                        {formattedMessages.map((item, index) => {
                            if (item.type === "date-stamp") {
                                return (
                                    <div key={`date-${index}`} className="flex justify-center text-gray-500 font-bold my-4 font-sans">
                                        <div className={`border-[1px] border-solid border-black px-2 rounded-2xl`}>📅 {formatDateKorean(item.date)}</div>
                                    </div>
                                );
                            }
                            return (
                                <div key={index}>
                                    <Conversation 
                                        message={item}
                                        currentUserName={userName}
                                        friendList = {friendList}
                                        blockedList = {blockedList}
                                        chattingList = {messaging}
                                        setActionList = {setActionList}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {/* 채팅내용 입력 영역 */}
                    <div className={` flex items-center w-full h-[70px] border-t-[2px] border-solid border-gray-200`}>
                        <textarea placeholder="내용을 입력하세요." className={`focus:outline-none resize-none pt-5 pl-5 w-[calc(100%_-_120px)] rounded-3xl`}></textarea>
                        <img alt="클립" src="/images/클립.png" className={`w-[20px] h-[20px] mr-2`} />
                        <div className={`w-[70px] h-[35px] bg-black rounded-lg flex justify-center items-center`}>
                            <img alt="보내기" src="/images/보내기.png" className={`w-[20px] h-[20px]`} />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
