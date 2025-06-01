//client/src/componant/community/friend.js

import {useState} from "react";
import ProfileModal from "./ui/profileModal";
import { CommunityButtons } from "./ui/button";

export default function Friend(props) {
    // 친구목록 탭을 관리하기 위해 전달받은 값
    const { selectedTab, communityTab, flexCenter, friendList, setActionList } = props;

    // 차단버튼 상태관리
    const [checkedAction, setCheckedAction] = useState({});

    // 프로필 모달 상태관리 
    const [clickedProfile, setClickedProfile] = useState({});   

    return (
        <>
            {/* 가져온 정보가 하나도 없을 시 */}
            {friendList.length === 0 && selectedTab === communityTab[0] ? (
                <div className={`${flexCenter} text-black text-opacity-50 w-full h-full`}>등록된 친구가 없습니다. 친구를 추가하세요!</div>) :
                ("")}

            {/* 가져온 정보가 있다면 */}
            {/* 친구목록 반복문 */}
            {friendList.map((friend, i) => {
                const isSelectedTab = selectedTab === communityTab[0]
                return (
                    <div key={i} className={`${isSelectedTab ? "block" : "hidden"} flex w-[90%] h-[90px] rounded-lg border border-solid border-gray-300 mb-2 cursor-pointer hover:bg-gray-100 `} >
                        {/* 프로필 사진 영역 */}
                        <div className={`${flexCenter} w-[80px] h-full`}>
                            {/* 프로필 사진 요소 */}
                            <img 
                            onClick={()=>{
                                setClickedProfile(prev=> ({...prev,[friend.friend_id]:true}))
                            }}
                            src={`${friend.profile_image_url}`} alt='미니프로필' className={`w-[60px] h-[60px] rounded-[50%] bg-cover bg-center`}></img>
                            {/* 프로필 모달 */}
                            <ProfileModal
                            clickedProfile = {clickedProfile}
                            setClickedProfile = {setClickedProfile}
                            friendList = {friendList}
                            MemberKey = {friend.friend_id}
                            profile_image = {friend.profile_image_url}
                            />
                        </div>
                        {/* 닉네임/별점 영역 */}
                        <div className={`flex flex-col w-[calc(100%_-_140px)] h-full`}>
                            {/* 닉네임 요소 */}
                            <div className={`mt-3 font-sans font-bold`}>{friend.name}</div>
                            {/* 별점 요소 */}
                            <div className={`mt-3`}><span className={`text-yellow-400`}>★ ★ ★ ★ ★</span><span className={`ml-2 font-sans text-[0.7rem]`}>4.82</span></div>
                        </div>
                        {/* 차단버튼 영역 */}
                        <div className={`w-[60px] h-full`}>
                            {/* 차단버튼 요소 */}
                            <div
                            onClick={()=>{setCheckedAction(prev => ({...prev,[i]:true}));}} 
                            className={`${flexCenter} w-[50px] h-[24px] mt-2 border border-solid border-gray-300 rounded-md font-sans text-[0.7rem]`}>차단</div>
                        </div>
                        {/* 차단버튼 모달 */}
                        <CommunityButtons
                        checkedAction = {checkedAction}
                        setCheckedAction = {setCheckedAction}
                        title = {"친구차단"}
                        message = {`${friend.name}님을 차단 하시겠습니까?`}
                        action = {"차단"}
                        index = {i}
                        setActionList = {setActionList}
                        userID = {friend.friend_id}
                        />
                    </div>
                )
            })}


        </>
    )
}