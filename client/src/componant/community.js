import '../App.css';
import Menu from './menu';

export default function Community() {
  // 플렉스 요소 가로세로 센터
  const flexCenter = "flex justify-center items-center";
  // 플렉스 요소 세로 센터
  const flexColCenter = "flex justify-start items-center";
  // 레이아웃 그림자
  const shadow = "shadow-xl border border-solid border-t-gray-200";
  
  return (
    <>
      {/*가장 바깥영역 화면의 최대로 설정*/}
      <div className="grid grid-cols-1 grid-rows-9 sm:grid-rows-1 sm:grid-cols-sm-minmax sm:grid-cols-9 h-screen">
        {/* 왼쪽: 가로 1 비율 (1/9) */}
        <Menu current_src ={2}/>
        {/* 오른쪽: 가로 8 비율 (8/9) */}
        <div className=" flex flex-nowrap row-span-9 sm:col-span-8 ">
          <div className={` ${flexCenter} w-[30%] min-w-[350px] h-full`}>
            <div className={`${shadow} rounded-3xl w-[87%] h-[93%]`}></div>
          </div>
          <div className={`${flexColCenter} w-[70%] h-full `}>
            <div className={`${shadow} rounded-3xl w-[97%] h-[93%]`}></div>
          </div>
        </div>
      </div>
    </>
  );
}