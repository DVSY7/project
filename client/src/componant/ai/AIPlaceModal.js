export default function AIPlaceModal({open, onClose, place}){
    if(!open)  return null;
    return(
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 w-[800x] max-w-full relative">
                <button className="absolute top-2 right-4 text-2xl" onClick={onClose}>x</button>
        <div className="flex gap-8 h-[320px]">
            {/* 왼쪽텍스트 */}
            <div className="flex-1 relative w-96 max-w-full">
                <div className="text-gray-400 text-sm">{place.engName}</div>
                <div className="text-black-400 text-2xl font-bold mb-4">{place.korName}</div>
                <div className=" text-sm mb-4 h-[175px] break-words leadng-[2] w-full">{place.desc}</div>
                   {/* 일정생성 버튼*/}
                <button className="bg-black text-white px-4 py-2 rounded-lg absolute bottom-0 text-sm">일정 만들기</button>
            </div>
            {/* 이미지 */}
            <div className="flex flex-col h-full relative">
                <img src={place.image}  alt={place.korName} className="w-72 h-72 bg-black"/>
                <div className="flex-1 flex justify-center items-center gap-1 pt-2">
                    <button className="w-[50%] bg-gray-100 py-2 rounded-lg">항공권</button>
                    <button className="w-[50%] bg-gray-100 py-2 rounded-lg">숙소</button>
                </div>
            </div>
        </div>
        </div>
        </div>
    );
}