import "../../App.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header(props) {

    // 플렉스 상태 아이템 중앙
    const item_center = "flex items-center justify-center";
    // 로그인관련 옵션 버튼 호버
    const button_hover = "hover:bg-gray-200";

    // 토큰에서 검증된 유저이름
    const { username } = props;

    // 로그인 로그아웃 상태관리 스테이트
    const [Token, setToken] = useState(null);

    // 검색창 이미지 변경 스테이트
    const [searchImage, setSeachImage] = useState(true);


    // 컴포넌트가 마운트될 때 토큰 가져오기
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken && storedToken !== 'null') {
            setToken(storedToken);
        }
    }, []);;

    // 로그아웃 버튼 함수
    const handleChangeLogout = () => {
        localStorage.setItem('token', null);
        setToken(null);
    }
    
    // 검색창 정보를 관리하는 스테이트
    const [searchValue, setSearchValues] = useState("");

    

    return (
        <>
            <div className={"flex sm:flex-col sm:justify-center sm:items-center h-[15%] sm:h-[15%] max-w-[1920px] sm:relative"}>
                {/* PC화면 기본요소 */}
                <div className={"hidden sm:flex sm:item-center sm:w-full max-w-[1920px] sm:h-[40px]"}>
                    <div className={`absolute w-9 mx-8 mt-[0.45rem] right-search-line-after`}>
                        <img 
                        src={`/images/${searchImage? "유저검색" : "태그검색"}.png`} 
                        alt="검색창 이미지" 
                        className={"w-[25px] h-[25px] z-10 relative cursor-pointer opacity-50 hover:opacity-100  transition-o duration-500"}
                        onClick={()=>{searchImage? setSeachImage(false) : setSeachImage(true); console.log(searchImage)}}
                        ></img>
                        </div>

                    {/* 검색창 영역 */}
                    <input
                        type='text'
                        id='search'
                        name='search'
                        className={"h-full w-[77%] pl-16 rounded-full mx-5 shadow-lg border-[1px] border-gray-400"}
                        placeholder={`${searchImage? "유저검색(아이콘을 눌러 전환)" : "태그검색(아이콘을 눌러 전환)"}` }
                        onChange={(e) => {
                            setSearchValues(e.target.value);
                            console.log(searchValue);
                        }}
                        >
                    </input>

                        <img 
                        src="/images/검색.png"
                        className={`w-[25px] h-[25px] relative right-16 mt-2 `}
                        ></img>

                    {/* 비로그인 시 요소 */}
                    <div className={`${item_center} ${Token !== null ? "hidden" : ""} h-full w-[100px] rounded-full font-sans shadow-lg border-[1px] border-gray-400 ml-16 mr-5 ${button_hover}`}><Link to="/login">로그인</Link></div>
                    <div className={`${item_center} ${Token !== null ? "hidden" : ""} h-full w-[120px] rounded-full font-sans shadow-lg border-[1px] border-gray-400 ${button_hover}`}><Link to="/signup">회원가입</Link></div>

                    {/* 로그인 시 요소 */}
                    <div className={`flex items-center ${Token === null ? "hidden" : ""} w-[220px] text-[20px]`}>Welcome Mate <p className={`mx-1`}>:</p><p className={`text-center font-sans font-bold block`}>{username}</p></div>
                    <div className={`${item_center} ${Token === null ? "hidden" : ""} h-full w-[100px] rounded-full font-sans shadow-lg border-[1px] border-gray-400 ${button_hover}`}><Link to="/login" onClick={handleChangeLogout}>로그아웃</Link></div>

                </div>
                <div className={"hidden sm:flex sm:items-end sm:ml-12 sm:w-full max-w-[1920px] h-[30%]"}>
                    <div className={"font-sans italic"}>#바다 #해외여행 #언젠가</div>
                    <div className={'font-sans text-[10px] text-gray-500 ml-auto mr-20'}>최신순▼</div>
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