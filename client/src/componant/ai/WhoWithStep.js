import { useState } from "react";

export default function WhoWithStep({onNext, onBack}){

    const options = ["혼자", "친구와", "연인과", "배우자와", "아이와", "부모님과", "기타"];
    const [selected, setSelected] = useState(null);


    return(
    <div className="bg-white rounded-lg w-[45%] h-[80%] max-w-full relative flex items-center justify-center bg-blue-400">
        <div className="absolute flex flex-col items-center w-[87%] h-full py-16 justify-between">
            <div className="basis-1/5 w-full flex flex-col items-center">
            <button onClick={onBack} className='flex text-2xl py-4 self-start '>←</button>
                <div className="flex text-6xl">😎</div>

                <div className="flex-1 flex text-3xl items-end">누구와 떠나나요?</div>
                <div className="flex-1 flex justify-center items-start">다중 선택이 가능해요</div>
            </div>
            <div className="basis-3/5 w-full flex justify-center mt-8">
                <div className="w-[75%] h-full">
                    <div className="grid grid-cols-3 gap-2">
                        {options.map(opt => (
                            <button key={opt} className={` py-5 rounded-3xl font-bold text-gray-600  ${selected === opt ? "bg-blue-400 text-white" : "bg-gray-100"}`} onClick={() => setSelected(opt)}>{opt}</button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="basis-1/5 w-full flex flex-col justify-end">
                <button
                onClick={onNext}
                disabled={!selected}
                className={`
                   py-3 rounded-lg text-white font-medium text-base
                    transition-colors duration-200 w-full
                    ${!selected
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
};
