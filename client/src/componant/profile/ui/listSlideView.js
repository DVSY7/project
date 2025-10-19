//client/src/componant/profile/ui/listSlideView.js
import {useState,useEffect,useRef} from "react";


export const ListSlideView = ({ listID,listContainRef,onClose}) =>{
    const [slideAnimate,setSlideAnimate] = useState("slide-in-right");
    const slideRef = useRef();

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
                className={`${slideAnimate} bg-white border-[1px] border-blue-100 w-[57.1vw] h-[75vh] absolute right-0 z-20`}
            >
                {listID}
            </div>
        </>
    )
}