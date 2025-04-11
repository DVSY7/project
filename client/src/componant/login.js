import { Link } from "react-router-dom";
import {useState} from "react";

export default function Login() {
  // 작은 글씨 사이즈
  const text_size = 'text-[0.75rem]';
  // 글자 투명도
  const text_opacity = 'text-white text-opacity-70';
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
  const setForm = `flex flex-col gap-4 justify-center items-center relative h-screen sm:w-[450px] w-screen sm:float-end text-white`;
  // sexButton 설정정
  const [sexButton, setSexButton] = useState("");
  // 회원가입 클릭 이벤트
  const [signinHidden, setSigninHidden] = useState("flex");
  const [signupHidden, setSignupHidden] = useState("hidden");
  const addSignup = ()=>{
    setSigninHidden("hidden");
    setSignupHidden("flex");
    console.log(signinHidden);
  }
  const addSignin = ()=>{
    setSignupHidden("hidden");
    setSigninHidden("flex");
  }
  // sexButton 액션
  const handleChangeSexButton = (e,sex)=>{
    e.preventDefault();
    if(sexButton !== sex){
      setSexButton(sex);
    }
  }

  return (
    <>
      <div className={'bg-gray-300 relative overflow-hidden w-screen h-screen'}>
        <video
          autoPlay
          muted
          loop
          className={'absolute top-0 left-0 w-full h-full object-cover z-0 '}
        >
          <source src="/videos/login.mp4" type="video/mp4"></source>
        </video>
        <div className={"relative bg-black bg-opacity-40 h-screen sm:w-[450px] w-screen sm:float-end text-white"}>
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
            <button className={`${button_element} ${mt} bg-gray-500 text-white`}>로그인</button>
            {/* 구분선 */}
            <div className={`flex items-center w-60 gap-2 text-[0.75rem] ${mt}`}>
              <div className="flex-1 h-px bg-white"></div>
              <span className={`whitespace-nowrap ${text_opacity}`}>간편로그인</span>
              <div className="flex-1 h-px bg-white"></div>
            </div>
            {/* 카카오로그인 버튼 */}
            <button
              className={`${button_element} flex relative justify-center items-center bg-[#FFEB00] font-bold font-sans text-black `}
            >
              <img
                src="/images/카카오버튼.png"
                alt="카카오버튼"
                className={'h-full absolute left-14'}
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
            <div className={`flex items-center w-60 gap-2 text-[0.75rem] ${mt}`}>
              <div className="flex-1 h-px bg-white"></div>
              <span className={`whitespace-nowrap ${text_opacity}`}>계정</span>
              <div className="flex-1 h-px bg-white"></div>
            </div>
            {/* 아이디 */}
            <input type="text" placeholder="아이디" className={`${input_element}`}></input>
            <div className={"text-left w-60 text-red-500"}>아이디가 중복되었습니다.</div>
            {/* 비밀번호 */}
            <input type="password" placeholder="비밀번호" className={`${input_element}`}></input>
            <input type="password" placeholder="비밀번호 재확인" className={`${input_element}`}></input>
            <div className={"text-left w-60 text-green-500"}>비밀번호가 일치합니다.</div>
            {/* 구분선 */}
            <div className={`flex items-center w-60 gap-2 text-[0.75rem] ${mt}`}>
              <div className="flex-1 h-px bg-white"></div>
              <span className={`whitespace-nowrap ${text_opacity}`}>회원정보</span>
              <div className="flex-1 h-px bg-white"></div>
            </div>
            {/* 회원정보 */}
            {/* 이름 */}
            <input type="text" placeholder="이름" className={`${input_element}`}></input>
            {/* 성별 */}
            <div className={`flex w-60 h-8 rounded-sm`}>
              <button onClick={(e)=>{handleChangeSexButton(e,"male")}} className={`${sexButton} ${sexButton === "male" ? "bg-gray-400" : "bg-white"} block w-32 text-black border-black border-r`}>남자</button>
              <button onClick={(e)=>{handleChangeSexButton(e,"female")}} className={`${sexButton} ${sexButton === "female" ? "bg-gray-400" : "bg-white"} block w-32 text-black`}>여자</button>
            </div>
            {/* 주민번호 */}
            <div className="flex justify-between w-60">
              <input type="text" placeholder="주민번호 앞자리" className={`w-28 h-8 font-sans text-black ${input_element}`}></input>
              <div className="flex items-center">-</div>
              <input type="text" placeholder="뒷 자리" className={`w-28 h-8 font-sans text-black ${input_element}`}></input>
            </div>
            {/* 이메일 */}
            <input type="text" placeholder="e-mail" className={`${input_element} placeholder-font-sans`}></input>

            {/* 로그인으로 돌아가기 */}
            <div onClick={addSignin} className={`h-[20px] cursor-pointer ${text_size} ${text_opacity} ${hover} mt-32`}>계정이 있으신가요 ? <span className={"text-white text-opacity-100"}>로그인</span></div>
          </form>
        </div>
      </div>
    </>
  );
}
