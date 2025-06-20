//client/src/componant/community/conversation.js
import {useState} from "react";
import ProfileModal from "./ui/profileModal";
import { formatDateTime } from "./utilities/dateUtils";

export default function Conversation(props) {
    const { message } = props;

    // 모달을 관리하기 위한 props
    const {
        friendList, 
        blockedList, 
        setActionList, 
        chattingList,
        userID,
        messageReads
    } = props;

    // 채팅방 사용 유저
    const {currentUserName} = props;
    const userName = props.message.name;
    // 프로필 클릭 상태관리
    const [clickedProfile, setClickedProfile] = useState({});

    if(!message.message)return null;
    return (
        <>
            <div className={`flex ${userName === currentUserName ? "justify-end" : ""} mt-2`}>
                {/* 채팅 프로필 */}
                <img
                onClick={()=> {
                    setClickedProfile(prev => ({...prev, [message.friend_id]:true}))
                }} 
                alt="미니프로필" src={message.profile_image_url} className={`w-[50px] h-[50px] rounded-[50%] ${userName === currentUserName ? "order-4 mr-4" : "ml-4"}`}>
                </img>
                {/* 프로필 클릭 모달 */}
                {clickedProfile[message.friend_id] && (
                    <ProfileModal
                        requestComponent = "conversation"
                        clickedProfile={clickedProfile}
                        setClickedProfile={setClickedProfile}
                        MemberKey={message.friend_id}
                        profile_image={message.profile_image_url}
                        friendList={friendList}
                        blockedList={blockedList}
                        chattingList={chattingList}
                        setActionList={setActionList}
                        userID={userID}
                    />
                )}


                {/* 닉네임과 내용 */}
                <div className={`${userName === currentUserName ? "order-3" : ""}`}>
                    {/* 채팅 닉네임 */}
                    <div className={`${userName === currentUserName ? "flex justify-end mr-2" : "ml-2"}`}>{message.name}</div>
                    {/* 채팅 내용 */}
                    <div style={{whiteSpace: `pre-line`}} className={`${userName !== currentUserName ? "bg-white" : "bg-[#E0F3FF]"} border-[1px] border-gray-300 border-solid rounded-md p-2 px-3 mx-2 font-bold`}>{message.message}</div>
                </div>

                {/* 채팅 시간 */}
                <span
                    className={`flex items-end font-sans ${userName === currentUserName ? "order-2" : ""}`}
                >{formatDateTime(message.datetime)}</span>
                {/* 읽음 수가 0이면 표시하지 않음 */}
                {messageReads !== 0 &&
                <div className={`text-yellow-500 ${userName === currentUserName ? "order-1" : ""} flex items-end mx-2 font-sans font-bold`}>{messageReads}</div>
                }
            </div>
        </>
    )
}