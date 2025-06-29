//client/create/list/IsPlanned.js

// DOM 요소나 특정값을 기억하거나 직접 조작할때 사용 
import { useRef, useState } from 'react';

export default function IsPlanned({setEndDate, setMeetPlace, setBudget, setPeriodStartDate, setPeriodEndDate}){

    const startDateRef = useRef(null);
    const endDateRef = useRef(null);
    // 예산 범위 상태 추가
    const [budgetRange, setBudgetRange] = useState([100000, 1000000]);

    const updatePeriod = () => {
      // ?는 startDateRef.current 가 null이 아니면 .value를 가져오기 
        const startDate = startDateRef.current?.value || '';
        const endDate = endDateRef.current?.value || '';
        if(startDate && endDate) {
          setPeriodStartDate(startDate);
          setPeriodEndDate(endDate);
        }
    };

    // 예산 슬라이더 변경 핸들러
    const handleBudgetChange = (idx, value) => {
      const newRange = [...budgetRange];
      newRange[idx] = Number(value);
      // 최소값이 최대값보다 커지지 않게
      if (idx === 0 && newRange[0] > newRange[1]) newRange[0] = newRange[1];
      if (idx === 1 && newRange[1] < newRange[0]) newRange[1] = newRange[0];
      setBudgetRange(newRange);
      setBudget(`${newRange[0]}~${newRange[1]}`);
    };

    return( 
    <div className="w-full grid grid-cols-2 gap-6">
      {/* 마감 날짜 */}
      <div className="rounded-2xl bg-red-100 shadow-md p-6 flex flex-col items-start ml-4">
        <span className="text-3xl mb-2">📅</span>
        <label className="font-semibold mb-1">마감 날짜</label>
        <input
          type="date"
          className="w-full rounded-lg border border-gray-300 p-2 mt-1"
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      {/* 만날 장소 */}
      <div className="rounded-2xl bg-yellow-100 shadow-md p-6 flex flex-col items-start mr-4">
        <span className="text-3xl mb-2">📍</span>
        <label className="font-semibold mb-1">만날 장소</label>
        <input
          type="text"
          placeholder="장소를 입력하세요"
          className="w-full rounded-lg border border-gray-300 p-2 mt-1"
          onChange={(e) => setMeetPlace(e.target.value)}
        />
      </div>
      {/* 예산 */}
      <div className="rounded-2xl bg-green-100 shadow-md p-6 flex flex-col items-start ml-4 w-full">
        <span className="text-3xl mb-2">💰</span>
        <label className="font-semibold mb-1">예산</label>
        <input
          type="number"
          placeholder="예산을 입력하세요"
          className="w-full rounded-lg border border-gray-300 p-2 mt-1"
          onChange={(e) => setBudget(e.target.value)}
        />
      </div>
      {/* 실행 기간 */}
      <div className="rounded-2xl bg-blue-100 shadow-md p-6 flex flex-col items-start mr-4">
        <span className="text-3xl mb-2">⏳</span>
        <label className="font-semibold mb-1">실행 기간</label>
        <div className="flex gap-2 w-full">
          <input
            type="date"
            className="flex-1 rounded-lg border border-gray-300 p-2 mt-1"
            onChange={(e) => setPeriodStartDate(e.target.value)}
          />
          <span className="self-center">~</span>
          <input
            type="date"
            className="flex-1 rounded-lg border border-gray-300 p-2 mt-1"
            onChange={(e) => setPeriodEndDate(e.target.value)}
          />
        </div>
      </div>
    </div>
 )
} 