import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

export default function Login(props) {


  // 들어온 경로
  const { href } = props;
  // console.log(href);


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
  const setForm = `flex flex-col gap-3 justify-center items-center relative h-full sm:w-[450px] w-full sm:float-end text-white`;


  // sexButton 설정
  const [sexButton, setSexButton] = useState("");


  // 회원가입 폼 제출 데이터 상태관리 스테이트
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [email, setEmail] = useState("");
  const [local, setLocal] = useState("");
  const [selectedInterests, setSelectedInterestsList] = useState([]);


  // 회원가입 성공 시 폼 초기화 함수
  const resetForm = () => {
    setUserName("");
    setPassword("");
    setPasswordCheck("");
    setName("");
    setSex("");
    setSexButton("");
    setYear(null);
    setMonth(null);
    setDay(null);
    setEmail("");
    setLocal("");
    setSelectedInterestsList([]);
    setInterestsModal(false)
  }

  // 로그인 폼 제출 상태관리 스테이트
  const [inputUserName, setInputUserName] = useState("");
  const [inputPassWord, setInputPassWord] = useState("");

  // 로그인 폼 제출 정보 디버그 코드
  useEffect(() => {
    console.log(inputUserName);
    console.log(inputPassWord);
  }, [inputUserName, inputPassWord]);

  // 로그인 폼 제출 함수
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const inputData = {
      inputUserName,
      inputPassWord,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', inputData);

      // 서버에서 발급한 토큰 저장
      const token = response.data.token;
      localStorage.setItem('token', token);
      // 로그인 성공 처리
      alert("로그인 성공!");
      // 홈 화면으로 리디렉션
      window.location.href = '/home';
      // 로그인 정보 디버그 코드
      console.log(response.data);

    } catch (error) {
      if (error.response) {
        console.log(`로그인 실패 : ${alert(error.response.data.message)}`);
      } else {
        console.log(`서버에 연결할 수 없습니다.`);
      }
      console.error(`에러발생: ${error}`);
    }

  }
  
  // // 회원정보 디버그 코드
  // useEffect(()=>{
  //   console.log(username)
  //   console.log(password)
  //   console.log(passwordCheck)
  //   console.log(name)
  //   console.log(sex)
  //   console.log(email)
  //   console.log(local)
  //   console.log(selectedInterests)
  // },[username,password,passwordCheck,name,sex,email,local,selectedInterests])


  // 회원가입 클릭 이벤트
  const [signinHidden, setSigninHidden] = useState(href === "login" ? "flex" : "hidden");
  const [signupHidden, setSignupHidden] = useState(href === "signup" ? "flex" : "hidden");
  const addSignup = () => {
    setSigninHidden("hidden");
    setSignupHidden("flex");
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
  // 회원가입 폼 제출함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {

      // // 정석
      // username : username,
      // password : password,
      // passwordCheck : passwordCheck,
      // name : name,
      // sex : sex,
      // email : email,
      // local : local,
      // interests : selectedInterests,

      // key와 value가 같을 때는 축약형도 가능
      username,
      password,
      name,
      sex,
      birth: `${year.toString()}${month === "" ? "" : month.toString().padStart(2, "0")}${day === "" ? "" : day.toString().padStart(2, "0")}`,
      email,
      local,
      interests: selectedInterests,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/users/signup", userData);
      alert("회원가입 성공!");
      console.log(response.data);

      // 회원가입 후 로그인 폼으로 이동
      addSignin();
      // 회원가입 후 폼 초기화
      resetForm();

    } catch (error) {
      if (error.response) {
        alert(`회원가입 실패 : ${error.response.data.message}`);
      } else {
        alert("서버에 연결할 수 없습니다.");
      }
      console.error("에러발생: ", error);
    }
  }

  // 생년월일 생성 함수
  const yearOptions = Array.from({ length: 2025 - 1900 + 1 }, (_, i) => {
    const year = 1900 + i;
    return { value: year, label: year.toString() };
  })
  const monthOptions = [...Array(12)].map((_, i) => {
    const month = i + 1;
    return { value: month, label: month.toString() };
  })
  const dayOptions = [...Array(31)].map((_, i) => {
    const day = i + 1;
    return { value: day, label: day.toString() };
  })


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
        <div className={"flex justify-center items-center relative bg-black bg-opacity-40 min-h-screen sm:w-screen w-screen text-white"}>

          {/* 로그인폼 */}
          <form className={`${signinHidden} ${setForm}`}>
            {/* 제목 */}
            <h1 className="text-3xl font-normal m-4 "><Link to="/home">BucketMate</Link></h1>
            {/* 아이디 입력란 */}
            <input
              onChange={(e) => { setInputUserName(e.target.value) }}
              type="text"
              placeholder="아이디"
              className={`${input_element}`}
            ></input>
            {/* 비밀번호 입력란 */}
            <input
              onChange={(e) => { setInputPassWord(e.target.value) }}
              type="password"
              placeholder="비밀번호 "
              className={`${input_element}`}
            ></input>

            {/* 로그인 버튼 */}
            <button
              onClick={handleSubmitLogin}
              className={`${button_element} ${mt} bg-blue-500 text-white w-60`}>
              로그인
            </button>
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


          {/* 회원가입폼 */}
          <form className={`${signupHidden} ${setForm}`}>
            {/* 제목 */}
            <h1 className="text-3xl font-normal m-4 "><Link to="/home">BucketMate</Link></h1>
            {/* 구분선 */}
            <div className={`flex items-center w-60 gap-2 text-[0.75rem] ${mt}`}>
              <div className="flex-1 h-px bg-white"></div>
              <span className={`whitespace-nowrap ${text_opacity} text-[1rem] font-bold`}>계정</span>
              <div className="flex-1 h-px bg-white"></div>
            </div>
            {/* 아이디 */}
            <input type="text" placeholder="아이디" value={username} onChange={(e) => { setUserName(e.target.value) }} className={`${input_element}`}></input>
            {/* <div className={`text-left w-60 text-red-500 ${text_size}`}>아이디가 중복되었습니다.</div> */}
            {/* 비밀번호 */}
            <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} className={`${input_element}`}></input>
            <input type="password" placeholder="비밀번호 재확인" value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} className={`${input_element}`}></input>
            {/* <div className={`text-left w-60 text-green-500 ${text_size}`}>비밀번호가 일치합니다.</div> */}
            {/* 구분선 */}
            <div className={`flex items-center w-60 gap-2 text-[0.75rem] ${mt}`}>
              <div className="flex-1 h-px bg-white"></div>
              <span className={`whitespace-nowrap ${text_opacity} text-[1rem] font-bold`}>회원정보</span>
              <div className="flex-1 h-px bg-white"></div>
            </div>
            {/* 회원정보 */}
            {/* 이름 */}
            <input type="text" placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} className={`${input_element}`}></input>
            {/* 성별 */}
            <div className={`flex w-60 h-8 rounded-sm`}>
              <button value={sex} onClick={(e) => { handleChangeSexButton(e, "male"); setSex("male") }} className={`${sexButton} ${sexButton === "male" ? "bg-gray-300" : "bg-white"} block w-32 text-black border-black border-r text-[0.75rem]`}>남자</button>
              <button value={sex} onClick={(e) => { handleChangeSexButton(e, "female"); setSex("female") }} className={`${sexButton} ${sexButton === "female" ? "bg-gray-300" : "bg-white"} block w-32 text-black text-[0.75rem]`}>여자</button>
            </div>

            {/* 생년월일 */}
            <div className="flex justify-between w-60">
              {/* <input type="text" placeholder="생년월일" value={birth} onChange={(e) => setBirth(e.target.value)} className={`w-[7rem] font-sans text-black ${input_element}`}></input> */}

              {/* 출생년도 */}
              <Select
                onChange={(e) => { setYear(e.value) }}
                options={yearOptions}
                placeholder='년'
                value={yearOptions.find(option => option.value === year) || null}
                className={`text-black font-sans`}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    height: "20px",
                  }),
                  menuList: (provided) => ({
                    ...provided,
                    maxHeight: "200px",
                    overflowY: "auto",   // 여기서만 스크롤
                  })
                }}
              />
              {/* 출생 월 */}
              <Select
                onChange={(e) => { setMonth(e.value) }}
                options={monthOptions}
                placeholder={"월"}
                value={monthOptions.find(option => option.value === month) || null}
                className={`text-black font-sans`}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    height: "20px",
                  }),
                  menuList: (provided) => ({
                    ...provided,
                    maxHeight: "200px",
                    overflowY: "auto"
                  })
                }}
              />
              {/* 출생 일 */}
              <Select
                onChange={(e) => { setDay(e.value) }}
                options={dayOptions}
                placeholder={"일"}
                value={dayOptions.find(option => option.value === day) || null}
                className={`text-black font-sans`}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    height: "20px",
                  }),
                  menuList: (provided) => ({
                    ...provided,
                    maxHeight: "200px",
                    overflowY: "auto",
                  })
                }}
              />

            </div>
            {/* 이메일 */}
            <input type="text" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} className={`${input_element} placeholder:font-sans`}></input>
            {/* 구분선 */}
            <div className={`flex items-center w-60 gap-2 text-[0.75rem] ${mt}`}>
              <div className="flex-1 h-px bg-white"></div>
              <span className={`whitespace-nowrap ${text_opacity} text-[1rem] font-bold`}>기타</span>
              <div className="flex-1 h-px bg-white"></div>
            </div>
            <select
              value={local}
              onChange={(e) => { setLocal(e.target.value) }}
              className={`text-black ${input_element} text-[0.88rem]`}>
              <option
                value={""} disabled hidden

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
                    onClick={() => { if (!interestsModal) { handleChangeInterestModal() } handleChangeInterestList(item) }}
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
            {/* 가입하기기 버튼 */}
            <button onClick={handleSubmit} className={`${button_element} ${mt} bg-blue-500 text-white w-60`}>가입하기</button>
            {/* 구분선 */}
            {/* 로그인으로 돌아가기 */}
            <div onClick={addSignin} className={`h-[20px] cursor-pointer ${text_size} ${text_opacity} ${hover} mt-12`}>계정이 있으신가요 ? <span className={"text-white text-opacity-100"}>로그인</span></div>
          </form>
        </div>
      </div>
    </>
  );
}
