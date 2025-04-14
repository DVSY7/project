import '../App.css';
import { Link } from "react-router-dom";

export default function Menu(props) {

  // 메뉴부분 레이아웃css
  const menu = "flex flex-col row-span-1 row-start-10 sm:row-start-1 min-w-[150px] sm:right-line-after";
  // 메뉴 이미지
  const img_size = "w-10 sm:w-[4vh] pr-2";
  // 메뉴 텍스트
  const text = 'sm:flex p-4 px-10 items-center justify-start w-full relative z-10';
  // 메뉴 텍스트 크기
  const text_size = "sm:text-[3vh] md:text-[2vh] lg:text-[1em] xl:text-[1em] 2xl:text-[1.7vh]";
  // 모바일버전 사라지는 요소
  const m_menu = 'hidden sm:block';

  const {current_src} = props;

  const img_src = Object.fromEntries(
    [1, 2, 3, 4, 5].map(n => [n, n === current_src ? 1 : 2])
  );
  

  return (
    <>
      <div className={`${menu} sm:text-[10px]`}>
        {/* 상단 텍스트 중앙 정렬 */}
        <div className={`${m_menu} flex h-[15%] font-lilita text-[25px] 2xl:text-[3vh] xl:text-[28px] items-center justify-center`}>
          <div className={"flex items-center justify-center h-[100%]"}>BucketMate</div>
        </div>

        {/* 중간 영역 */}
        <div className={`flex sm:block h-[full] sm:h-[75%] font-sans font-bold ${text_size}`}>
          <Link to="/home"><div className={text}><img className={img_size} src={`images/홈${img_src[1]}.png`} alt="홈"></img><p className={`${m_menu} sm:ml-1`} name="홈">홈</p></div></Link>
          <Link to="/community"><div className={text}><img className={img_size} src={`images/커뮤니티${img_src[2]}.png`} alt="커뮤니티"></img><p className={`${m_menu} sm:ml-1`} name="커뮤니티">커뮤니티</p></div></Link>
          <div className={text}><img className={img_size} src='/images/위치2.png' alt="장소추천"></img><p className={`${m_menu} sm:ml-1`} name="장소추천">장소추천</p></div>
          <Link to="/profile"><div className={text}><img className={img_size} src={`/images/프로필${img_src[4]}.png`} alt="프로필"></img><p className={`${m_menu} sm:ml-1`} name="프로필">프로필</p></div></Link>
          <div className={text}><img className={img_size} src='/images/더하기2.png' alt="더하기"></img><p className={`${m_menu} sm:ml-1`} name="더하기">만들기</p></div>
        </div>

        {/* 하단 영역 */}
        <div className={`${m_menu} h-[10%] flex items-center justify-center font-sans font-bold ${text_size}`}>
          <div className={`${text} h-full`}><img className={img_size} src='/images/메뉴2.png' alt="더 보기"></img><p className={`${m_menu} sm:ml-1`}>더 보기</p></div>
        </div>
      </div>
    </>
  );
}
