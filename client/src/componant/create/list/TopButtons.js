// client/create/list/TopButtons.js

import { useState } from "react";

export default function TopButtons({ isPlanned, setIsPlanned, Group, setGroup, Offline, setOffline }) {

   // 인원 수 선택 항목변수
   const selectNumber = [2, 4, 8, 12, 16, 20, 30, 50, 100, "기타"];
  
  return (
    <div className="flex-1 flex items-center justify-between">
      <div className="sm:text-xl text-lg">20xx.MM.DD</div>
      <div>
        <button
          className="mr-2 border px-4 py-0.5 rounded"
          onClick={() => setIsPlanned(!isPlanned)}
        >
          {isPlanned ? "계획형" : "자유형"}
        </button>
        <button
          className="mr-2 border px-4 py-0.5 rounded"
          onClick={() => setGroup(!Group)}
        >
          {Group ? "같이하기" : "혼자하기"}
        </button>
        {/*Group이 true일 때만 인원 셀렉트 박스 렌더링*/}
        {Group && (
          <select className="mr-2 h-[30px] w-16 rounded border">
            {/* 인원선택 항목 반복문 */}
            {selectNumber.map((number, i) => {
              return (
                <option key={i} value={number}>
                  {number}
                </option>
              );
            })}
          </select>
        )}
        <button
          className="border px-4 py-0.5 rounded"
          onClick={() => setOffline(!Offline)}
        >
          {Offline ? "대면" : "비대면"}
        </button>
      </div>
    </div>
  );
}
