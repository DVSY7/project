//client/src/componant/profile/ui/filterButton.js
import {useState, useEffect} from "react";

export default function FilterButton(props){
    // 컴포넌트에 전달받은 옵션
    const {options,setGetOptions} = props;
    // 옵션선택 상태관리 스테이트
    const [clicked, setClicked] = useState();
    
    const [selectedOptions, setSelectedOptions] = useState(options[0]);

    useEffect(()=>{
        console.log(selectedOptions);
        setGetOptions((prev) => [...prev,selectedOptions]);
    },[clicked])

    return(
            <>
                <div onClick={()=>{setClicked((prev) => !prev); setSelectedOptions(clicked ? options[0]:options[1])}} className={`w-[40px] h-[12px] ${clicked ? "bg-blue-200" : "bg-gray-300" } transition-colors duration-1000 rounded-2xl ml-8 cursor-pointer`}>
                    <div className={`${clicked ? "clicked-before translate-x-[60%]":""} transition-transform  duration-500 galleryhover-before`}></div>
                </div>
                <div className={`${clicked ? "text-black opacity-50" : "text-black opacity-100" } flex-1 ml-8 transition-opacity duration-500`}>{options[0]}</div>
                <div className={`${clicked ? "text-black opacity-100" : "text-black opacity-50" } flex flex-1 justify-start mr-8 transition-opacity duration-500`}>{options[1]}</div>
            </>
    )
}