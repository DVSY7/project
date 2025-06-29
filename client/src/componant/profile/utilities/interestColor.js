//client/src/componant/profile/utilities/interestColor.js

export const changeInterestColor = (type)=>{
    // interest color 변경 변수
        const InterestColor = {
            "여행":"bg-sky-100",
            "도전":"bg-red-100",
            "자기계발":"bg-green-100",
            "건강":"bg-green-100",
            "문화":"bg-amber-100",
            "요리":"bg-yellow-100",
            "봉사":"bg-purple-100",
            "취미":"bg-orange-100",
            "기타":"bg-gray-100"
        }
        return InterestColor[type];
}

export const changeChatRoomColor = (type) =>{
    // chatRoom color 변경 변수
    const ChatRoomColor = {
            "여행":"bg-sky-50",
            "도전":"bg-red-50",
            "자기계발":"bg-green-50",
            "건강":"bg-green-50",
            "문화":"bg-amber-50",
            "요리":"bg-yellow-50",
            "봉사":"bg-purple-50",
            "취미":"bg-orange-50",
            "기타":"bg-gray-50"
        }
        return ChatRoomColor[type];
}