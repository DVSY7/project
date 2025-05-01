import "../../App.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { search } from "./utilities/search";
import SearchCategory from "./ui/searchCategory";

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
    const [searchImage, setSearchImage] = useState(true);

    // 검색 옵션 상태관리 스테이트
    const [searchCategory, setSearchCategory] = useState(false);
    // 검색 옵션선택 상태관리 스테이트
    const [selectedCategory, setSelectedCategory] = useState("최신순");


    // 컴포넌트가 마운트될 때 토큰 가져오기
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken && storedToken !== 'null') {
            setToken(storedToken);
        }
    }, []);;

    // 검색창 정보를 관리하는 스테이트
    const [searchValues, setSearchValues] = useState("");


    // 해쉬태그를 저장하는 스테이트
    const [searchHashtags, setSearchHashtags] = useState([]);
    // 이후 추가적으로 해쉬태그 저장배열을 통해서 데이터베이스에
    // 데이터를 요청하는 작업수행 <<< 이곳에

    // 해쉬태그 분리 함수
    const handleTags = (tags) => {
        // #을 기준으로 태그를 분리
        const parseHashtags = tags
            .split('#')  // #을 기준으로 분리
            .filter(Boolean)  // 빈 값을 필터링
            .map(word => word.trim());  // 각 단어에서 앞뒤 공백 제거

        setSearchHashtags(prevTags => {
            const validTags = [];
            let hasInvalidTag = false;

            parseHashtags.forEach(tag => {
                // 태그 길이가 20자를 초과하면 유효하지 않음
                if (tag.length > 0 && tag.length <= 20 && /^[a-zA-Z0-9가-힣\s]+$/.test(tag) && !prevTags.includes(tag)) {
                    validTags.push(tag);  // 유효한 태그만 추가
                } else {
                    hasInvalidTag = true;  // 유효하지 않은 태그가 있으면 알림 표시
                }
            });

            // 유효하지 않은 태그가 있으면 알림 띄우기
            if (hasInvalidTag) {
                alert('모든 태그는 "#"으로 시작해야 하며, 특수문자 외에 띄어쓰기는 허용됩니다. 또한, 태그의 길이는 20자 이하이어야 합니다.');
            }

            // 유효한 태그만 반환
            return [...prevTags, ...validTags];
        });
    };


    useEffect(() => {
        // console.log(searchHashtags);
        search(searchHashtags);
    }, [searchHashtags]);



    return (
        <>
            <div className={"flex sm:flex-col sm:justify-center sm:items-center h-[15%] sm:h-[15%] max-w-[1920px] sm:relative"}>
                {/* PC화면 기본요소 */}
                <div className={"hidden sm:flex sm:item-center sm:w-full max-w-[1920px] sm:h-[40px]"}>
                    <div className={`absolute w-9 mx-8 mt-[0.45rem] right-search-line-after`}>
                        <img
                            src={`/images/${searchImage ? "유저검색" : "태그검색"}.png`}
                            alt="검색창 이미지"
                            className={"w-[25px] h-[25px] z-10 relative cursor-pointer opacity-50 hover:opacity-100  transition-o duration-500"}
                            onClick={() => { searchImage ? setSearchImage(false) : setSearchImage(true); console.log(searchImage) }}
                        ></img>
                    </div>

                    {/* 검색창 영역 */}
                    <input
                        type='text'
                        id='search'
                        name='search'
                        className={"h-full w-[77%] pl-16 rounded-full mx-5 shadow-lg border-[1px] border-gray-400 font-sans"}
                        value={searchValues}
                        placeholder={`${searchImage ? "유저 검색 (아이콘을 눌러 전환)" : "태그 검색 (아이콘을 눌러 전환)"}`}

                        // 인풋란에 입력값이 들어올때 마다 상태 업데이트
                        onChange={(e) => {
                            setSearchValues(e.target.value);
                            console.log(e.target.value);
                        }}
                        // 엔터를 눌러서도 검색이 가능하도록 변경
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                if (!searchImage) {
                                    handleTags(searchValues);
                                    setSearchValues("");
                                }else{
                                    search(searchValues);
                                    setSearchValues("");
                                }
                            }
                        }}
                    >
                    </input>

                    <img
                        src="/images/검색.png"
                        alt="검색"
                        className={`w-[25px] h-[25px] relative right-16 mt-2 opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer `}
                        onClick={() => {
                            if (!searchImage) {
                                handleTags(searchValues);
                                setSearchValues("");
                            } else {

                                // 여기에 데이터베이스에 데이터 요청하는 코드작성
                                search(searchValues);
                                setSearchValues("");
                            }
                        }}
                    ></img>

                    {/* 비로그인 시 요소 */}
                    <div className={`${item_center} ${Token !== null ? "hidden" : ""} h-full w-[100px] rounded-full font-sans shadow-lg border-[1px] border-gray-400 ml-16 mr-5 ${button_hover}`}><Link to="/login">로그인</Link></div>
                    <div className={`${item_center} ${Token !== null ? "hidden" : ""} h-full w-[120px] rounded-full font-sans shadow-lg border-[1px] border-gray-400 ${button_hover}`}><Link to="/signup">회원가입</Link></div>

                    {/* 로그인 시 요소 */}
                    <div className={`flex items-center ${Token === null ? "hidden" : ""} w-[220px] text-[20px]`}>Welcome Mate <p className={`mx-1`}>:</p><p className={`text-center font-sans font-bold block`}>{username}</p></div>

                </div>
                <div className={"hidden sm:flex sm:items-end sm:ml-12 sm:w-full max-w-[1920px] h-[30%] max-h-[30%]"}>

                    {/* 태그요소 랜더링하는 부분 */}
                    <div className={"flex font-sans italic max-h-full overflow-y-auto"}>
                        {searchHashtags.map((tags) => {
                            return (
                                <div
                                    key={tags}
                                    className={`flex justify-center items-center ml-2 bg-gray-200 p-1 px-2 rounded-2xl cursor-pointer`}
                                    onClick={() => {
                                        // 클릭된 태그를 배열에서 제거하는 함수
                                        setSearchHashtags((prevTags) => prevTags.filter(tag => tag !== tags));
                                    }}
                                >#{tags}
                                    <img
                                        src="/images/엑스표시.png"
                                        alt="엑스표시"
                                        className={`w-4 h-4 ml-1 opacity-50`}
                                    >
                                    </img>
                                </div>
                            )
                        })}
                    </div>
                    <div 
                    onClick={(e)=>{setSearchCategory(prev => !prev)}}
                    className={'font-sans text-[12px] text-gray-500 ml-auto mr-20 relative cursor-pointer'}>
                        {selectedCategory}▼
                        {searchCategory&& 
                            <SearchCategory 
                                onSelect={(value) => {
                                    setSelectedCategory(value);
                                    setSearchCategory(false);
                                    console.log("선택된 정렬 기준:",value);
                                }}
                                
                            />}
                    </div>
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