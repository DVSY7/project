import { useNavigate } from "react-router-dom";

export default function DayList({
  days,
  activeDay,
  setActiveDay,
  handleAddDay,
  registeredItems,
}) {
  const navigate = useNavigate();
  const handleDayClick = (day) => {
    setActiveDay(day);
    // 선택한 날짜로 이동
    navigate(`/day/${day}`);
  };

  // activeDay에 해당하는 항목 필터링
  const filteredItems = registeredItems.filter((item) => item.day === activeDay);

  return (
    <>
      {/* 추가된 일차 목록 */}
      <div className="flex items-center">
        {days.map((day, index) => (
          <div
            key={index}
            onClick={() => handleDayClick(day)}
            className={`font-sans text-white bg-blue-500 mr-1 rounded-2xl flex items-center justify-center px-4 py-2 ${
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

<<<<<<< HEAD
      {/* 해당 날짜의 등록된 항목 표시 */}
      {activeDay && (
        <div>
          <h2 className="text-lg font-bold mb-4">{activeDay}의 항목</h2>
          <div>
            {filteredItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center rounded-lg bg-gray-200 mb-4 h-36"
              >
                {/* 이미지 */}
                <div>
                  <img
                    src={item.image}
                    alt="등록된 이미지"
                    className="ml-2 w-48 h-32 object-cover rounded"
                  />
                </div>
                {/* 설명 글 */}
                <div className="flex-1 p-4">
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
=======
  
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
>>>>>>> cfbaadb88114d38586a22a92aab7caec85349ab4
      )}
    </>
  );
}
