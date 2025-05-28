//client/src/componant/community/chatting.js

export default function Chatting(props) {
    // 전달받은 flexCenter 값
        const {flexCenter} = props;
    // 전달 받은 commmunityUserInfo,selectedTab, communityTab 값
        const {chattingList, selectedTab, communityTab} = props;

    // 전달받은 selectedList 스테이트
        const {selectedList} = props;
    
    // 전달받은 handleChangeList 값
        const {handleChangeList} = props;

    return (
        <>
            {/* 대화가 존재하지 않을 시 */}
            {chattingList.length === 0 && selectedTab === communityTab[1] ? (
                <div className={`${flexCenter} text-black text-opacity-50 w-full h-full`}>대화가존재하지 않습니다. 대화를 시작해주세요</div>
            ) : ""}

            {/* 대화목록 반복문 */}
            {chattingList.map((info) => {
                const isSelectedList = selectedList === info.id;
                const isSelectedTab = selectedTab === communityTab[1];
                return (
                    <div key={info.id} onClick={() => { handleChangeList(info.id) }} className={`w-[90%] h-[110px] ${isSelectedList ? "bg-gray-200" : "bg-white"} ${isSelectedTab ? "block" : "hidden"} rounded-lg border border-solid border-gray-300 mb-2`}>

                        {/* 카테고리와 참여인원 */}
                        <div className={`flex items-center justify-between px-3 h-[40px] w-full font-sans`}>
                            <div className={`${flexCenter} h-[30px] w-auto text-[0.9rem] font-bold`}>나만의 케이크 만들기<span className={`bg-yellow-100 w-auto px-3 m-1 rounded-2xl`}>요리</span></div><div className={`text-black text-opacity-50`}>2/5</div>
                        </div>

                        {/* 프로필과 닉네임 대화내용 */}
                        <div className={`flex  w-[full] h-[calc(100%_-_40px)]`}>

                            {/* 프로필 이미지 */}
                            <div className={`${flexCenter} h-full w-[80px] `}>
                                <img src={`/images/미니프로필.png`} alt='미니프로필' className={` w-[60px] h-[60px]`}></img>
                            </div>

                            {/* 닉네임/대화내용 */}
                            <div className={`w-[calc(100%_-_160px)] h-full`}>
                                <div className={`font-sans font-bold m-1`}>{info.name}</div>
                                <div className={`ml-1`}>감사합니다.</div>
                            </div>

                            {/* 대화 시간 */}
                            <div className={`flex flex-col justify-between items-end w-[80px] h-full font-sans text-[0.8rem] pb-2 pr-2`}>
                                <div className={`${flexCenter} w-auto min-w-[15px] h-[15px] rounded-full bg-red-500 border-4 border-solid border-red-500 text-white mt-1`}>1</div>
                                <div>오후 1:20</div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}