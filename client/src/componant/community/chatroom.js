import { useEffect, useState } from "react";
import Conversation from "./conversation";

export default function Chatroom(props) {

    // 전달된 대화방과 해당하는 유저정보
    const {chattingList, selectedList, flexCenter} = props;

    // 선택 된 방 상태관리 스테이트
    const [chatroom, setChatroom] = useState("");

    // selectedList 값이 변동이 있을때만 실행
    useEffect(() => {
        const selectedFriend = chattingList.find((friend) => friend.id === selectedList);
        if (selectedFriend) {
            setChatroom(selectedFriend.name);
        }

    }, [selectedList,chattingList]);

    // 채팅내용을 가져올 변수
    const messaging = [
        {
            name: "상열",
            profile: "/images/미니프로필.png",
            message: "안녕하세요",
            datetime: "2025-05-08T14:30:00",
            rating: "4.5",
        },
        {
            name: "레이첼",
            profile: "/images/미니프로필.png",
            message: "어서오세요. 환영합니다. \n 용건은?",
            datetime: "2025-05-08T14:31:00",
            rating: "4.5",
        },
        {
            name: "상열",
            profile: "/images/미니프로필.png",
            message: "케이크 만들기 같이하고 싶어요!",
            datetime: "2025-05-08T14:32:00",
            rating: "4.5",
        },
        {
            name: "레이첼",
            profile: "/images/미니프로필.png",
            message: "좋아요 같이해봐요!",
            datetime: "2025-05-08T14:31:00",
            rating: "4.5",
        },   
    ]

    


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
                        <img src='/images/미니프로필.png' alt="미니프로필" className={`w-[40px] h-[40px] ml-4`}></img>
                        {/* 닉네임 */}
                        <span className={`ml-2`}>{chatroom}</span>
                        <span className={`ml-8 p-1 px-3 rounded-3xl bg-yellow-100 font-sans font-bold`}>나만의 케이크 만들기</span>
                        <div className={`${flexCenter} ml-auto bg-black text-white rounded-md w-[80px] h-[30px] text-[0.8rem] font-bold cursor-pointer`}>참여인원</div>
                        <div className={`${flexCenter} mx-2 mr-4 bg-black text-white rounded-md w-[80px] h-[30px] text-[0.8rem] font-bold cursor-pointer`}>방 나가기</div>
                    </div>
                    {/* 선택된 대화방 채팅영역 */}
                    <div className={`flex flex-col w-full h-[calc(100%_-_140px)] overflow-y-auto`}>
                        {Object.entries(messaging).map(([key,value]) => {
                            return(
                                // 대화박스 영역
                                <div key={key}>
                                    <Conversation message = {value}/>
                                </div>
                            )
                        })}
                    </div>

                    {/* 채팅내용 입력 영역 */}
                    <div className={` flex items-center w-full h-[70px] border-t-[2px] border-solid border-gray-200`}>
                        <textarea placeholder="내용을 입력하세요." className={`focus:outline-none resize-none pt-5 pl-5 w-[calc(100%_-_120px)]`}></textarea>
                        <img src="/images/클립.png" className={`w-[20px] h-[20px] mr-2`}></img>
                        <div className={`w-[70px] h-[35px] bg-black rounded-lg flex justify-center items-center`}><img src="/images/보내기.png" className={`w-[20px] h-[20px]`}></img></div>
                    </div>

                </>)
            }
        </>
    )
}