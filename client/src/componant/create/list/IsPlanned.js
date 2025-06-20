//client/create/list/IsPlanned.js

// DOM 요소나 특정값을 기억하거나 직접 조작할때 사용 
import { useRef } from 'react';

export default function IsPlanned({setEndDate, setMeetPlace, setBudget, setPeriodStartDate, setPeriodEndDate}){

    const startDateRef = useRef(null);
    const endDateRef = useRef(null);

    const updatePeriod = () => {
      // ?는 startDateRef.current 가 null이 아니면 .value를 가져오기 
        const startDate = startDateRef.current?.value || '';
        const endDate = endDateRef.current?.value || '';
        if(startDate && endDate) {
          setPeriodStartDate(startDate);
          setPeriodEndDate(endDate);
        }
    };

    return( 
    <div className="h-full flex flex-col text-lg font-sans p-4 justify-between gap-2">
        {/* <h1 className="mt-4 text-xl font-semibold">
          세부 계획 설정
        </h1> */}
        <div className="flex rounded mb-2 h-[50%] gap-4">
          <div className="bg-blue-100 w-[50%]">
            마감 날짜:
            <input
              type="date"
              className="border rounded p-1 ml-1"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="bg-blue-100 w-[50%]">
            만날 장소:
            <input
              type="text"
              className="border rounded p-1 ml-1"
              placeholder="ex) 서울역"
              onChange={(e) => setMeetPlace(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex rounded h-[50%] gap-4">
          <div className="bg-blue-100 w-[50%]">
            예산:
            <input
              type="text"
              className="border rounded p-1 ml-1"
              placeholder="ex) 5만원"
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>
          <div className="w-[50%] bg-red-100">
            실행 기간:
            <input
              ref={startDateRef}
              type="date"
              className="border rounded p-1 mx-1"
              onChange={updatePeriod}
            />
            -
            <input
            ref={endDateRef}
              type="date"
              className="border rounded p-1 ml-1"
              onChange={updatePeriod}
            />
          </div>
        </div>
      </div>
   
 )
} 