import FilterButton from "./filterButton";
import {useState} from "react";

export default function FilterModal(props) {

    const {setFilter} = props;

    const [getOptions, setGetOptions] = useState([]);

    const selectedOption = {
        option1: ["대면", "비대면"],
        option2: ["같이하기", "혼자하기"],
        option3: ["계획성", "비계획성"],
    };

    return (
        <div onClick={()=>{setFilter(false)}} className="bg-white border-[3px] border-solid border-gray-200 w-[300px] h-[200px] absolute z-20 translate-x-[-250px] cursor-default">
            {Object.entries(selectedOption).map(([key, options]) => (
                        <div key={key} className={`flex justify-between w-full mt-5 `}><FilterButton options={options} setGetOptions={setGetOptions}/></div>
            ))}
        </div>
    );
}

// 김교수님 방 비빌번호: 7696