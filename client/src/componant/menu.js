import '../App.css';
import { Link } from "react-router-dom";
import {useState, useEffect} from 'react';


export default function Menu(props) {

  // 메뉴부분 레이아웃css
  const menu = "flex flex-col row-span-1 row-start-10 sm:row-start-1 min-w-[150px] sm:right-line-after";
  // 메뉴 이미지
  const img_size = "w-10 sm:w-[4vh] sm:pr-2";
  // 메뉴 텍스트
  const text = 'sm:flex p-4 px-10 items-center justify-center 2xl:justify-start w-full relative z-10';
  // 메뉴 텍스트 크기
  const text_size = "sm:text-[3vh] md:text-[2vh] lg:text-[1em] xl:text-[1em] 2xl:text-[1.7vh]";
  // 메뉴 호버
  const hover =`hover:bg-gray-200 transition-bg duration-500`;



  // 모바일버전 사라지는 요소
  const m_menu = 'hidden sm:block';
  // 반응형으로 사라지는 요소
  const activeMenu = "hidden 2xl:block"

  const {current_src} = props;

  const img_src = Object.fromEntries(
    [1, 2, 3, 4, 5].map(n => [n, n === current_src ? 1 : 2])
  );

  // 로그인 로그아웃 상태관리 스테이트
      const [Token, setToken] = useState(null);
  // 더 보기 모달 상태관리 스테이트
      const [addModal, setAddModal] = useState(false);
  
  // 컴포넌트가 마운트될 때 토큰 가져오기
      useEffect(() => {
          const storedToken = localStorage.getItem('token');
          if (storedToken && storedToken !== 'null') {
              setToken(storedToken);
          }
      }, []);

  // 로그아웃 버튼 함수
      const handleChangeLogout = () => {
          localStorage.removeItem('token');
          setToken(null);
      }
  const [scrollMenu, setScrollMenu] = useState("hidden");

  

  return (
    <>
      <div className={`${menu} sm:text-[10px]`}>
        {/* 상단 텍스트 중앙 정렬 */}
        <div className={`${m_menu} flex h-[15%] font-lilita text-[25px] 2xl:text-[3vh] xl:text-[28px] items-center justify-center`}>
          <div className={"flex items-center justify-center h-[100%]"}>BucketMate</div>
        </div>

        {/* 중간 영역 */}
        <div className={`flex justify-evenly sm:block h-[full] sm:h-[75%] font-sans font-bold ${text_size}`}>
          <Link to="/home"><div className={`${text} ${hover}`}><img className={`${img_size}`} src={`images/홈${img_src[1]}.png`} alt="홈"></img><p className={`${activeMenu} sm:ml-1`} name="홈">홈</p></div></Link>
          <Link to="/community"><div className={`${text} ${hover}`}><img className={`${img_size}`} src={`images/커뮤니티${img_src[2]}.png`} alt="커뮤니티"></img><p className={`${activeMenu} sm:ml-1`} name="커뮤니티">커뮤니티</p></div></Link>
          <Link to="/home"><div className={`${text} ${hover}`}><img className={`${img_size}`} src='/images/위치2.png' alt="장소추천"></img><p className={`${activeMenu} sm:ml-1`} name="장소추천">장소추천</p></div></Link>
          <Link to="/profile"><div className={`${text} ${hover}`}><img className={`${img_size}`} src={`/images/프로필${img_src[4]}.png`} alt="프로필"></img><p className={`${activeMenu} sm:ml-1`} name="프로필">프로필</p></div></Link>
          <Link to="/home"><div className={`${text} ${hover}`}><img className={`${img_size}`} src='/images/더하기2.png' alt="더하기"></img><p className={`${activeMenu} sm:ml-1`} name="더하기">만들기</p></div></Link>
        </div>
        
        {/* 더보기 모달 */}
        <div className={`${addModal && Token !== null ? "flex" : "hidden"} flex-col w-full h-[120px] cursor-pointer ${text_size}`}>
        <div className={`${text} ${hover} h-full`}><img className={img_size} src='/images/정보수정.png' alt="정보수정"></img><p className={`${activeMenu} sm:ml-1  font-sans font-bold`}>정보수정</p>
        </div>
        <div onClick={handleChangeLogout} className={`${text} ${hover} h-full`}><img className={img_size} src='/images/로그아웃.png' alt="로그아웃"></img><Link to="/login">
        <p className={`${activeMenu} sm:ml-1  font-sans font-bold`}>로그아웃</p></Link>
          </div>
          <Link to="/home"><div className={text}><img className={`${img_size}`} src={`images/홈${img_src[1]}.png`} alt="홈"></img><p className={`${activeMenu} sm:ml-1`} name="홈">홈</p></div></Link>
          <Link to="/community"><div className={text}><img className={`${img_size}`} src={`images/커뮤니티${img_src[2]}.png`} alt="커뮤니티"></img><p className={`${activeMenu} sm:ml-1`} name="커뮤니티">커뮤니티</p></div></Link>
          <Link to="/home"><div className={text}><img className={`${img_size}`} src='/images/위치2.png' alt="장소추천"></img><p className={`${activeMenu} sm:ml-1`} name="장소추천">장소추천</p></div></Link>
          <Link to="/profile"><div className={text}><img className={`${img_size}`} src={`/images/프로필${img_src[4]}.png`} alt="프로필"></img><p className={`${activeMenu} sm:ml-1`} name="프로필">프로필</p></div></Link>
        
            <div
              className={`${text} relative`} // 부모 요소에 relative 추가
              onMouseOver={() => setScrollMenu("block")}
              onMouseLeave={() => setScrollMenu("hidden")}
            >
              <img
                className={`${img_size}`}
                src={`/images/더하기${img_src[5]}.png`}
                alt="더하기"
              />
              <p className={`${activeMenu} sm:ml-1`} name="더하기">
                만들기
              </p>
              {/* 드롭다운 메뉴 */}
              <div
                className={`${scrollMenu} absolute top-full left-1/2 transform -translate-x-1/2 bg-white border rounded shadow-lg`}
              >
                <ul className="p-1">
                  <li className="hover:bg-gray-200 p-1">
                    <Link to="/createList">리스트</Link>
                  </li>
                  <li className="hover:bg-gray-200 p-1">
                    <Link to="/createPost">게시글</Link>
                  </li>
                </ul>
              </div>
            </div>
        </div>

        {/* 하단 영역 */}
        <div onClick={()=> {if(Token === null){alert("로그인 후 이용해주세요.")} return(setAddModal(prev => !prev))}} className={`${m_menu} h-[10%] flex items-center justify-center font-sans font-bold cursor-pointer ${text_size}`}>
          <div className={`${text} ${hover} h-full`}><img className={img_size} src='/images/메뉴2.png' alt="더 보기"></img><p className={`${activeMenu} sm:ml-1`}>더 보기</p>
          </div>
        </div>
      </div>
    </>
  );
}
