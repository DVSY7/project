import '../App.css';
import Menu from './menu';

export default function Community() {
  // 플렉스 요소 가로세로 센터
  const flexCenter = "flex justify-center items-center";
  // 플렉스 요소 세로 센터
  const flexColCenter = "flex justify-start items-center";
  // 레이아웃 그림자
  const shadow = "shadow-xl border border-solid border-t-gray-200";
  // 커뮤니티 탭 요소
  const communityTab = [
    "친구",
    "채팅",
    "차단",
  ]
  // 커뮤니티 목록 정보
  const communityUserInpo = [
    {name: "KimRaChel"},
    {name: "Kimsangyeol"},
  ]

  return (
    <>
      {/*가장 바깥영역 화면의 최대로 설정*/}
      <div className="grid grid-cols-1 grid-rows-9 sm:grid-rows-1 sm:grid-cols-sm-minmax sm:grid-cols-9 h-screen">
        {/* 왼쪽: 가로 1 비율 (1/9) */}
        <Menu current_src={2} />
        {/* 오른쪽: 가로 8 비율 (8/9) */}
        <div className=" flex flex-nowrap row-span-9 sm:col-span-8 ">



          {/* 커뮤니티 레이아웃 영역 */}
          <div className={` ${flexCenter} w-[30%] min-w-[350px] h-full`}>
            {/* 커뮤니티 요소 영역 */}
            <div className={`${shadow} rounded-3xl w-[87%] h-[93%] bg-red-100`}>
              {/* 커뮤니티 탭 영역 */}
              <div className={`flex justify-end flex-col w-full h-[100px] bg-red-200`}>
                <div className={`${flexColCenter} h-[55px] ml-4 w-full font-sans`}><span className={`font-hygothic font-bold`}>전체</span><span>(40)</span> <span className={`text-[0.5rem] mx-1`}>▼</span></div>
                <div className={`flex items-center w-full h-[45px] border-b border-solid border-gray-200 px-1`}>
                  {communityTab.map((item) => {
                    return (
                      <div className={`${flexCenter} border border-solid border-gray-300 h-[30px] w-[60px] rounded-md ml-3 text-[0.9rem]`}>{item}</div>
                    )
                  })}
                  <div className={`ml-auto mr-2`}><img src={`/images/검색.png`} className={`w-6 h-6 opacity-50`}></img></div>
                </div>
              </div>

              {/*목록영역 */}
              <div className="flex flex-col justify-start items-center h-[calc(100%-100px)] w-full pt-8 rounded-b-3xl overflow-x-hidden overflow-y-auto">
                  {communityUserInpo.map((inpo) => (
                    <div className={`w-[90%] h-[110px] bg-white rounded-lg border border-solid border-gray-300 mb-2`}></div>
                  ))}
                  
              </div>
            </div>
          </div>



          {/* 채팅창 영역 */}
          <div className={`${flexColCenter} w-[70%] h-full`}>
            <div className={`${shadow} rounded-3xl w-[97%] h-[93%]`}></div>
          </div>



        </div>
      </div>
    </>
  );
}