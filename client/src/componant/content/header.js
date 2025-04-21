import "../../App.css";
import { Link } from "react-router-dom";

export default function Header(props) {

    // 플렉스 상태 아이템 중앙
    const item_center = "flex items-center justify-center";
    // 로그인관련 옵션 버튼 호버
    const button_hover = "hover:bg-gray-200";

    // 토큰에서 검증된 유저이름
    const { username } = props;

    // 로그인 유저인지 확인
    const getToken = localStorage.getItem('token');


    return (
        <>
            <div className={"flex sm:flex-col sm:justify-center sm:items-center h-[15%] sm:h-[15%] sm:relative"}>
                {/* PC화면 기본요소 */}
                <div className={"hidden sm:flex sm:item-center sm:w-full sm:h-[40px]"}>
                    <div className={"absolute w-9 mx-8 mt-[0.45rem] right-search-line-after"}><img src="/images/프로필.png" alt="프로필" className={"w-full h-full"}></img></div>
                    <input type='text' id='search' name='search' className={"h-full w-[77%] pl-20 rounded-full mx-5 shadow-lg border-[1px] border-gray-400"}></input>
                    
                    {/* 비로그인 시 요소 */}
                    <div className={`${item_center} ${getToken !== "" ? "hidden" : ""} h-full w-[100px] rounded-full font-sans shadow-lg border-[1px] border-gray-400 ml-16 mr-5 ${button_hover}`}><Link to="/login">로그인</Link></div>
                    <div className={`${item_center} ${getToken !== "" ? "hidden" : ""} h-full w-[120px] rounded-full font-sans shadow-lg border-[1px] border-gray-400 ${button_hover}`}><Link to="/signup">회원가입</Link></div>                    

                    {/* 로그인 시 요소 */}
                    <div className={`${item_center} w-[220px] text-[20px]`}>Welcome Mate <p className={`mx-1`}>:</p><p className={`text-center font-bold block`}>{username}</p></div>
                    <div className={`${item_center} ${getToken === "" ? "hidden" : ""} h-full w-[120px] rounded-full font-sans shadow-lg border-[1px] border-gray-400 ${button_hover}`}><Link to="/login">로그아웃</Link></div>
                    
                </div>
                <div className={"hidden sm:flex sm:justify-between sm:items-end sm:ml-12 sm:w-full h-[30%]"}>
                    <div className={"font-sans italic"}>#바다 #해외여행 #언젠가</div>
                    <div className={'font-sans text-[10px] mr-[4.3vw] text-gray-500'}>최신순▼</div>
                </div>

                {/* 모바일화면 기본요소 */}
                <div className={"flex justify-between sm:hidden h-full w-full"}>
                    <div className={"flex justify-center items-center h-full w-[30vh] text-[30px]"}>BucketMate</div>
                    <div className={"flex justify-center items-end mr-4"}>
                        <img className={"w-10 h-10"} src="/images/검색.png" alt="검색"></img>
                    </div>
                </div>
            </div>

        </>
    )
}