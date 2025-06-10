//client/src/componant/community/chatroom.js

import { useEffect, useState, useMemo, useRef } from "react";
import Conversation from "./conversation";
import { insertDateHeaders, formatDateKorean } from "./utilities/dateUtils";
import { CheckedCurrentMemberButton, CommunityButtons } from "./ui/button";
import { fetchMessageAPI } from "./api/fetchMessageAPI";
import io from "socket.io-client";

export default function Chatroom(props) {

    // 전달된 대화방과 해당하는 유저정보
    const { chattingList, selectedList, flexCenter } = props;
    // 모달을 관리하기 위한 props
    const {friendList, blockedList, setActionList} = props;
    // 채팅 송신을 위한 props
    const {userInfo} = props;

    // 현재 로그인한 유저
    const {userName} = props;

    // 대화목록 최신화 props
    const {setFetchChatList} = props;

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

    // 채팅에 입력한 내용 상태관리
    const [messageText, setMessageText] = useState("");


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

    // 참여인원 상태관리
    const [currentMembers, setCurrentMembers] = useState([]);

    useEffect(() => {
        const getMessage = async () => {
            try {
                // 채팅 불러오기 API
                setMessaging(await fetchMessageAPI(chatroomID, "chatmessage"));
                // 참여인원 불러오기 API
                setCurrentMembers(await fetchMessageAPI(chatroomID, "currentMember"));
            } catch (error) {
                console.error("메세지 불러오기 실패:", error);
            }
        };
        getMessage();
    }, [chatroomID]);

    // 날짜 구분 로직 추가
    const formattedMessages = useMemo(()=>{
        return insertDateHeaders(messaging);
    },[messaging]); 

    const socketRef = useRef();

    // socket에 연결하는 로직
    useEffect(() => {
        // 소켓 생성
        if (!socketRef.current) {
            socketRef.current = io("http://localhost:5000", {
                transports: ["websocket"], // 안정적인 연결 방식 사용
                autoConnect: false,        // 직접 connect() 호출
            });
        }

        const socket = socketRef.current;


        if (!chatroomID) return;

        console.log("[소켓] 연결 시도 (connect) - 방 ID:", chatroomID);
        socket.connect();

        socket.on("connect", () => {
            console.log("[소켓] 연결 성공:", socket.id);
            socket.emit("join_room", chatroomID);
            console.log("[소켓] join_room emit:", chatroomID);
        });

        // 메세지 수신하는 부분
        socket.on("receive_message", (msg) => {
            console.log("[소켓] receive_message 수신:", msg);
            setMessaging((prev) => [...prev, msg]);
        });

        socket.on("disconnect", () => {
            console.log("[소켓] 연결 해제됨");
        });

        socket.on("connect_error", (err) => {
            console.error("[소켓] 연결 오류:", err.message);
        });

        return () => {
            console.log("[소켓] leave_room emit:", chatroomID);
            socket.emit("leave_room", chatroomID);
            socket.off("receive_message");
            socket.disconnect();
            console.log("[소켓] 연결 해제 (disconnect)");
        };
    }, [chatroomID]);

    // 메세지 송신함수
    const handleSendMessage = () => {
        if (!messageText.trim()) return;

        const socket = socketRef.current;

        if (!socket || !socket.connected) {
            console.warn("소켓 연결되지 않음. 메시지 전송 불가.");
            return;
        }

        const now = new Date();
        const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000); // 9시간 더함
        const newMessage = {
            chat_room_id: chatroomID,
            sender_id: userInfo.friend_id,
            profile_image_url: userInfo.profile_image_url,
            name: userInfo.name,
            message: messageText,
            datetime: kst.toISOString().slice(0,19).replace("T", " "),
        };

        socket.emit("send_message", newMessage);
        // setMessaging((prev) => [...prev, newMessage]);
        setMessageText("");
    };

    // 메세지 전송 후 스크롤
    const messageEndRef = useRef(null);

    useEffect(()=> {
        if(messageEndRef.current){
            messageEndRef.current.scrollIntoView({behavior: "smooth"});
        }
        setFetchChatList(messaging);
    },[messaging]);


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
                            className={`${flexCenter} ml-auto bg-black hover:bg-blue-500 transition-colors duration-300 text-white rounded-md w-[80px] h-[30px] text-[0.8rem] font-bold cursor-pointer`}
                        >
                            참여인원
                            {/* 참여인원 버튼 클릭 모달 */}
                            <CheckedCurrentMemberButton
                                friendList = {friendList}
                                blockedList = {blockedList}
                                checkedMember={checkedMember}
                                setCheckedMember={setCheckedMember}
                                chattingList={currentMembers}
                                setActionList = {setActionList}
                                userID = {userInfo.friend_id}
                            />
                        </div>

                        <div
                            onClick={() => {
                                setCheckedAction(prev => ({ ...prev, [chattingList.id]: true }));
                            }}
                            className={`${flexCenter} mx-2 mr-4 bg-black hover:bg-blue-500 transition-colors duration-300 text-white rounded-md w-[80px] h-[30px] text-[0.8rem] font-bold cursor-pointer`}
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
                                <div key={index-1}>
                                    <Conversation 
                                        message={item}
                                        currentUserName={userName}
                                        friendList = {friendList}
                                        blockedList = {blockedList}
                                        chattingList = {messaging}
                                        setActionList = {setActionList}
                                        currentMembers = {currentMembers.length}
                                        userID = {userInfo.friend_id}
                                    />
                                    <div ref={messageEndRef} className={`h-[10px]`}></div>
                                </div>
                            );
                        })}
                    </div>

                    {/* 채팅내용 입력 영역 */}
                    <div className={` flex items-center w-full h-[70px] border-t-[2px] border-solid border-gray-200`}>
                        <textarea
                        value={messageText}
                        onKeyDown={(e) => {
                            if(e.key === 'Enter'){
                                if(e.shiftKey){
                                    return;
                                }else{
                                    e.preventDefault(); // 기본 Enter 줄바꿈 방지
                                    handleSendMessage();
                                }
                            }
                        }} 
                        onChange={(e)=> {setMessageText(e.target.value); console.log(messageText)}}
                        placeholder="내용을 입력하세요." className={`focus:outline-none resize-none pt-5 pl-5 w-[calc(100%_-_120px)] rounded-3xl`}></textarea>
                        <img alt="클립" src="/images/클립.png" className={`w-[20px] h-[20px] mr-2`} />
                        <div 
                        onClick={handleSendMessage}
                        className={`w-[70px] h-[35px] bg-black hover:bg-blue-500 transition-colors duration-300 cursor-pointer rounded-lg flex justify-center items-center`}>
                            <img alt="보내기" src="/images/보내기.png" className={`w-[20px] h-[20px]`} />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
