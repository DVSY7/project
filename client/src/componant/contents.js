export default function Contents(){
    return (
        <>  
            {/* 검색창 */}
            <div className={"h-[15%] sm:h-[15%] bg-green-50"}>1</div>
            {/* 콘텐츠 */}
            <div className={"h-[55%] sm:h-[75%] bg-green-300"}>2</div>
            {/* 풋터 */}
            <div className={"sm:block hidden h-[30%] sm:h-[10%] bg-green-600"}>3</div>
            {/* (모바일)이미지 호버 */}
            <div className={"sm:hidden flex-grow-4 bg-green-700"}>4</div>
        </>
    )
}