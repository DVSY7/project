import { useState } from "react";


export default function PreferTravelPlan({onBack, onNext, onClose}){

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
                <div className="basis-1/8 w-full flex flex-col items-center">
                    <div className="flex justify-between w-full">
                        <button onClick={onBack} className="text-2xl">
                            ←
                        </button>
                        <button
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
                            onClick={onClose}
                        >
                            <svg
                                className="w-5 h-5 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="basis-3/8 w-full flex flex-col items-center">
                    <div className="flex text-6xl">🗺</div>
                    <div className="flex-1 flex text-3xl items-end">선호하는 여행 일정은?</div>
                    <div className="flex-1 flex justify-center items-end">선택해주신 스타일로 일정을 만들어보세요</div>
                </div>
                <div className="basis-3/8 w-full flex justify-center">
                    <div className="w-[75%] h-full">
                        <div className="flex flex-col gap-2">
                            {options.map(opt => (
                                <button key={opt} className={` py-5 rounded-3xl font-bold text-gray-600  ${selected.includes(opt) ? "bg-blue-400 text-white" : "bg-gray-100"}`} onClick={() => handleSelect(opt)}>{opt}</button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="basis-1/8 w-full flex flex-col justify-end">
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