import AddButtons from "./AddButtons";

export default function DayList({
  days,
  activeDay,
  setActiveDay,
  handleAddDay,
  registeredItems,
  setRegisteredItems,
  showExample,
  setShowExample,
  ImageSrc,
  setImageSrc,
  text,
  setText,
  handleImageUpload,
}) {
  const handleDayClick = (day) => {
    // 선택한 날짜로 이동
    setActiveDay(day);
  };

  const handleRegisterForActiveDay = () => {
    console.log("handleRegisterForActiveDay 호출됨");

    if (ImageSrc && text.trim() !== "") {
      setRegisteredItems((prevItems) => {
        console.log("Previous Items:", prevItems);

        // 중복 데이터 확인
        const existingItems = prevItems[activeDay] || [];
        const isDuplicate = existingItems.some(
          (item) => item.image === ImageSrc && item.description === text
        );

        if (isDuplicate) {
          console.log("중복된 항목이 이미 존재합니다.");
          return prevItems; // 상태를 변경하지 않음
        }

        // 상태 업데이트
        const updatedItems = {
          ...prevItems,
          [activeDay]: [...existingItems, { image: ImageSrc, description: text }],
        };

        console.log("Updated Items:", updatedItems);
        return updatedItems;
      });

      // 입력 필드 초기화
      setImageSrc(null);
      setText("");
      setShowExample(false);
    } else {
      setShowExample(false);
    }
  };

  const itemsForActiveDay = (registeredItems[activeDay] || []).filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.image === item.image && t.description === item.description)
  );

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

      {/* 해당 날짜의 등록된 항목 표시 */}
      {activeDay && (
        <div className="relative bg-blue-200 overflow-y-auto max-h-[550px]">
          <div>
            {itemsForActiveDay.map((item, index) => (
              <div key={index} className="flex items-center rounded-lg bg-gray-200 mb-4 h-36">
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
          {/* 이미지 예시 영역 */}
          {showExample ? (
            <div className="p-4 bg-gray-100 border rounded-xl z-10">
              {/* 이미지가 있을 경우 이미지 크기만큼 공간 차지 */}
              {ImageSrc ? (
                <div className="w-full h-[300px] mb-4">
                  <img
                    src={ImageSrc}
                    alt="첨부된 이미지"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              ) : (
                <div className="w-full h-[300px] mb-4 bg-red-100"></div>
              )}
              {/* 텍스트 입력 영역 */}
              <div className="flex flex-col w-full">
                <textarea
                  className="flex w-full h-44 resize-none p-2 mb-4 border rounded"
                  placeholder="이미지에 대한 설명을 입력하세요..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />

                {/* 파일 첨부 버튼 */}
                <div className="flex justify-between">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="flex mb-4"
                  />

                  <button
                    className="bg-blue-500 text-white w-16 rounded mb-4"
                    onClick={(e) => {
                      e.stopPropagation(); // 이벤트 전파 방지
                      console.log("Button clicked");
                      handleRegisterForActiveDay();
                    }}
                    disabled={!ImageSrc || !text.trim()}
                  >
                    등록
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* 등록된 항복 표시 */}
              <div>
                {itemsForActiveDay.map((item, index) => (
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
          )}
          {!showExample && (
            <AddButtons showExample={showExample} setShowExample={setShowExample} />
          )}
          {/* <h2 className="text-lg font-bold mb-4">{activeDay}의 항목</h2>   */}
        </div>
      )}
    </>
  );
}
