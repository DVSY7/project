import { Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  // 작은 글씨 사이즈
  const text_size = 'text-[0.75rem]';
  // 글자 투명도
  const text_opacity = 'text-white text-opacity-70';
  // 플렉스 요소 중앙정렬
  const flex_center = `flex justify-center items-center`;
  // 인풋요소 클레스
  const input_element = `pl-2 h-8 text-black rounded-sm text-[1rem] w-60 placeholder:text-[0.8rem]`;
  // 버튼요소 클레스
  const button_element =
    'w-48 h-8 rounded-md sm:w-[15rem] font-bold';
  // 로그인 / 간편로그인 간격
  const mt = 'mt-6';
  // 회원가입 / 비밀번호 찾기 호버
  const hover = 'hover:text-opacity-100 hover:text-[0.85rem]';
  // form 레이아웃 설정
  const setForm = `flex flex-col gap-2 justify-center items-center relative h-full sm:w-[450px] w-full sm:float-end text-white`;
  // sexButton 설정
  const [sexButton, setSexButton] = useState("");
  // 회원가입 클릭 이벤트
  const [signinHidden, setSigninHidden] = useState("flex");
  const [signupHidden, setSignupHidden] = useState("hidden");
  const addSignup = () => {
    setSigninHidden("hidden");
    setSignupHidden("flex");
    console.log(signinHidden);
  }
  const addSignin = () => {
    setSignupHidden("hidden");
    setSigninHidden("flex");
  }
  // sexButton 액션
  const handleChangeSexButton = (e, sex) => {
    e.preventDefault();
    if (sexButton !== sex) {
      setSexButton(sex);
    }
  }
  // 관심사, 지역 상태관리
  const [local, setLocal] = useState("");
  // 지역목록 
  const cities = [
    "서울특별시",
    "인천광역시",
    "대구광역시",
    "대전광역시",
    "부산광역시",
    "울산광역시",
    "광주광역시",
    "제주특별자치도"
  ]
  // 관심사목록
  const interests = [
    "여행 & 탐험",
    "취미 & 라이프스타일",
    "자기계발 & 교육",
    "문화 & 예술",
    "운동 & 건강",
    "요리 & 미식",
    "도전 & 어드벤처",
    "봉사 & 나눔",

  ]
  // 관심사 모달 토글관리
  const [interestsModal, setInterestsModal] = useState(false);
  // 관심사 목록 토글관리
  const [selectedInterests, setSelectedInterestsList] = useState([]);

  // 관심사 모달 토글함수
  const handleChangeInterestModal = () => {
    interestsModal ? setInterestsModal(false) : setInterestsModal(true);
  }
  // 관심사 목록 토글함수
  const handleChangeInterestList = (item) => {
    selectedInterests.includes(item) ?
      setSelectedInterestsList(selectedInterests.filter(i => i !== item)) :
      setSelectedInterestsList([...selectedInterests, item]);
  }


  return (
    <>
      <div className={'bg-gray-300 relative min-h-screen w-full overflow-y-scroll overflow-x-hidden'}>
        <video
          autoPlay
          muted
          loop
          className={'absolute top-0 left-0 w-full h-full object-cover z-0 '}
        >
          <source src="/videos/login.mp4" type="video/mp4"></source>
        </video>
        <div className={"flex justify-center items-center relative bg-black bg-opacity-40 min-h-screen sm:w-[450px] w-screen sm:float-end text-white"}>
          <form className={`${signinHidden} ${setForm}`}>
            {/* 제목 */}
            <h1 className="text-3xl font-normal m-4 "><Link to="/home">BucketMate</Link></h1>
            {/* 아이디 입력란 */}
            <input
              type="text"
              placeholder="아이디"
              className={`${input_element}`}
            ></input>
            {/* 비밀번호 입력란 */}
            <input
              type="password"
              placeholder="비밀번호 "
              className={`${input_element}`}
            ></input>

            {/* 로그인 버튼 */}
            <button className={`${button_element} ${mt} bg-gray-500 text-white w-60`}>로그인</button>
            {/* 구분선 */}
            <div className={`flex items-center w-60 gap-2 text-[0.75rem] ${mt}`}>
              <div className="flex-1 h-px bg-white"></div>
              <span className={`whitespace-nowrap ${text_opacity}`}>간편로그인</span>
              <div className="flex-1 h-px bg-white"></div>
            </div>
            {/* 카카오로그인 버튼 */}
            <button
              className={`${button_element} flex relative justify-center items-center bg-[#FFEB00] w-60 font-bold font-sans text-black `}
            >
              <img
                src="/images/카카오버튼.png"
                alt="카카오버튼"
                className={'h-full absolute sm:left-14 left-8'}
              ></img>
              Kakao
            </button>
            {/* 회원가입 */}
            <div onClick={addSignup} className={`h-[20px] cursor-pointer ${text_size} ${text_opacity} ${hover} mt-20`}>계정이 없으신가요 ? <span className={"text-white text-opacity-100"}>가입하기</span></div>
            {/* 비밀번호 찾기 */}
            <div className={`h-[20px] cursor-pointer ${text_size} ${text_opacity} ${hover}`}>비밀번호를 잊으셨나요 ?</div>
          </form>
          <form className={`${signupHidden} ${setForm}`}>
            {/* 제목 */}
            <h1 className="text-3xl font-normal m-4 "><Link to="/home">BucketMate</Link></h1>
            {/* 구분선 */}
            <div className={`flex items-center w-60 gap-2 text-[0.75rem]`}>
              <div className="flex-1 h-px bg-white"></div>
              <span className={`whitespace-nowrap ${text_opacity}`}>계정</span>
              <div className="flex-1 h-px bg-white"></div>
            </div>
            {/* 아이디 */}
            <input type="text" placeholder="아이디" className={`${input_element}`}></input>
            <div className={`text-left w-60 text-red-500 ${text_size}`}>아이디가 중복되었습니다.</div>
            {/* 비밀번호 */}
            <input type="password" placeholder="비밀번호" className={`${input_element}`}></input>
            <input type="password" placeholder="비밀번호 재확인" className={`${input_element}`}></input>
            <div className={`text-left w-60 text-green-500 ${text_size}`}>비밀번호가 일치합니다.</div>
            {/* 구분선 */}
            <div className={`flex items-center w-60 gap-2 text-[0.75rem]`}>
              <div className="flex-1 h-px bg-white"></div>
              <span className={`whitespace-nowrap ${text_opacity}`}>회원정보</span>
              <div className="flex-1 h-px bg-white"></div>
            </div>
            {/* 회원정보 */}
            {/* 이름 */}
            <input type="text" placeholder="이름" className={`${input_element}`}></input>
            {/* 성별 */}
            <div className={`flex w-60 h-8 rounded-sm`}>
              <button onClick={(e) => { handleChangeSexButton(e, "male") }} className={`${sexButton} ${sexButton === "male" ? "bg-gray-300" : "bg-white"} block w-32 text-black border-black border-r text-[0.75rem]`}>남자</button>
              <button onClick={(e) => { handleChangeSexButton(e, "female") }} className={`${sexButton} ${sexButton === "female" ? "bg-gray-300" : "bg-white"} block w-32 text-black text-[0.75rem]`}>여자</button>
            </div>
            {/* 주민번호 */}
            <div className="flex justify-between w-60">
              <input type="text" placeholder="주민번호 앞자리" className={`w-[7rem] font-sans text-black ${input_element}`}></input>
              <div className="flex items-center">-</div>
              <input type="text" placeholder="뒷 자리" className={`w-[7rem] font-sans text-black ${input_element}`}></input>
            </div>
            {/* 이메일 */}
            <input type="text" placeholder="이메일" className={`${input_element} placeholder:font-sans`}></input>
            {/* 구분선 */}
            <div className={`flex items-center w-60 gap-2 text-[0.75rem]`}>
              <div className="flex-1 h-px bg-white"></div>
              <span className={`whitespace-nowrap ${text_opacity}`}>기타</span>
              <div className="flex-1 h-px bg-white"></div>
            </div>
            <select
              value={local}
              onChange={(e) => { setLocal(e.target.value) }}
              className={`text-black ${input_element} text-[0.9rem]`}>
              <option
                value={""}disabled hidden
                
              >지역 선택</option>
              {cities.map((city) => (
                <option value={city} key={city}>{city}</option>
              ))}
            </select>
            {/* 관심사 선택박스 */}
            <div
              className={`pl-2 h-[${2 + (selectedInterests.length % 2 === 0 ? selectedInterests.length * 2 : selectedInterests.length * 2 - 2)}rem] max-h-[6rem]
                 text-black rounded-sm text-[1rem] w-60 placeholder:text-[0.8rem] bg-white flex flex-wrap items-center overflow-y-auto overflow-x-auto`}
            >
              <div
                onClick={handleChangeInterestModal}
                className={`${selectedInterests.length === 0 ? "block" : "hidden"} cursor-pointer pl-1 text-[0.9rem]`}>
                관심사 선택
              </div>

              {/* 선택된 관심사 */}
              {selectedInterests.map((item) => {
                return (
                  <div
                    key={item}
                    onClick={()=>{if(!interestsModal){handleChangeInterestModal()}handleChangeInterestList(item)}}
                    className={`${flex_center} ${selectedInterests.length === 0 ? "hidden" : "block"} relative h-6 font-sans text-[0.75rem] bg-gray-200 border-gray-200 border-[5px] cursor-pointer rounded-2xl m-1`}>
                    {item}
                    <img 
                    src="/images/엑스표시.png" 
                    alt="엑스표시" 
                    className={`w-4 h-4 m-1 opacity-20`}>
                    </img>
                  </div>
                )

              })}
            </div>
            {/* 관심사 선택모달 */}
            <div
              className={`${interestsModal ? "flex flex-wrap" : "hidden"} p-2 items-center bg-white text-black w-60 rounded-md absolute right-[22rem] transition-all`}
              style={{
                transform: `translateY(100px)`,
              }}
            >
              {/* 관심사 목록 */}
              {interests.filter(item => !selectedInterests.includes(item)).map((item) => {
                return (
                  <div
                    key={item}
                    onClick={() => { handleChangeInterestList(item) }}
                    className={`${flex_center} h-7 bg-gray-200 border-gray-200 rounded-2xl m-1 font-sans text-[0.70rem] border-[9px] cursor-pointer`}
                  >{item}</div>
                )
              })}
              <div className="flex justify-end items-center w-full h-7">
                <div
                  className={`mt-2 w-12 h-6 bg-blue-500 text-white rounded-md ${text_size} ${flex_center} cursor-pointer hover:border hover:text-black hover:bg-white hover:border-gray-400 hover:border-solid`}
                  onClick={() => {
                    console.log(selectedInterests)
                    handleChangeInterestModal();
                  }}
                >
                  확인
                </div>
              </div>
            </div>
            {/* 로그인 버튼 */}
            <button className={`${button_element} ${mt} bg-gray-500 text-white w-60`}>가입하기</button>
            {/* 구분선 */}
            {/* 로그인으로 돌아가기 */}
            <div onClick={addSignin} className={`h-[20px] cursor-pointer ${text_size} ${text_opacity} ${hover} mt-20`}>계정이 있으신가요 ? <span className={"text-white text-opacity-100"}>로그인</span></div>
          </form>
        </div>
      </div>
    </>
  );
}
