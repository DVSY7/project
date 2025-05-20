import KakaoMap from "./KakaoMap";
import ListAddPhoto from "./ListAddPhoto";
import { useState } from "react";

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
  const [editingItem, setEditingItem] = useState(null);
  const [editText, setEditText] = useState("");
  const [editImage, setEditImage] = useState(null);

  const handleDayClick = (day) => {
    setActiveDay(day);
  };

  const handleRegisterForActiveDay = () => {
    if (ImageSrc && text.trim() !== "") {
      setRegisteredItems((prevItems) => {
        const existingItems = prevItems[activeDay] || [];
        
        if (editingItem) {
          return {
            ...prevItems,
            [activeDay]: existingItems.map(item =>
              item.id === editingItem.id
                ? { ...item, description: text, image: ImageSrc }
                : item
            ),
          };
        }

        const hasImage = existingItems.some(item => item.type === 'image');
        if (hasImage) {
          return prevItems;
        }

        return {
          ...prevItems,
          [activeDay]: [
            { image: ImageSrc, description: text, type: 'image', id: Date.now() },
            ...existingItems,
          ],
        };
      });

      setEditingItem(null);
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

      const imageItems = existingItems.filter(i => i.type === 'image');
      const normalItems = existingItems.filter(i => i.type !== 'image');

      return {
        ...prevItems,
        [activeDay]: [
          ...imageItems,
          { ...item, type: 'place', id: Date.now() },
          ...normalItems,
        ],
      };
    });
    setShowMap(false);
  };

  const handleDeleteItem = (itemId) => {
    setRegisteredItems((prevItems) => {
      const existingItems = prevItems[activeDay] || [];
      return {
        ...prevItems,
        [activeDay]: existingItems.filter(item => item.id !== itemId),
      };
    });
  };

  const handleStartEdit = (item) => {
    setEditingItem(item);
    setEditText(item.description);
    setEditImage(item.image);
    setShowExample(true);
    setText(item.description);
    setImageSrc(item.image);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setEditText("");
    setEditImage(null);
    setShowExample(false);
    setText("");
    setImageSrc(null);
  };

  const handleSaveEdit = () => {
    if (!ImageSrc || !text.trim()) return;

    setRegisteredItems((prevItems) => {
      const existingItems = prevItems[activeDay] || [];
      return {
        ...prevItems,
        [activeDay]: existingItems.map(item =>
          item.id === editingItem.id
            ? { ...item, description: text, image: ImageSrc }
            : item
        ),
      };
    });
    
    handleCancelEdit();
  };

  const itemsForActiveDay = (registeredItems[activeDay] || []).filter(
    (item, index, self) =>
      index ===
      self.findIndex(
        (t) => t.image === item.image && t.description === item.description
      )
  );

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
        <button onClick={handleAddDay} className="w-8">
          +
        </button>
      </div>

      {activeDay && (
        <div className="relative overflow-y-auto max-h-[610px]">
          {!editingItem && !showExample && !showMap && (
            <div>
              {itemsForActiveDay.map((item) => (
                <div
                  key={item.id}
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
                        <p className="text-sm text-gray-600 mb-1">📍 {item.address}</p>
                        <p className="text-sm text-gray-500 mb-1">🏷️ {item.category}</p>
                        {item.phone && (
                          <p className="text-sm text-gray-500 mb-1">📞 {item.phone}</p>
                        )}
                        {item.placeUrl && (
                          <a
                            href={item.placeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-1 py-1 text-sm text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="mr-1">🔗</span>
                            상세보기
                          </a>
                        )}
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2 pr-4">
                    <button
                      onClick={() => handleStartEdit(item)}
                      className="px-3 py-1 rounded hover:text-blue-600"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="px-3 py-1 rounded hover:text-blue-600"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {showExample ? (
            <div className="p-4 bg-gray-100 border rounded-xl z-10 h-[610px]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">
                  {editingItem ? "항목 수정하기" : "새로운 항목 추가하기"}
                </h2>
                {editingItem && (
                  <button
                    onClick={handleCancelEdit}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                )}
              </div>
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
                  <div className="flex gap-2">
                    <button
                      className="bg-blue-500 text-white px-4 rounded mb-4 hover:bg-blue-600"
                      onClick={editingItem ? handleSaveEdit : handleRegisterForActiveDay}
                      disabled={!ImageSrc || !text.trim()}
                    >
                      {editingItem ? "수정 완료" : "등록"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : showMap ? (
            <div className="relative">
              {/* 닫기 버튼 */}
              <button className="absolute top-0 right-2 z-10 text-2xl" onClick={() =>setShowMap(false)}>x</button>
            <KakaoMap
              showMap={showMap}
              setShowMap={setShowMap}
              handlePlaceSelect={handlePlaceSelect}
            />
            </div>
          ) : !editingItem && (
            <div className="relative">
              <button
                className="bg-white border rounded py-1 px-4 text-gray-500 mr-1.5"
                onClick={() => setShowMap(true)}
              >
                장소 등록하기 +
              </button>
              {!hasRegisteredImage && (
                <ListAddPhoto setShowExample={setShowExample} />
              )}
              {/* <button className="bg-white border rounded py-1 px-4 text-gray-500 mr-1.5">
                메모 하기 +
              </button> */}
            </div>
          )}
        </div>
      )}
    </>
  );
}
