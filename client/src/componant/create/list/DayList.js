import { useState } from "react";

export default function DayList({
  days,
  showAddDayButton,
  handleAddDay,
  activeDay,
  setActiveDay,
}) {
  // 날짜 별 항목 상태 (빈 객체로 초기화)
  const [dayItems, setDayItems] = useState({});

  // 클릭한 날짜를 활성화
  const handleDayClick = (day) => {
    setActiveDay(day);
  };

  // 해당 일자 항목 추가 핸들러
  const handleAddItemToDay = (item) => {
    if (activeDay) {
      setDayItems((prev) => ({
        ...prev,
        [activeDay]: [...(prev[activeDay] || []), item],
      }));
    }
  };

  return (
    <>
      {showAddDayButton ? (
        <div className="flex justify-between items-center">
          <div className="text-gray-300 font-semibold">
            <button onClick={handleAddDay}>일차 추가 +</button>
          </div>
        </div>
      ) : (
        <>
        {/*  추가된 일차 목록 */}
        <div className="flex items-center">
          {days.map((day, index) => (
            <div
              key={index}
              onClick={() => handleDayClick(day)}
              className={`font-sans text-white bg-blue-500 mr-1 rounded-2xl  flex items-center justify-center px-4 py-2 ${
                activeDay === day ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {day}
            </div>
          ))}
          <button onClick={handleAddDay} className="border w-8">
            +
          </button>
        </div>

  
        {/* {activeDay && (
          <div> */}
            {/* <h3 className="text-lg font-bold mb-2">{activeDay} 항목</h3> */}+
            {/* <ul>
              {(dayItems[activeDay] || []).map((item, index) => (
                <li key={index} className="mb-2">
                  {item}
                </li> */}
        {/* //       ))}
        //     </ul> 
        //     <button
        //       className="bg-blue-500 text-white px-4 py-2 rounded"
        //       onClick={() => handleAddItemToDay("새 항목")}
        //     >
        //       항목 추가
        //     </button>
        //   </div>
        // )}
        */}
        </>
      )}
    </>
  );
}
