import Contents from './content/contents';
import Menu from './menu';
import { useEffect, useState } from "react";
import { checkedToken } from './function/checkedToken';
import { fetchUserID } from './function/fetchUserID';

export default function Home(props) {
  
  const {setUserID2} = props;

  // 유저이름
  const [username, setUsername] = useState("");
  // 유저 닉네임
  const [name, setName] = useState("");
  // 유저 ID 
  const [userID, setUserID] = useState([{id:0}]);
  // 공지사항 닫기 상태
  const [visible, setVisible] = useState(false);

  // 로그인 성공 시 토큰 검증
  useEffect(()=>{
    const getUsername = async ()=>{
      await checkedToken(setUsername,setName);
    }
    getUsername();
  },[])
  useEffect(()=>{
    const getUserID = async()=>{
      if(name){
        const id = await fetchUserID(name);
        setUserID(id);
        setUserID2(id);
      }
    };
    getUserID();
  },[name])

  // 오늘 하루 보지 않기 로직
  useEffect(()=>{
    const hideDate = localStorage.getItem("noticeHideDate");
    const today = new Date().toLocaleDateString();

    if(hideDate !== today){
      setVisible(true);
    }
  },[])

  // 오늘 하루 보지 않기 상태 변경 시 로직
  const handleClose = (checked) => {
    if(checked){
      const today = new Date().toLocaleDateString();
      localStorage.setItem("noticeHideDate", today);
    }
    setVisible(false);
  }

  // 오늘 하루 보지 않기 체크박스 컴포넌트
  const NoticeHideCheck = () => {
    return (
      <>
        <label className={`notice-hide-check`}>
          <input
            type={"checkbox"}
            className={`mr-1`}
            onChange={(e)=>{setTimeout(()=>{handleClose(e.target.checked)}, 100);}}
          />
          하루동안 보지 않기 
        </label>
      </>
    )
  }

  // 공지사항 컴포넌트
  const Notice = () => {
    if(!visible) return null;
    return (
      <>
          <div className={`notice-box`}>
            {/* 오늘 하루 보지 않기 버튼 */}
            <NoticeHideCheck/>
            {/* 공지사항 헤더 */}
            <div className={`notice-header`}>
              <div className={`notice-header-title`}>공지사항</div>
              <img 
                className={`notice-header-xbtn`} 
                src={`images/x.png`}
                onClick={()=>{handleClose();}} >
              </img>
            </div>
            {/* 공지사항 내용 */}
            <div className={`notice-content`}>
              <div className={`notice-content-item1`}>
                <img className={`h-20 w-20 mr-2`}src={`images/notice.png`}></img>
                <div>
                  <div>해당 웹사이트는</div>
                  <div>현재 <span className={`text-blue-500`}>데모버전</span> 입니다.</div>
                </div>
              </div>
              <div className={`notice-content-item2`}>
                <img 
                  className={`h-52 w-52`}
                  src={`images/update.png`}
                ></img>
              </div>
              <div className={`notice-content-item3`}>서비스 개선을 위해 지속적으로 업데이트를 <br></br>진행하고 있습니다.</div>
            </div>
            {/* 공지사항 풋터 */}
            <div className={`notice-footer`}>
              <div>ㆍ업데이트 주기 : 매주 월요일 오전 6시 ~ 10시</div>
              <div>ㆍ피드백 : gbytkdduf1004@naver.com 제출</div>
            </div>
          </div>
      </>
    )
  }
 
  return (
    <>
      {/*가장 바깥영역 화면의 최대로 설정*/}
      <div className="grid grid-cols-1 grid-rows-9 sm:grid-rows-1 sm:grid-cols-9 h-screen overflow-x-hidden">
        {/* 왼쪽: 가로 1 비율 (1/9) */}
        <Menu current_src={1} />
        {/* 오른쪽: 가로 8 비율 (8/9) */}
        <div className=" flex flex-col flex-wrap row-span-9 sm:col-span-8 2xl:pl-4 xl:pl-6 lg:pl-8 md:pl-12 sm:pl-16">
          <Contents
            src="home"
            username={`${username}`}
            name = {name}
            userID = {userID}
            />
          {/* 공지사항 */}
          <Notice />
        </div>
      </div>
    </>
  );
}
