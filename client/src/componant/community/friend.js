export default function Friend(props) {
    // 친구목록 탭을 관리하기 위해 전달받은 값
    const { selectedTab, communityTab, friendList, flexCenter } = props;

    return (
        <>
            {/* 가져온 정보가 하나도 없을 시 */}
            {friendList.length === 0 && selectedTab === communityTab[0] ? (
                <div className={`${flexCenter} text-black text-opacity-50 w-full h-full`}>등록된 친구가 없습니다. 친구를 추가하세요!</div>) :
                ("")}

            {/* 가져온 정보가 있다면 */}
            {/* 친구목록 반복문 */}
            {friendList.map((friend, i) => {
                const isSelectedTab = selectedTab === communityTab[0]
                return (
                    <div key={i} className={`${isSelectedTab ? "block" : "hidden"} flex w-[90%] h-[90px] rounded-lg border border-solid border-gray-300 mb-2 cursor-pointer hover:bg-gray-100 `} >
                        {/* 프로필 사진 영역 */}
                        <div className={`${flexCenter} w-[80px] h-full`}>
                            {/* 프로필 사진 요소 */}
                            <img src="/images/미니프로필.png" alt='미니프로필' className={`w-[60px] h-[60px]`}></img>
                        </div>
                        {/* 닉네임/별점 영역 */}
                        <div className={`flex flex-col w-[calc(100%_-_140px)] h-full`}>
                            {/* 닉네임 요소 */}
                            <div className={`mt-3 font-sans font-bold`}>{friend.name}</div>
                            {/* 별점 요소 */}
                            <div className={`mt-3`}><span className={`text-yellow-400`}>★ ★ ★ ★ ★</span><span className={`ml-2 font-sans text-[0.7rem]`}>4.82</span></div>
                        </div>
                        {/* 차단버튼 영역 */}
                        <div className={`w-[60px] h-full`}>
                            {/* 차단버튼 요소 */}
                            <div className={`${flexCenter} w-[50px] h-[24px] mt-2 border border-solid border-gray-300 rounded-md font-sans text-[0.7rem]`}>차단</div>
                        </div>
                    </div>
                )
            })}


        </>
    )
}