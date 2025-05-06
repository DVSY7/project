//client/src/componant/profile/ui/filterSelectBar.js
import {useState} from "react";

export default function FilterSelectBar(props){
    // 컴포넌트에 전달받은 옵션
    const {selectBarOptions = [], optionkey, filterOptions, setFilterOptions } = props;
    
    const isselected = filterOptions[optionkey];

    // 옵션선택 상태관리 스테이트
    const [clicked, setClicked] = useState(false);
    // 선택된 옵션 상태관리 스테이트
    const [selectedOptions, setSelectedOptions] = useState(isselected);

    // 부모 컴포넌트에 선택된 옵션을 전달하는 함수
    const toggleSelect = (option) => {
        setSelectedOptions(option);
        setFilterOptions(prev => ({
            ...prev,
            [optionkey]: option,
        }))
    }

    return(
        <>  
            {/* 셀렉트 바 영역 */}
            <div 
            key={optionkey}
            onClick={()=>{setClicked((prev) => !prev);}}
            className={`flex justify-center bg-gray-200 border-[6px] px-[10px] border-gray-200 border-solid rounded-md relative font-sans font-bold`}>
                {/* 선택된 옵션 */}
                {isselected}
                {/* 셀렉트 바 드롭다운 영역 */}
                <div className={`${clicked ? "block":"hidden"} mt-8 absolute bg-gray-200  border-gray-200 border-solid rounded-md w-[calc(100%+12px)]`}>
                {selectBarOptions.map((options, index)=>{
                    // 첫번째 요소 스타일링
                    const isFirst = index === 0;
                    // 마지막 요소 스타일링
                    const isLast = index === selectBarOptions.length - 1;
                    return(
                    // 셀렉트 바 요소
                   <p 
                   onClick={()=>{toggleSelect(options)}}
                   key={index}
                   className={`flex justify-center hover:bg-gray-300 w-full h-full py-1 ${isFirst ? "rounded-t-md" : isLast ? "rounded-b-md" : ""} `}>{options}</p>
                )})}
                </div>
            </div>
        </>
    )
}