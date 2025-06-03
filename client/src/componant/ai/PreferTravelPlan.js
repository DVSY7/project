import { useState } from "react";


export default function PreferTravelPlan({onBack, onNext}){

    const options = ["뺴곡한 일정 선호", "널널한 일정 선호"];


    const [selected, setSelected] = useState([]);

    const handleSelect = (opt) => {
        if(selected.includes(opt)){
            setSelected(selected.filter(item => item !== opt));
        }else {
            setSelected([...selected, opt]);
        }
    }

    const handleNext = () => {
        onNext(selected); 
    }

    return(
        <div className="bg-white rounded-lg w-[45%] h-[80%] max-w-full relative flex items-center justify-center">
            <div className="absolute flex flex-col items-center w-[87%] h-full py-16 justify-between">
                <div className="basis-2/6 w-full flex flex-col items-center">
                <button onClick={onBack} className='flex text-2xl py-4 self-start '>←</button>
                    <div className="flex text-6xl">🗺</div>
    
                    <div className="flex-1 flex text-3xl items-end">선호하는 여행 일정은?</div>
                    <div className="flex-1 flex justify-center items-end">선택해주신 스타일로 일정을 만들어보세요</div>
                </div>
                <div className="basis-3/6 w-full flex justify-center mt-8">
                    <div className="w-[75%] h-full">
                        <div className="flex flex-col gap-2">
                            {options.map(opt => (
                                <button key={opt} className={` py-5 rounded-3xl font-bold text-gray-600  ${selected.includes(opt) ? "bg-blue-400 text-white" : "bg-gray-100"}`} onClick={() => handleSelect(opt)}>{opt}</button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="basis-1/6 w-full flex flex-col justify-end">
                    <button
                    onClick={handleNext}
                    disabled={selected.length === 0}
                    className={`
                       py-3 rounded-lg text-white font-medium text-base
                        transition-colors duration-200 w-full
                        ${selected.length === 0
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-[#FF385C] hover:bg-[#E31C5F]'
                        }
                    `}
                    >
                    다음
                    </button>
                </div>
            </div>
        </div>
        );
}