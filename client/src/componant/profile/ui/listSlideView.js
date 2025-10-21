//client/src/componant/profile/ui/listSlideView.js
import {useState,useEffect,useRef} from "react";
import { fetchListSlides } from "../api/ListSlide";
import { changeInterestColor } from "../utilities/interestColor";


export const ListSlideView = ({ listID,listContainRef,onClose}) =>{
    const [slideAnimate,setSlideAnimate] = useState("slide-in-right");
    const slideRef = useRef();
    const [listClicked, setListClicked] = useState(false);
    const [interestBackGround, setInterestBackGround] = useState("");
    const [endDate,setEndDate] = useState();
    // list loading 상태 애니메이션
    const listLoadingAnimation = "p-2 inline-block rounded-lg shimmer-loader"

    // list상세정보
    const [listDetails, setListDetails] = useState();
    // list상세정보 API 호출
    useEffect( ()=>{
        const loadListDetails = async () => {
            try{
                const listDetailsData = await fetchListSlides(listID);
                setListClicked(false);
                setListDetails(null);
                await new Promise((resolve) => setTimeout(resolve, 300));
                if(listDetailsData){
                    setListClicked(true);
                    setListDetails(listDetailsData);
                    console.log("list 상세정보 불러오기성공:",listDetailsData);
                }else{
                    console.log("list 상세정보 불러오기실패");
                }
            }catch(error){
                console.error("list 상세정보 API 호출 오류:",error);
            }
        }
        if(listID) loadListDetails();
    },[listID])

    //외부 클릭 감지
    useEffect(()=>{
        const handleClickOutside = (event) => {
            if (slideRef.current && 
                !slideRef.current.contains(event.target)&&
                (!listContainRef.current ||
                !listContainRef.current.contains(event.target))    
            ) {
                // 슬라이드 외부 클릭 시
                setSlideAnimate("slide-out-right"); // 애니메이션 적용
                setTimeout(()=>{
                    onClose(); // 부모에서 상태 false로 변경
                }, 500); // 애니메이션 시간과 동일하게
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose])

    // 관심사 텍스트 색상 설정
    useEffect(()=>{
        if(listDetails?.listBasic?.interest){
            const interestText = listDetails.listBasic.interest;
            const interestResult = interestText.slice(0, interestText.indexOf("&")).trim();

            const interestColor = changeInterestColor(interestResult)
            setInterestBackGround(interestColor);
        }
    },[listDetails])

    useEffect(()=>{
        if(listDetails?.listBasic?.end_date){
            const endDateText = listDetails.listBasic.end_date;
            const endDateResult = endDateText.slice(0,endDateText.indexOf("T")).trim();

            setEndDate(endDateResult);
        }
    })

    return(
        <>
            <div 
                ref={slideRef}
                className={`${slideAnimate} border-[2px] rounded-3xl rounded-r-none shadow-lg border-gray-100 bg-white w-[58vw] h-[75vh] absolute p-4 right-0 overflow-y-scroll z-20`}
            >
                <div className={`${listClicked ? "border-b-[3px] border-gray-100" :listLoadingAnimation} mb-2 flex h-20 w-full`}>
                    <div className={"h-full w-[40%] text-[1.5em] flex items-center"}>{listDetails?.listBasic?.title}</div>
                    <div className={`flex items-center w-[20%]`}>
                        {listDetails&&(
                            <div className={`px-2 py-1 ${interestBackGround} rounded-full`}>{listDetails?.listBasic?.interest}</div>
                        )}
                    </div>
                    <div className={"h-full w-[30%] flex items-center justify-center gap-4"}>
                        {listDetails&& 
                            <>
                                <div>{listDetails?.listBasic?.is_group? "같이하기" : "혼자하기"}</div>
                                <div>{listDetails?.listBasic?.is_offline? "대면" : "비대면"}</div>
                                <div>{listDetails?.listBasic?.is_planned? "계획형" : "비계획형"}</div>
                            </>
                        }
                    </div>
                    {listDetails&&
                        <div className="flex items-center w-[10%]">최대인원 : {listDetails?.listBasic?.max_participants}</div>
                    }
                </div>
                <div className="flex justify-between h-[45vh]">
                    <div className={`${listClicked? "" : listLoadingAnimation} h-full w-[55%] rounded-lg`}></div>
                    <div className={`${listClicked? "" : listLoadingAnimation} h-full w-[43%] rounded-lg`}></div>
                </div>
                <div className={`h-[15vh] mt-2 flex gap-4`}>
                    {/* 📅📍💰⏳ */}
                    <div className={`${listClicked? "bg-red-100" : listLoadingAnimation} h-full w-[25%] rounded-lg flex flex-col justify-center items-center`}>
                        {listDetails&&(
                            <>
                                <div className={`text-[1.3em] my-2 font-bold w-full ml-4`}>📅 마감 일자 </div>
                                <div className={`bg-white h-[30%] w-[90%] rounded-md flex justify-center items-center font-bold`}>{listDetails?.listBasic?.end_date === null ? "없음" : `${endDate}`}</div>
                            </>
                        )}
                    </div>
                    <div className={`${listClicked? "bg-yellow-100" : listLoadingAnimation} h-full w-[25%] rounded-lg`}></div>
                    <div className={`${listClicked? "bg-green-100" : listLoadingAnimation} h-full w-[25%] rounded-lg`}></div>
                    <div className={`${listClicked? "bg-blue-100" : listLoadingAnimation} h-full w-[25%] rounded-lg`}></div>
                </div>
            </div>
        </>
    )
}