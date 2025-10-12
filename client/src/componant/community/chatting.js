//client/src/componant/community/chatting.js
import React from "react";
import { formatDateTime } from "./utilities/dateUtils";
import { changeInterestColor } from "../profile/utilities/interestColor";

export default function Chatting(props) {
    // 전달받은 flexCenter 값
        const {flexCenter} = props;
    // 전달 받은 commmunityUserInfo,selectedTab, communityTab 값
        const {chattingList, selectedTab, communityTab} = props;

    // 전달받은 selectedList 스테이트
        const {selectedList} = props;
    
    // 전달받은 handleChangeList 값
        const {handleChangeList} = props;
        
    return (
        <React.Fragment>
            {/* 대화가 존재하지 않을 시 */}
            {chattingList.length === 0 && selectedTab === communityTab[1] ? (
                <div className={`${flexCenter} text-black text-opacity-50 w-full h-full`}>대화가존재하지 않습니다. 대화를 시작해주세요</div>
            ) : ""}

            {/* 대화목록 반복문 */}
            {chattingList.map((info,idx) => {
                const isSelectedList = selectedList === info.chat_room_id;
                const isSelectedTab = selectedTab === communityTab[1];
                const interest = info.theme.split("&")[0].trim();
                const interestColor = changeInterestColor(interest);

                return (
                    <div key={info.chat_room_id} onClick={() => { handleChangeList(info.chat_room_id); console.log("info",info.chat_room_id) }} className={`w-[90%] h-auto ${isSelectedList ? "bg-gray-200" : "bg-white"} ${isSelectedTab ? "block" : "hidden"} rounded-lg border border-solid border-gray-300 mb-2`}>

                        {/* 카테고리와 참여인원 */}
                        <div className={`flex items-center justify-between px-3 h-[30px] w-full font-sans mt-2`}>
                            <div className={`${flexCenter} h-[30px] w-auto text-[0.95rem] font-bold`}>{info.title}<span className={`${interestColor} w-auto px-3 ml-3 text-[0.7rem] rounded-2xl`}>{info.theme.split("&")[0]}</span></div><div className={`text-black text-opacity-50`}>{info.current_members}/{info.max_members}</div>
                        </div>

                        {/* 프로필과 닉네임 대화내용 */}
                        <div className={`flex  w-[full] h-[calc(100%_-_40px)] mb-2`}>

                            {/* 프로필 이미지 */}
                            <div className={`${flexCenter} h-full w-[80px]`}>
                                <img src={`${info.sender_profile_image_url}`} alt='미니프로필' className={` w-[50px] h-[50px] rounded-[50%] bg-cover bg-center`}></img>
                            </div>

                            {/* 닉네임/대화내용 */}
                            <div className={`w-[calc(100%_-_160px)] h-full`}>
                                <div className={`font-sans font-bold m-1`}>{info.sender_name}</div>
                                <div className={`ml-1 truncate text-[0.9rem]`}>{info.last_message}</div>
                            </div>

                            {/* 대화 시간 */}
                            <div className={`flex flex-col justify-between items-end w-[80px] h-full font-sans text-[0.8rem] pb-2 pr-2`}>
                                {info.unread_count !== 0 &&
                                <div className={`${flexCenter} w-auto min-w-[15px] h-[15px] rounded-full bg-red-500 border-4 border-solid border-red-500 text-white mt-1`}>{info.unread_count}</div>
                                }
                                {/* 가짜영역 */}
                                <div></div>
                                <div>{formatDateTime(info.last_message_time)}</div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </React.Fragment>
    )
}