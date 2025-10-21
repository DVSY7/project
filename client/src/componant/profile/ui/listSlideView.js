//client/src/componant/profile/ui/listSlideView.js
import {useState,useEffect,useRef} from "react";
import { fetchListSlides } from "../api/ListSlide";


export const ListSlideView = ({ listID,listContainRef,onClose}) =>{
    const [slideAnimate,setSlideAnimate] = useState("slide-in-right");
    const slideRef = useRef();
    const [listClicked, setListClicked] = useState(false);
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
                await new Promise((resolve) => setTimeout(resolve, 1000));
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

    return(
        <>
            <div 
                ref={slideRef}
                className={`${slideAnimate} border-[2px] rounded-3xl rounded-r-none shadow-lg border-gray-100 bg-white w-[58vw] h-[75vh] absolute p-4 right-0 z-20`}
            >
                <div className={`${listClicked ? "" : listLoadingAnimation } h-20 w-full`}>{listDetails?.listBasic?.title || ""}</div>
                <div className="bg-gray-200 h-[45vh]">일차</div>
            </div>
        </>
    )
}