//client/src/componant/community/block.js

import {useState} from "react";
import ProfileModal from "./ui/profileModal";
import { CommunityButtons } from "./ui/button";

export default function Block(props) {
    // props로 전달받은 값
    const { flexCenter, selectedTab, communityTab, blockedList } = props;
    // 프로필 모달 상태관리
    const [clickedProfile, setClickedProfile] = useState({});
    // 차단해제버튼 상태관리
    const [checkedAction, setCheckedAction] = useState({});

    return (
        <>
            {/* 차단목록이 존재하지 않을 시 */}
            {blockedList.length === 0 && selectedTab === communityTab[2] ?
                (<div className={`${flexCenter} w-full h-full font-sans text-black text-opacity-50`}>차단목록이 존재하지 않습니다.</div>) :
                ("")}

            {/* 차단목록이 있을 시 */}
            {/* 차단목록 반복문 */}
            {blockedList.map((blocked, i) => {
                const isSelectedTab = selectedTab === communityTab[2]
                return (
                    <div key={i} className={`${isSelectedTab ? "block" : "hidden"} flex w-[90%] h-[90px] rounded-lg border border-solid border-gray-300 mb-2 cursor-pointer bg-gray-400 hover:bg-gray-300 `} >
                        {/* 프로필 사진 영역 */}
                        <div className={`${flexCenter} w-[80px] h-full`}>
                            {/* 프로필 사진 요소 */}
                            <img 
                            onClick={()=>{
                                setClickedProfile(prev => ({...prev,[blocked.name]:true}));
                            }}
                            src="/images/미니프로필.png" alt='미니프로필' className={`w-[60px] h-[60px]`}></img>
                            {/* 프로필모달 */}
                            <ProfileModal
                            clickedProfile = {clickedProfile}
                            setClickedProfile = {setClickedProfile}
                            MemberKey = {blocked.name}
                            blockedList = {blockedList}
                            />
                        </div>
                        {/* 닉네임/별점 영역 */}
                        <div className={`flex flex-col w-[calc(100%_-_140px)] h-full`}>
                            {/* 닉네임 요소 */}
                            <div className={`mt-3 font-sans font-bold`}>{blocked.name}</div>
                            {/* 별점 요소 */}
                            <div className={`mt-3`}><span className={`text-yellow-400`}>★ ★ ★ ★ ★</span><span className={`ml-2 font-sans text-[0.7rem]`}>4.82</span></div>
                        </div>
                        {/* 차단버튼 영역 */}
                        <div className={`w-[60px] h-full`}>
                            {/* 차단버튼 요소 */}
                            <div 
                            onClick={()=>{setCheckedAction(prev => ({...prev,[i]:true}));}}
                            className={`${flexCenter} w-[50px] h-[24px] mt-2 bg-red-100 border border-solid border-gray-300 rounded-md font-sans text-[0.7rem]`}>해제</div>
                        </div>
                        <CommunityButtons
                        checkedAction = {checkedAction}
                        setCheckedAction = {setCheckedAction}
                        title = {"차단해제"}
                        message = {"정말 해제 하시겠습니까?"}
                        action = {"해제하기"}
                        index = {i}
                        />
                    </div>
                )
            })}
        </>
    )
}