export default function IsPlanned(){
    return( 
    <div className="w-[90%] h-full flex flex-col justify-around text-lg font-sans">
        {/* <h1 className="mt-4 text-xl font-semibold">
          세부 계획 설정
        </h1> */}
        <div>
          마감 날짜:{" "}
          <input
            type="date"
            className="border rounded p-1 ml-1"
          />
        </div>
        <div>
          만날 장소:{" "}
          <input
            type="text"
            className="border rounded p-1 ml-1"
            placeholder="ex) 서울역"
          />
        </div>
        <div>
          예산:{" "}
          <input
            type="text"
            className="border rounded p-1 ml-1"
            placeholder="ex) 5만원"
          />
        </div>
        <div>
          실행 기간:{" "}
          <input
            type="date"
            className="border rounded p-1 mx-1"
          />
          -
          <input
            type="date"
            className="border rounded p-1 ml-1"
          />
        </div>
        <textarea
          className="w-full h-[60%] resize-none border rounded-lg p-2 "
          placeholder="소개 글을 자유롭게 입력하세요"
        ></textarea>
      </div>
   
 )
} 