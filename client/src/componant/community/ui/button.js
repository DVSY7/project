//client/src/componant/community/ui/button.js

import { useState } from "react";
import ProfileModal from "./profileModal";
import React from "react";


// 나가기 버튼 모달 컴포넌트
export function ClosedChatroomButton(props) {

    const { checkedClose, setCheckedClose } = props;

    if (!checkedClose) return (null);
    return (
        <>
            <div className={`flex justify-center items-center absolute w-screen h-screen left-0 top-0 text-black cursor-default`}>
                <div className={`flex flex-col justify-between bg-white border-[1px] border-gray400 shadow-lg w-[400px] h-[250px] rounded-lg`}>
                    <div className={`flex justify-center items-center text-[1.7rem] h-[60px] border-b-[2px] border-gray-200`}>채팅방 제목</div>
                    <div className={`flex justify-center text-[1.3rem]`} >정말 나가시겠습니까?</div>
                    <div className={`flex justify-end text-white`}>
                        <button className={`p-2 px-3 my-2 mx-1 bg-blue-500 text-[1.1rem] rounded-md`}>나가기</button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setCheckedClose(false);
                            }}
                            className={`p-2 px-3 my-2 mx-1 mr-2 bg-blue-500 text-[1.1rem] rounded-md cursor-pointer`}>취소
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

// 참여인원 확인 모달 컴포넌트
export function CheckedCurrentMemberButton(props) {

    const { checkedMember, setCheckedMember } = props;

    // 반복문 실행을 위한 셈플 배열
    const conversationMember = Array.from({ length: 5 }, (_, i) => i);

    // 프로필 클릭 상태관리 스테이트
    const [clickedProfile, setClickedProfile] = useState(conversationMember.map(() => false));

    // 참여인원 버튼 클릭 시 랜더링
    if (!checkedMember) return (null);
    return (
        <>  
            {/* 모달전체 영역 */}
            <div className={`flex justify-center items-center min-h-[800px] w-screen h-screen absolute left-0 top-0 text-black cursor-default bg-black bg-opacity-50`}>
                <div className={`flex flex-col justify-between bg-white w-[600px] h-[800px] rounded-xl border-[1px] border-gray-200 shadow-md`}>
                    {/* 대화상대 표시 영역*/}
                    <div className={`flex h-[50px] items-center text-[1.2rem] font-sans border-b-[2px] border-gray-200`}>
                        <span className={`ml-4`}>대화상대</span>
                        {/* 이부분에 백엔드 필요 */}
                        <span className={`ml-2`}>5</span>
                    </div>
                    {/* 대화상대 목록영역 */}
                    <div
                      className={`flex flex-col items-start ml-4 h-[650px] overflow-y-auto font-sans text-[1.2rem]`}>
                        {conversationMember.map((Member, key) => {
                            return (
                                <React.Fragment key = {key}>
                                    <div
                                    onClick={()=> {setClickedProfile(prev => {
                                        const updateClickedMember = [...prev];
                                        updateClickedMember[key] = true;
                                        return updateClickedMember;
                                    }
                                        )}} 
                                    className={`${key === 0 && "mt-5"} flex hover:bg-gray-200 transition-colors duration-300 items-center bg-white border-[1px] border-gray-200 rounded-md min-h-[70px] h-[70px] w-[550px] my-2`}>
                                        <img alt="미니프로필" src={"images/미니프로필.png"} className={`h-[50px] w-[50px] mx-4`}></img>
                                        SAMPLE DATA {Member}
                                        <div className={`flex justify-center items-center ml-auto mr-3 bg-gray-300 w-[60px] h-[40px] rounded-md`}>
                                            <img alt="친구추가" src="images/친구추가.png" className={`w-[30px] h-[30px] ml-2`}></img>
                                        </div>
                                    </div>
                                    <ProfileModal
                                        MemberKey = {key}
                                        clickedProfile = {clickedProfile}
                                        setClickedProfile = {setClickedProfile}
                                    />
                                </React.Fragment>
                            )
                        })}
                    </div>
                    <div className={`flex justify-center items-center h-[100px] border-t-[2px] border-gray-200`}>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setCheckedMember(false);
                            }}
                            className={`h-[50px] w-[100px] bg-blue-500 text-white font-sans text-[1.2rem] rounded-lg`}>확인
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}