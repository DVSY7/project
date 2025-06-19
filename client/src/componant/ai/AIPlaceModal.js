//client/src/componant/ai/AIPlaceModal.js

export default function AIPlaceModal({onClose, place, onNext}){

    return(
        <div className="bg-white rounded-lg py-8 w-[50%] h-[61%] max-w-full relative flex items-center justify-center">
                {/* x닫기 버튼 */}
                <button 
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
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
            <div className="flex gap-8 w-[80%] h-[90%]">
            {/* 왼쪽텍스트 */}
            <div className="flex-1 flex-col relative w-full max-w-full">
                <div className="text-gray-400 text-2xl font-thin">{place.engName}</div>
                <div className="text-black-400 text-4xl font-bold mb-4">{place.korName}</div>
                <div className="text-sm mb-4 h-[175px] whitespace-pre-line leading-relaxed text-justify">{place.desc}</div>
                {/* 일정생성 버튼*/}
                <button
                    className="bg-black text-white px-10 py-4 rounded-lg absolute bottom-0 font-bold"
                    onClick={onNext}
                    // onClick={() => console.log(2)}
                >
                    일정 만들기
                </button>
            </div>
            {/* 이미지 */}
            <div className="flex-1 flex flex-col h-full justify-between w-full">
                <img src={place.image}  alt={place.korName} className="w-full h-[80%] bg-black object-cover"/>
                <div className="flex justify-center gap-2">
                    <button className="w-[50%] bg-gray-100 text-blue-600  px-10 py-4 rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-300">항공권</button>
                    <button className="w-[50%] bg-gray-100 text-blue-600  px-10 py-4 rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-300">숙소</button>
                </div>
            </div>
            </div>
        </div>
    );
}
// ✈️<br/> 🛏️<br/>