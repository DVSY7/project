import KakaoMap from "./KakaoMap";
import ListAddPhoto from "./ListAddPhoto";

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
  showMap,
  setShowMap,
}) {
  const handleDayClick = (day) => {
    setActiveDay(day);
  };

  const handleRegisterForActiveDay = () => {
    if (ImageSrc && text.trim() !== "") {
      setRegisteredItems((prevItems) => {
        const existingItems = prevItems[activeDay] || [];
        
        // 이미지 타입 아이템이 이미 있는지 확인
        const hasImage = existingItems.some(item => item.type === 'image');
        if (hasImage) {
          return prevItems;
        }

        return {
          ...prevItems,
          [activeDay]: [
            { image: ImageSrc, description: text, type: 'image' },
            ...existingItems,
          ],
        };
      });

      setImageSrc(null);
      setText("");
      setShowExample(false);
    } else {
      setShowExample(false);
    }
  };

  const handlePlaceSelect = (item) => {
    setRegisteredItems((prevItems) => {
      const existingItems = prevItems[activeDay] || [];
      const isDuplicate = existingItems.some(
        (i) => i.image === item.image && i.description === item.description
      );
      if (isDuplicate) return prevItems;

      // 이미지 타입 아이템과 일반 아이템을 분리
      const imageItems = existingItems.filter(i => i.type === 'image');
      const normalItems = existingItems.filter(i => i.type !== 'image');

      return {
        ...prevItems,
        [activeDay]: [
          ...imageItems,
          { ...item, type: 'place' },
          ...normalItems,
        ],
      };
    });
    setShowMap(false);
  };

  const itemsForActiveDay = (registeredItems[activeDay] || []).filter(
    (item, index, self) =>
      index ===
      self.findIndex(
        (t) => t.image === item.image && t.description === item.description
      )
  );

  // 이미지가 이미 등록되어 있는지 확인
  const hasRegisteredImage = itemsForActiveDay.some(item => item.type === 'image');

  return (
    <>
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

      {activeDay && (
        <div className="relative overflow-y-auto max-h-[610px] bg-red-400">
          <div>
            {itemsForActiveDay.map((item, index) => (
              <div
                key={index}
                className="flex items-center rounded-lg bg-gray-200 mb-4 h-36"
              >
                <div>
                  <img
                    src={item.image}
                    alt="등록된 이미지"
                    className="ml-2 w-48 h-32 object-cover rounded"
                  />
                </div>
                <div className="flex-1 p-4">
                  <p className="font-bold text-lg mb-2">{item.description}</p>
                  {item.type === 'place' && (
                    <>
                      <p className="text-sm text-gray-600 mb-1">{item.address}</p>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {showExample ? (
            <div className="p-4 bg-gray-100 border rounded-xl z-10 h-[610px]">
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
              <div className="flex flex-col w-full">
                <textarea
                  className="flex w-full h-44 resize-none p-2 mb-4 border rounded"
                  placeholder="이미지에 대한 설명을 입력하세요..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <div className="flex justify-between">
                  <input
                    key={ImageSrc}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="flex mb-4"
                  />
                  <button
                    className="bg-blue-500 text-white w-16 rounded mb-4"
                    onClick={handleRegisterForActiveDay}
                    disabled={!ImageSrc || !text.trim()}
                  >
                    등록
                  </button>
                </div>
              </div>
            </div>
          ) : showMap ? (
            <KakaoMap
              showMap={showMap}
              setShowMap={setShowMap}
              handlePlaceSelect={handlePlaceSelect}
            />
          ) : (
            <div className="relative bg-slate-800">
              <button
                className="bg-white border rounded py-1 px-4 text-gray-500 mr-1.5"
                onClick={() => setShowMap(true)}
              >
                장소 등록하기 +
              </button>
              {!hasRegisteredImage && (
                <ListAddPhoto setShowExample={setShowExample} />
              )}
              <button className="bg-white border rounded py-1 px-4 text-gray-500 mr-1.5">
                메모 하기 +
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
