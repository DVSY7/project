export default function Miniprofile() {
    // 플렉스 요소 센터 정렬
    const flexCenter = "justify-center items-center";
    return (
        <>
            <div className={`flex flex-col w-[80%] h-full`}>
                <div className={`flex w-full h-[80%]`}>
                    {/* 프로필/달성률 */}
                    <div className={`flex flex-col ${flexCenter} h-full w-[30%]`}>
                        <img src="/images/미니프로필.png" alt="미니프로필" className={`w-[4.5rem] h-[4.5rem]`}></img>
                        <div className={`flex ${flexCenter}h-6 w-16 mt-6 bg-red-200 text-[0.9rem]`}>달성률</div>
                    </div>
                    {/* 닉네임/별점/퍼센트 */}
                    <div className={`flex flex-col justify-evenly h-full w-[70%]`}>
                        <div className={`text-[1.5rem] font-sans font-bold`}>윤크리스탈0321</div>
                        <div className={`text-[1.5rem] font-sans font-bold text-yellow-400`}><span className={`mb-2 inline-block`}>★★★★★</span><span className={`ml-4 text-black font-sans font-normal text-[1rem]`}>4.99</span></div>
                        <div className={`flex justify-start items-center`}>
                        <div className={`flex justify-between items-center w-32 h-4 bg-gray-300 rounded-lg`}>
                            <div className={`w-[100%] h-full rounded-lg bg-green-500`}></div>
                        </div>
                        <div className={`flex  font-sans font-bold ml-2`}>50%</div>
                        </div>
                    </div>
                </div>
                {/* 리스트/게시글/찜 */}
                <div className={`flex justify-start items-center font-sans w-full h-[20%]`}>
                    <div className={`ml-9`}>리스트<span className={`mx-4`}>14</span>|</div>
                    <div className={`ml-4`}>게시글<span className={`mx-4`}>9</span>|</div>
                    <div className={`ml-4`}>찜<span className={`2xl:m-4 `}>32</span></div>
                </div>
            </div>

        </>
    )
}