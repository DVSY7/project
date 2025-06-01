// client/src/componant/community/ui/profileModal.js
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import { CommunityButtons } from "./button";



// 프로필 클릭시 나타나는 모달
export default function ProfileModal(props) {

    const { clickedProfile, setClickedProfile, MemberKey, blockedList =[], friendList =[], profile_image } = props;
    const navigate = useNavigate();

    const [checkedAction, setCheckedAction] = useState({});

    // 모달 닫기 함수
    const handleClicked = ()=>{
        setClickedProfile(prev => {
            const updateClickedMember = {...prev};
            updateClickedMember[MemberKey] = false;
            return updateClickedMember;
        })
    }

    // 이미 친구인지 확인하는 변수
    const isFriend = friendList.some(member => member.friend_id === MemberKey);

    // 친구리스트 차단리스트 구분 변수
    const isChecked = blockedList.some(member => member.friend_id === MemberKey) 
    ? "해제" 
    // 이미 추가된 사용자면 차단버튼으로 설정
    : isFriend ? "차단" : "친구추가";

    // 프로필 이름 설정
    const profile = {
        "차단": friendList.filter(member => member.friend_id === MemberKey),
        "해제": blockedList.filter(member => member.friend_id === MemberKey),
        "친구추가" : []
    };
    // 설정된 프로필 이름 변수
    const selectedProfile = profile[isChecked][0];
    const profileName = selectedProfile? selectedProfile.name : "이름없음";
    
    // 프로필 옵션 관리 변수
    const profileOptions = [
        {option: "정보보기", img: "images/검색.png"},
        {option: isChecked, img: `images/${isChecked}.png`},
    ]
    // 포로필 옵션동작 함수
    const optionHandlers = {
        "정보보기": ()=>{console.log("정보보기 동작");
            navigate(`/profile?username=${MemberKey}`);
        },
        "친구추가": ()=>{console.log("친구추가 동작");
            handleChangeFunc();
        },
        "해제": ()=>{console.log("차단해제 동작");
            handleChangeFunc();
        },
        "차단": ()=>{console.log("차단 동작");
            handleChangeFunc();
        }
    }

    // 클릭한 버튼에 따라 동작하는 함수
    const handleChangeFunc = ()=>{
        setCheckedAction(prev => ({...prev, [MemberKey]: true}));
    }

    
    // 프로필 클릭 시 랜더링
    if (!clickedProfile[MemberKey]) { return null };
    return (
        <>
            {/* 프로필 모달 전체영역 */}
            <div
                onClick={handleClicked}
                key={MemberKey} className={`flex justify-center items-center bg-black bg-opacity-50 text-black z-50 fixed w-screen h-screen left-0 top-0`}>
                {/* 프로필 모달 요소영역 */}
                <div onClick={(e)=>{e.stopPropagation()}} className={`flex flex-col bg-white justify-center items-center w-[600px] h-[800px] rounded-xl`}>
                    {/* 프로필 닫기 영역 */}
                    <div className={`flex w-full justify-end h-[50px]`}>
                        <img 
                        alt="닫기"
                        src="images/닫기.png" 
                        className={`h-[30px] w-[30px] mx-4 mt-4 opacity-50 hover:opacity-100 transition-opacity duration-300`}
                        onClick={handleClicked}
                        ></img>

                    </div>
                    {/* 프로필 정보영역 */}
                    <div className={`flex flex-col justify-center items-center h-[630px] w-full`}>
                        {/* 프로필 이미지 */}
                        <img alt="미니프로필" src={profile_image} className={`w-[400px] h-[400px] rounded-[50%]`}></img>
                        {/* 프로필 이름 */}
                        <p className={`text-[2.2rem]`}>{profileName !== undefined ? profileName : null}</p>
                    </div>
                    {/* 프로필 옵션영역 */}
                    <div className={`flex justify-around border-t-[2px] border-gray-200 h-[120px] w-full`}>
                        {/* 프로필 옵션 변수를 순회하는 함수 */}
                        {profileOptions.map((options,index)=>{
                            return(
                                <div 
                                onClick={()=> {optionHandlers[options.option]()}}
                                key={index} className={`flex flex-col justify-center items-center w-[100px] hover:bg-gray-200 transition-colors duration-200`}>
                                <img alt={`${options.option}`} src={`${options.img}`} className={`w-[50px] h-45px`}></img>
                                <p>{options.option}</p>
                            </div>
                            )
                        })}
                        {/* 버튼클릭 시 확인메세지 모달 */}
                        {<CommunityButtons
                        checkedAction = {checkedAction}
                        setCheckedAction = {setCheckedAction}
                        title = {`${isChecked}`}
                        message = {`${profileName !== undefined ? profileName : null}님을 ${isChecked} 하시겠습니까?`}
                        action = {`${isChecked}`}
                        index = {MemberKey}
                        />}
                    </div>
                </div>
            </div>
        </>
    )
}