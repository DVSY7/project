import { useEffect, useState } from "react";

export default function Chatroom(props) {

    // 전달된 대화방과 해당하는 유저정보
    const { chattingList, selectedList, flexCenter } = props;
    // 
    const [chatroom, setChatroom] = useState("");


    useEffect(() => {
        const selectedFriend = chattingList.find((friend) => friend.id === selectedList);
        if (selectedFriend) {
            setChatroom(selectedFriend.name);
        }

    }, [selectedList]);


    return (
        <>
            {/* 선택된 대화방이 없을 시 조건문 */}
            {chatroom === "" ? (
                <div className={`${flexCenter} w-full h-full text-black text-opacity-50`}>불러온 대화방이 없습니다. 목록을 선택해주세요.</div>) :

                // 대화방 선택 시
                (<>
                    {/* 선택된 대화방 헤더영역 */}
                    <div className={`flex items-center w-full h-[70px] border-b border-solid border-gary-300`}>
                        {/* 선택된 대화방 헤더요소 */}
                        {/* 프로필이미지 */}
                        <img src='/images/미니프로필.png' className={`w-[40px] h-[40px] ml-4`}></img>
                        {/* 닉네임 */}
                        <span className={`ml-2`}>{chatroom}</span>
                        <span className={`ml-8 p-1 px-3 rounded-3xl bg-yellow-100 font-sans font-bold`}>나만의 케이크 만들기</span>
                        <div className={`${flexCenter} ml-auto bg-black text-white rounded-md w-[80px] h-[30px] text-[0.8rem] font-bold cursor-pointer`}>참여인원</div>
                        <div className={`${flexCenter} mx-2 mr-4 bg-black text-white rounded-md w-[80px] h-[30px] text-[0.8rem] font-bold cursor-pointer`}>방 나가기</div>
                    </div>
                    {/* 선택된 대화방 채팅영역 */}
                    <div className={`flex w-full h-[calc(100%_-_140px)]`}>1</div>
                    <div className={`w-full h-[70px]`}></div>

                </>)
            }
        </>
    )
}