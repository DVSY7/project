import { useState } from "react";

export default function WhoWithStep({ onNext, onBack, onClose }) {
  const options = [
    "혼자",
    "친구와",
    "연인과",
    "배우자와",
    "아이와",
    "부모님과",
    "기타",
  ];
  const [selected, setSelected] = useState(null);

  // const handleSelect = (opt) => {
  //     if(selected.includes(opt)){
  //         setSelected(selected.filter(item => item !== opt))
  //     }
  // }

  const handleNext = () => {
    console.log("WhoWithStep handleNext 호출, selected:", selected);
    onNext(selected); // 선택됟 동반자 값을 부모 컴포넌트로 전달
  };

  return (
    <div className="bg-white rounded-lg w-[45%] h-[80%] max-w-full relative flex items-center justify-center">
      <div className="absolute flex flex-col items-center w-[87%] h-full py-16 justify-between">
        <div className="basis-1/8 w-full flex flex-col items-center">
          <div className="flex justify-between w-full">
            <button onClick={onBack} className=" text-2xl">
              ←
            </button>
            {/* x닫기 버튼 */}
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
          <div className="flex text-6xl">😎</div>

          <div className="flex-1 flex text-3xl items-end">
            누구와 떠나나요?
          </div>
          <div className="flex-1 flex justify-center items-end">
            이번 여행의 동반자를 선택해주세요
          </div>
        </div>
        
        <div className="basis-3/8 w-full flex justify-center">
          <div className="w-[75%] h-full">
            <div className="grid grid-cols-3 gap-2">
              {options.map((opt) => (
                <button
                  key={opt}
                  className={` py-5 rounded-3xl font-bold text-gray-600  ${
                    selected === opt ? "bg-blue-400 text-white" : "bg-gray-100"
                  }`}
                  onClick={() => setSelected(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="basis-1/8 w-full flex flex-col justify-end">
          <button
            onClick={handleNext}
            disabled={!selected}
            className={`
                   py-3 rounded-lg text-white font-medium text-base
                    transition-colors duration-200 w-full
                    ${
                      !selected
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-[#FF385C] hover:bg-[#E31C5F]"
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
