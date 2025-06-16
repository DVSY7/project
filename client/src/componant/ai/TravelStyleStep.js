import { useState} from "react";


export default function TravelstyleStep({onBack, onNext}){

    const options = ["체험 액티비티", "SNS 핫플레이스", "자연과 함께", "유명 관광지는 필수", "여유롭게 힐링", "문화 예술 역사", "여행지 느김 물씬", "쇼핑은 열정적으로", "관광보다 먹방"]    

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
                    <div className="flex text-6xl">📸</div>
    
                    <div className="flex-1 flex text-3xl items-end">내가 선호하는 여행 스타일은?</div>
                    <div className="flex-1 flex justify-center items-end">이번 여행의 동반자를 선택해주세요</div>
                </div>
                <div className="basis-3/6 w-full flex justify-center mt-8">
                    <div className="w-[75%] h-full">
                        <div className="grid grid-cols-3 gap-2">
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