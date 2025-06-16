//client/src/componant/profile/ui/filterModal.js

import FilterButton from "./filterButton";
import FilterSelectBar from "./filterSelectBar";

export default function FilterModal(props) {

    const {setFilter,filterOptions, setFilterOptions} = props;


    // 필터링 옵션을 선택할 수 있는 버튼들
    const selectedOption = {
        option1: ["대면", "비대면"],
        option2: ["같이하기", "혼자하기"],
        option3: ["계획성", "비계획성"],
    };
    const selectBarOptions = {
        option4: ["인원","2","4","6","8","16","24","40","100"],
        option5: ["테마","여행","요리","만들기","취미","운동"],
        option6: ["정렬","최신순", "지난순", "조회순", "인기순"],
    }

    return (
        <div onClick={()=>{setFilter(false)}} className="bg-white border-[3px] border-solid border-gray-200 w-[300px] h-[200px] absolute z-20 translate-x-[-250px] cursor-default">
            {Object.entries(selectedOption).map(([key, options]) => (
                        <div key={key} className={`flex justify-between w-full mt-5 `}>
                            <FilterButton 
                            options={options} 
                            optionKey={key}
                            filterOptions={filterOptions}
                            setFilterOptions={setFilterOptions}
                            />
                        </div>
            ))}
            <div className={`flex justify-evenly w-full mt-5`}>
                {Object.entries(selectBarOptions).map(([key, options]) => (
                    <FilterSelectBar 
                    key={key}
                    selectBarOptions ={options.slice(1)} 
                    category={options[0]} 
                    optionkey = {key}
                    filterOptions={filterOptions}
                    setFilterOptions={setFilterOptions}
                    />
                ))}
            </div>
            
        </div>
    );
}

// 김교수님 방 비빌번호: 7696