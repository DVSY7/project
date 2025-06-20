export default function IsPlanned({text, setText}){
    return( 
    <div className="h-full flex flex-col text-lg font-sans p-4 justify-between gap-2">
        {/* <h1 className="mt-4 text-xl font-semibold">
          세부 계획 설정
        </h1> */}
        <div className="flex rounded mb-2 h-[50%] gap-4">
          <div className="bg-blue-100 w-[50%]">
            마감 날짜:{" "}
            <input
              type="date"
              className="border rounded p-1 ml-1"
            />
          </div>
          <div className="bg-blue-100 w-[50%]">
            만날 장소:{" "}
            <input
              type="text"
              className="border rounded p-1 ml-1"
              placeholder="ex) 서울역"
            />
          </div>
        </div>
        
        <div className="flex rounded h-[50%] gap-4">
          <div className="bg-blue-100 w-[50%]">
            예산:{" "}
            <input
              type="text"
              className="border rounded p-1 ml-1"
              placeholder="ex) 5만원"
            />
          </div>
          <div className="w-[50%] bg-red-100">
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
        </div>
      </div>
   
 )
} 