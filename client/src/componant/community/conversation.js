//client/src/componant/community/conversation.js
import {useState} from "react";
import ProfileModal from "./ui/profileModal";

export default function Conversation(props) {
    const { message } = props;
    const userName = props.message.username;
    // console.log(userName);
    // 프로필 클릭 상태관리
    const [clickedProfile, setClickedProfile] = useState({});

    return (
        <>
            <div className={`flex ${userName !== "레이첼" ? "justify-end" : ""} mt-2`}>
                {/* 채팅 프로필 */}
                <img
                onClick={()=> {
                    setClickedProfile(prev => ({...prev, [userName]:true}))
                }} 
                alt="미니프로필" src={message.profile} className={`w-[50px] h-[50px] ${userName !== "레이첼" ? "order-3 mr-4" : "ml-4"}`}>
                </img>
                {/* 프로필 클릭 모달 */}
                <ProfileModal
                    clickedProfile = {clickedProfile}
                    setClickedProfile = {setClickedProfile}
                    MemberKey = {userName}
                />

                {/* 닉네임과 내용 */}
                <div className={`${userName !== "레이첼" ? "order-2" : ""}`}>
                    {/* 채팅 닉네임 */}
                    <div className={`${userName !== "레이첼" ? "flex justify-end mr-2" : "ml-2"}`}>{message.username}</div>
                    {/* 채팅 내용 */}
                    <div className={`${userName !== "레이첼" ? "bg-white" : "bg-[#E0F3FF]"} border-[1px] border-gray-300 border-solid rounded-md p-2 px-3 mx-2 font-bold`}>{message.message}</div>
                </div>

                {/* 채팅 시간 */}
                <span
                    className={`flex items-end font-sans ${userName !== "레이첼" ? "order-1" : ""}`}
                >{new Date(message.datetime).toLocaleTimeString('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                })}</span>
            </div>
        </>
    )
}