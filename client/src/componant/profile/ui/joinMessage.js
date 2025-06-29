import { addUserRoom } from "../api/List";

export default function JoinMessage(props){
    const {clickedJoin,setClickedJoin,title,index,currentMember,maxMember,img, listID, userID} = props;

    // 버튼 스타일링 변수
    const buttonStyle = `w-[60px] h-[25px] bg-blue-500 rounded-[0.25rem] text-white font-sans font-normal m-1`;

    // 참여 메세지를 닫음
    const handleChangeJoinModal = () => {
        const updateClicked = [...clickedJoin];
        updateClicked[index] = false;
        setClickedJoin(updateClicked);
    }

    // 리스트에 참여한 유저를 채팅방에 추가하는 함수
    const handleChangeChatroom = async () => {
        // 데이터 베이스에 유저를 저장
        const res = await addUserRoom(listID, userID);
        // 데이터 베이스 반영 결과를 저장
        const result = res.affectedRows;
      // 결과에 따라 처리 0 또는 1
      if(result){
        // eslint-disable-next-line no-restricted-globals
        if(confirm("대화방에 참가되었습니다. \n커뮤니티로 이동하시겠습니까?")){
            window.location.href = "/community"
        }  
      }else{
        alert("이미 참여중인 리스트 입니다.");
      }
    }

    if (!clickedJoin[index]) return null;

    return(
        <>
            <div
                onClick={(e) => e.preventDefault()}
                className={`flex flex-col justify-between fixed left-[calc(50%_-_200px)] top-[calc(50%_-_100px)] w-[400px] h-[200px] bg-white border-[1px] rounded-xl shadow-md z-50 cursor-default transition-opacity duration-500`}>
                {/* 리스트 제목 */}
                <div className={`flex justify-start items-center text-black text-[1.2rem] mt-4` }>
                    {/* 리스트 프로필 이미지 */}
                    <img className={`w-[40px] h-[40px] mx-4 rounded-[50%]`} alt="미니프로필" src={`${img}`}></img>
                    <div>{title}</div>
                </div>
                {/* 메세지 본문 내용 */}
                <p className={`flex left-12 relative h-[60px] text-black`}>리스트에 참여하시겠습니까?</p>
                {/* 참여현황 영역 */}
                <div className={`flex absolute top-28 left-12 text-black`}>
                    <div className={`mr-16`}>현재인원 : {currentMember} </div>
                    <div>최대인원 : {maxMember} </div>
                </div>
                {/* 참여 또는 취소 버튼 영역 */}
                <div className={`flex justify-end`}>
                    <button 
                        className={`${buttonStyle}`}
                        onClick={(e)=>{
                            e.stopPropagation();
                            handleChangeChatroom();
                            handleChangeJoinModal();
                        }}

                    >
                        참여
                    </button>

                    <button 
                        className={`${buttonStyle} mr-2 mb-2`}
                        onClick={(e)=> {
                            e.stopPropagation();
                            handleChangeJoinModal();
                        }
                        }
                    >
                        취소
                    </button>
                </div>

            </div>
        </>
    )
}