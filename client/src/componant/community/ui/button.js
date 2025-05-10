//client/src/componant/community/ui/button.js

// 나가기 버튼 모달 컴포넌트
export function ClosedChatroombutton(props){

    const {checkedClose, setCheckedClose} = props;
    
    if(!checkedClose) return(null);
    return(
        <>
            <div className={`flex justify-center items-center absolute w-screen h-screen left-0 top-0 text-black cursor-default`}>
                <div className={`flex flex-col justify-between bg-white border-[1px] border-gray400 shadow-lg w-[400px] h-[250px] rounded-lg`}>
                    <div className={`flex justify-center items-center text-[1.7rem] h-[60px] border-b-[2px] border-gray-200`}>채팅방 제목</div>
                    <div className={`flex justify-center text-[1.3rem]`} >정말 나가시겠습니까?</div>
                    <div className={`flex justify-end text-white`}>
                        <button className={`p-2 px-3 my-2 mx-1 bg-blue-500 text-[1.1rem] rounded-md`}>나가기</button>
                        <button 
                        onClick={(e)=> {
                            e.stopPropagation();
                            setCheckedClose(false);
                        }}
                        className={`p-2 px-3 my-2 mx-1 mr-2 bg-blue-500 text-[1.1rem] rounded-md cursor-pointer`}>취소
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

// 참여인원 확인 모달 컴포넌트
export function CheckedCurrentMemberButton(props){

    const {checkedMember, setCheckedMember} = props;

    if(!checkedMember) return(null);
    return(
        <>
            <div className={`flex justify-center items-center w-screen h-screen absolute left-0 top-0 text-black cursor-default`}>
                <div className={`flex flex-col justify-between bg-white w-[600px] h-[800px] rounded-xl border-[1px] border-gray-200 shadow-md`}>
                    <div className={`h-[50px]`}>참여인원</div>
                    <div className={`h-[650px]`}>참여목록</div>
                    <div className={`flex justify-center items-center h-[100px] border-t-[2px] border-gray-200`}>
                        <button
                        onClick={(e)=> {
                            e.stopPropagation();
                            setCheckedMember(false);
                        }}
                            className={`h-[50px] w-[100px] bg-blue-500 text-white font-sans text-[1.2rem] rounded-lg`}>확인
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}