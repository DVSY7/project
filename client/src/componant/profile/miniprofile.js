export default function Miniprofile() {
    // 플렉스 요소 센터 정렬
    const flexCenter = "justify-center items-center";
    return (
        <>
            <div className={`flex flex-col bg-yellow-100 w-[80%] h-full`}>
                <div className={`flex w-full h-[80%] bg-yellow-200`}>
                    {/* 프로필/달성률 */}
                    <div className={`flex flex-col ${flexCenter} h-full w-[30%] bg-yellow-400`}>
                        <img src="/images/미니프로필.png" className={`w-[4.5rem] h-[4.5rem]`}></img>
                        <div className={`flex ${flexCenter}h-6 w-16 mt-6 bg-red-200 text-[0.9rem]`}>달성률</div>
                    </div>
                    {/* 닉네임/별점/퍼센트 */}
                    <div className={`flex flex-col justify-center h-full w-[70%] bg-yellow-500`}>
                        <div className={`text-[1.5rem] font-sans font-bold`}>윤크리스탈0321</div>
                        <div className={`text-[1.5rem] font-sans font-bold text-yellow-400`}>★★★★★</div>
                        <div className={`w-32 h-4 bg-gray-300 rounded-lg`}>
                            <div className={`w-[50%] h-full rounded-lg bg-green-500`}></div>
                        </div>
                    </div>
                </div>
                {/* 리스트/게시글/찜 */}
                <div className={`w-full h-[20%] bg-yellow-300`}>3</div>
            </div>

        </>
    )
}