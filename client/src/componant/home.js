import '../App.css';
import Contents from './content/contents';
import Menu from './menu';
import { useEffect, useState } from "react";
import { checkedToken } from './fuction/checkedToken';

export default function Home() {

  // 유저이름
  const [username, setUsername] = useState("");

  // 로그인 성공 시 토큰 검증
  useEffect(()=>{
    const getUsername = async ()=>{
      await checkedToken(setUsername);
    }
    getUsername();
  },[])
 
  return (
    <>
      {/*가장 바깥영역 화면의 최대로 설정*/}
      <div className="grid grid-cols-1 grid-rows-9 sm:grid-rows-1 sm:grid-cols-sm-minmax sm:grid-cols-9 h-screen overflow-x-hidden">
        {/* 왼쪽: 가로 1 비율 (1/9) */}
        <Menu current_src={1} />
        {/* 오른쪽: 가로 8 비율 (8/9) */}
        <div className=" flex flex-col flex-wrap row-span-9 sm:col-span-8 ">
          <Contents
            src="home"
            username={`${username}`} />
        </div>
      </div>
    </>
  );
}
