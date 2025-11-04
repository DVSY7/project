import Menu from "./menu";

export default function MyInfo(){
    return (
        <>
            {/*가장 바깥영역 화면의 최대로 설정*/}
            <div className="grid grid-cols-1 grid-rows-9 sm:grid-rows-1 sm:grid-cols-sm-minmax h-screen overflow-x-hidden">
                {/* 왼쪽: 가로 1 비율 (1/9) */}
                <Menu/>
                {/* 오른쪽: 가로 8 비율 (8/9) */}
                <div className=" flex flex-col flex-wrap justify-center items-center bg-gray-50 row-span-9 sm:col-span-8 ">
                    <InfoUI/>
                </div>
            </div>
        </>
    )
}

export const InfoUI = () => {
    return (
        <>
            <div
                className={`flex gap-6 w-[60%] h-[80%]`}
            >
                <div className={`border-[2px] border-gray-200 caret-transparent relative flex flex-col justify-center items-center bg-white shadow-xl w-[25%] rounded-md`}>
                    <InfoItem1/>
                </div>    
                <div className={`flex flex-col bg-white border-[2px] border-gray-200 w-[75%] shadow-xl rounded-lg`}>
                    <InfoItem2/>
                </div>
            </div>
        </>
    )
}

export const InfoItem1 = () => {
    return (
        <>
            {/* 프로필 이미지 */}
            <img 
                src={`images/profile/profile (4).jpg`}
                className={`w-[80%] aspect-square mb-4 rounded-full`}
                >
            </img>
            {/* 닉네임 */}
            <div className={`text-[2.5vh] font-sans font-extrabold`}>뺀찌TV님</div>
            {/* 회원플랜 등급 */}
            <div className={`bg-gray-300 px-2 rounded-full my-2`}>basic</div>
            {/* 회원가입일 */}
            <div className={`text-[1.5vh] mt-2 mb-4 font-sans text-gray-500`}>가입일: 2023-01-01</div>
            <button className={`text-[1.2vh] absolute bottom-16 px-2 py-1 text-red-600`}>계정삭제</button>
        </>
    )
}

export const InfoItem2 = () => {
    return (
        <>
            <div className={`h-[10%] font-sans text-[1.5vh] flex flex-col justify-center items-center mt-10`}>
                <div className={`text-[3.5vh] font-lilita mb-4`}>User Information</div>
                <div>
                    <button className={`border-b-[3px] border-blue-500 text-gray-600 py-2 px-4 rounded-tl-md font-extrabold`}>정보수정</button>
                    <button className={`border-b-[3px] border-gray-300 text-gray-600 py-2 px-4 font-extrabold`}>활동 리포트</button>
                </div>
            </div>
            
            <div className={`h-[93%] flex flex-col justify-center items-center gap-10`}>
                
                {/* 닉네임 */}
                <div className={`w-[45%] flex justify-end`}>
                    <label className={`text-[2vh]`}>NickName:</label>
                    <input type="text" className="ml-4 border-b-[1px] border-black pl-2" value={`뺀찌TV`}></input>
                </div>
                {/* 생년월일 */}
                <div className={`w-[45%] flex justify-end`}>
                    <label className={`text-[2vh]`}>BirthDate:</label>
                    <input type="text" className={`ml-4 border-b-[1px] border-black pl-2`} value={`1998-07-24`}></input>
                </div>
                {/* 성별 */}
                <div className={`w-[45%] flex justify-end`}>
                    <label className={`text-[2vh]`}>Gender:</label>
                    <input type={`text`} className={`ml-4 border-b-[1px] border-black pl-2`} value={`남자`}></input>
                </div>
                {/* 거주지역 */}
                <div className={`w-[45%] flex justify-end`}>
                    <label className={`text-[2vh]`}>Location:</label>
                    <input type={`text`} className={`ml-4 border-b-[1px] border-black pl-2`} value={`광주 광역시`}></input>
                </div>
                {/* 관심사 */}
                <div className={`w-[45%] flex justify-end`}>
                    <label className={`text-[2vh]`}>Interests:</label>
                    <input type={`text`} className={`ml-4 border-b-[1px] border-black pl-2`} value={`없음`}></input>
                </div>
                {/* 수정하기 버튼 */}
                <div className={`caret-transparent mt-20 bg-blue-500 text-white p-2 px-4 rounded-full cursor-pointer`}>수정하기</div>
            </div>
        </>
    )
}