import KakaoMap from "./KakaoMap";
import ListAddPhoto from "./ListAddPhoto";
import { useState } from "react";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// 드래그 가능한 일차 버튼 컴포넌트
const DraggableDayButton = ({ day, index, moveDay, isActive, onClick }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'DAY',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'DAY',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveDay(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      onClick={onClick}
      className={`font-sans text-white bg-blue-500 mr-1 rounded-2xl flex items-center justify-center px-4 py-2 cursor-move transition-all duration-200 ${
        isActive ? "bg-blue-500 text-white" : "bg-gray-200"
      } ${isDragging ? 'opacity-50 scale-110 shadow-lg' : ''} ${
        isOver ? 'border-2 border-blue-400 scale-105' : ''
      }`}
    >
      {day}
    </div>
  );
};

// 드래그 가능한 아이템 컴포넌트
const DraggableItem = ({ item, index, moveItem, handleEditItem, handleDeleteItem }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'ITEM',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'ITEM',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`flex items-center rounded-lg bg-gray-200 mb-4 h-36 ${isDragging ? 'opacity-50' : ''}`}
      style={{ cursor: 'move' }}
    >
      <div>
        <img
          src={item.image}
          alt="등록된 이미지"
          className="ml-2 w-48 h-32 object-cover rounded"
        />
      </div>
      <div className="flex-1 p-4">
        <p className="font-bold text-lg mb-2">
          {item.description}
        </p>
        {item.type === 'place' && (
          <>
            <p className="text-sm text-gray-600 mb-1">
              {item.address}
            </p>
            <p className="text-sm text-gray-500 mb-1">
              {item.category}
            </p>
            {item.phone && (
              <p className="text-sm text-gray-500 mb-1">
                {item.phone}
              </p>
            )}
            {item.placeUrl && (
              <a
                href={item.placeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-1 py-1 text-sm text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <span>상세보기</span>
              </a>
            )}
          </>
        )}
      </div>
      <div className="flex items-center gap-2 pr-4">
        <button
          onClick={() => handleEditItem(item)}
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
  );
};

export default function DayList({days, setDays, registeredItems,setRegisteredItems}) {
  // 사진 첨부 표시 여부
  const [showImageInput, setshowImageInput] = useState(false);
  // 이미지 URL 상태
  const [ImageSrc, setImageSrc] = useState(null);
  // 텍스트 상태
  const [text, setText] = useState("");
  

  // 사진 첨부 수정
  const [editingItem, setEditingItem] = useState(null);
  const [editText, setEditText] = useState("");
  const [editImage, setEditImage] = useState(null);

  
  // 현재 활성화된 날짜
  const [activeDay, setActiveDay] = useState("1일차");

  // 버튼 표시 여부 스테이트
  const [showAddDayButton, setShowAddDayButton] = useState(true);
  // 지도 표시 여부
  const [showMap, setShowMap] = useState(false);
  // 장소 수정
  const [editingPlace, setEditingPlace] = useState(null);

  // 이미지 업로드 핸들러
  // CreateList.js 내부의 handleImageUpload 함수 수정
  const handleImageUpload = (e) => {
    e.stopPropagation(); // 이벤트 버블링 중지
    e.preventDefault(); // 기본 동작 방지 (페이지 이동, 제출 등)

    const file = e.target.files?.[0]; // 첫번째 파일 선택
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
      // 파일 선택기 초기화 (중복 첨부 방지용)
      e.target.value = null;
    };
    reader.readAsDataURL(file); // 파일을 base64 문자열로 읽음 (미리보기용)
  };

  // 일차 추가 함수
  const handleAddDay = () => {
    const newDay = `${days.length + 1}일차`;
    if (days.length < 10) {
      // 10일차 까지만
      setDays([...days, newDay]);
    }
  };

  // 클릭한 날자 활성화
  const handleDayClick = (day) => {
    setActiveDay(day);
  };

  // 이미지 등록 로직
  const handleRegisterForActiveDay = () => {
    if (!ImageSrc) {
      alert("이미지를 첨부해주세요");
      return;
    } else if (text.trim() === "") {
      alert("텍스트를 입력해주세요");
      return;
    }

    // 이미지와 글이 모두 입력된 경우에만 등록 가능
    setRegisteredItems((prevItems) => {
      const existingItems = prevItems[activeDay] || [];

      // 수정 할 때
      if (editingItem) {
        const updatedItems = {
          ...prevItems,
          [activeDay]: existingItems.map(
            (item) =>
              item.id === editingItem.id
                ? { ...item, description: text, image: ImageSrc }
                : item
          ),
        };
        console.log('수정 후 등록된 모든 항목:', updatedItems);
        return updatedItems;
      }

      // 이미지 등록 하루 한개 제한
      const hasImage = existingItems.some((item) => item.type === "image");
      if (hasImage) {
        return prevItems;
      }

      // 새로 등록할 때
      const placeItems = existingItems.filter(item => item.type === 'place')
      const newItems = {
        ...prevItems,
        [activeDay]: [
          { image: ImageSrc, description: text, type: "image", id: Date.now() },
          ...placeItems,
        ],
      };
      console.log('이미지 등록 후 모든 항목:', newItems);
      return newItems;
    });

    // 초기화
    setEditingItem(null);
    setImageSrc(null);
    setText("");
    setshowImageInput(false);
  };

  // 장소 등록 로직
  const handlePlaceSelect = (item) => {
    const isEdit = Boolean(editingPlace);
    if(isEdit) {
      handleSaveEditPlace(item);
      alert("수정이 완료되었습니다");
      return;
    }

    setRegisteredItems((prevItems) => {
      // 선택한 날짜에 해당하는 기존 항복이 있는지 확인, 없으면 빈 배열
      const existingItems = prevItems[activeDay] || [];
      // some : 배열 중 하나라도 만족하는 요소가 있으면 true
      const isDuplicate = existingItems.some(
        (i) => i.image === item.image && i.description === item.description
      );
      // 증복이면 기존 항목을 그대로 반환, 추가 안함
      if (isDuplicate) return prevItems;

      // 새로 등록인 경우
      const newItems = {
        ...prevItems,
        [activeDay]: [
          ...existingItems,
          { ...item, type: "place", id: Date.now() },
        ],
      };
      console.log('장소 등록 후 모든 항목:', newItems);
      return newItems;
    });
    setShowMap(false);
  };

  // 삭제 할 경우
  const handleDeleteItem = (itemId) => {
    // 사용자가 확인을 클릭시 true
    if (window.confirm("정말 삭제하시겠습니까?")) {
      setRegisteredItems((prevItems) => {
        const existingItems = prevItems[activeDay] || [];
        return {
          ...prevItems,
          // itemId와 일치하지 않는 항목들만 남김, 해당 항목 삭제
          [activeDay]: existingItems.filter((item) => item.id !== itemId),
        };
      });
    } else {
      return;
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setEditText("");
    setEditImage(null);
    setshowImageInput(false);
    setText("");
    setImageSrc(null);
    setEditingPlace(null);
    setShowMap(false);
  };

  // 사진 첨부 수정
  const handleSaveEdit = () => {
    if (!editingItem) return;

    setRegisteredItems((prevItems) => {
      const existingItems = prevItems[activeDay] || [];
      return {
        ...prevItems,
        [activeDay]: existingItems.map((item) =>
          item.id === editingItem.id
            ? { ...item, description: text, image: ImageSrc }
            : item
        ),
      };
    });

    handleCancelEdit();
  };

  // 장소 수정
  const handleSaveEditPlace = (updatesPlace) => {
    if (!editingPlace) return;

    setRegisteredItems((prevItems) => {
      const existingItems = prevItems[activeDay] || [];

      return {
        ...prevItems,
        [activeDay]: existingItems.map((item) => item.id === editingPlace.id
          ? { ...updatesPlace, type: "place", id: editingPlace.id }
          : item,
      )
      };
    });

    handleCancelEdit();
  };

  // 중복 항목 제거 후 새로운 배열
  const itemsForActiveDay = (registeredItems[activeDay] || []).filter(
    (item, index, self) =>
      index ===
      self.findIndex(
        (t) => t.image === item.image && t.description === item.description
      )
  );

  const hasRegisteredImage = itemsForActiveDay.some(
    (item) => item.type === "image"
  );

  const handleEditItem = (item) => {
    setEditingItem(item);
    setEditText(item.description);
    setEditImage(item.image);
    if (item.type === "image") {
      setshowImageInput(true);
      setText(item.description);
      setImageSrc(item.image);
    } else if (item.type === "place") {
      setEditingPlace(item);
      setShowMap(true);
    }
  };

  // 아이템 이동 함수
  const moveItem = (dragIndex, hoverIndex) => {
    setRegisteredItems((prevItems) => {
      const items = [...(prevItems[activeDay] || [])];
      const draggedItem = items[dragIndex];
      items.splice(dragIndex, 1);
      items.splice(hoverIndex, 0, draggedItem);
      
      const newItems = {
        ...prevItems,
        [activeDay]: items,
      };
      
      // 순서가 변경된 항목들을 콘솔에 출력
      console.log('순서 변경 후 항목들:', {
        날짜: activeDay,
        항목들: items.map((item, index) => ({
          순서: index + 1,
          타입: item.type,
          설명: item.description,
          ID: item.id
        }))
      });
      
      return newItems;
    });
  };

  // 일차 이동 함수
  const moveDay = (dragIndex, hoverIndex) => {
    setDays((prevDays) => {
      const newDays = [...prevDays];
      const draggedDay = newDays[dragIndex];
      newDays.splice(dragIndex, 1);
      newDays.splice(hoverIndex, 0, draggedDay);
      
      // 일차 번호 업데이트
      return newDays.map((_, index) => `${index + 1}일차`);
    });

    // 현재 선택된 일차가 이동된 경우, 해당 일차의 내용도 함께 이동
    setRegisteredItems((prevItems) => {
      const newItems = {};
      const oldDays = [...days];
      const draggedDay = oldDays[dragIndex];
      oldDays.splice(dragIndex, 1);
      oldDays.splice(hoverIndex, 0, draggedDay);

      console.log('이동 전 항목들:', prevItems);
      console.log('이동하는 일차:', draggedDay);
      console.log('이동 전 일차 순서:', oldDays);

      // 새로운 순서에 맞게 항목들 재배치
      oldDays.forEach((oldDay, index) => {
        const newDay = `${index + 1}일차`;
        if (prevItems[oldDay]) {
          newItems[newDay] = prevItems[oldDay];
          console.log(`${oldDay}의 항목들이 ${newDay}로 이동됨:`, prevItems[oldDay]);
        }
      });

      console.log('이동 후 항목들:', newItems);
      return newItems;
    });
  };


  const handleDayDelete = (activeday) =>{
      if(window.confirm(`${activeDay}의 모든 항목을 삭제하시겠습니까?`)){
          // days 배열에서 해당 날짜 삭제
        setDays((prevDays) => {
          const newDays = prevDays.filter(day => day!== activeDay);
          //남은 날짜들의 번호 재조정
          return newDays.map((_, index) => (`${index + 1}일차`));
        });

        // registeredItems 업데이트
        setRegisteredItems((prevItems) => {
          const newItems = {};
          const oldDays = [...days];
          const deletedIndex = oldDays.indexOf(activeDay);

          // 삭제된 날짜 이후의 항목들을 한 칸씩 앞으로 이동
          oldDays.forEach((oldDay, index) => {
            if(index < deletedIndex) {
              // 삭제된 날짜 이전의 항목들은 그대로 유지
              newItems[`${index + 1}일차`] = prevItems[oldDay];
             }else if(index > deletedIndex) {
              // 삭제된 날짜 이후의 항목들은 한 칸씩 앞으로 이동
              newItems[`${index}일차`] = prevItems[oldDay];
             }
          });        
        console.log('삭제후 항목들', newItems);
        return newItems;
      })
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex items-center">
        {days.map((day, index) => (
          <DraggableDayButton
            key={index}
            day={day}
            index={index}
            moveDay={moveDay}
            isActive={activeDay === day}
            onClick={() => handleDayClick(day)}
          />
        ))}
        {days.length < 10 && (
          <button onClick={handleAddDay} className="w-8">
            +
          </button>
        )}


        {days.length > 1 && (
           <button className="ml-auto text-gray-400 hover:text-red-500"
           onClick={() => handleDayDelete(activeDay)}
         >삭제</button>
        )}
       
      </div>

      {activeDay && (
        <div className="relative max-h-[650px] overflow-y-auto">
          {!editingItem && !showImageInput && !showMap && !editingPlace && (
            <div>
              {itemsForActiveDay.map((item, index) => (
                <DraggableItem
                  key={item.id}
                  item={item}
                  index={index}
                  moveItem={moveItem}
                  handleEditItem={handleEditItem}
                  handleDeleteItem={handleDeleteItem}
                />
              ))}
            </div>
          )}

          {/* 이미지 폼 ( 등록 / 수정 ) */}
          {showImageInput && (
            <div className="p-4 bg-gray-100 border rounded-xl z-10 h-[650px] relative">
              {/* 닫기 버튼 */}
              {!editingItem && (
                <button
                  className="absolute top-4 right-4"
                  onClick={() => setshowImageInput(false)}
                >
                  ✕
                </button>
              )}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">
                  {editingItem ? "항목 수정하기" : "새로운 항목 추가하기"}
                </h2>
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
                      onClick={() => {
                        // 수정일때
                        if (editingItem) {
                          handleSaveEdit();
                          alert("수정이 완료되었습니다");
                        } else {
                          handleRegisterForActiveDay();
                        }
                      }}
                    >
                      {editingItem ? "수정 완료" : "등록"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 지도 폼 ( 등록 / 수정 ) */}
          {showMap && (
            <div className="relative">
              {/* 닫기 버튼 */}
              <button
                className="absolute top-4 right-4 z-20 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
                onClick={handleCancelEdit}
              >
                ✕
              </button>
              <KakaoMap
                showMap={showMap}
                setShowMap={setShowMap}
                handlePlaceSelect={handlePlaceSelect}
                editingPlace={editingPlace}
              />
            </div>
          )}

          {!editingItem && !showImageInput && !showMap && (
            <div className="relative">
              <button
                className="bg-white border rounded py-1 px-4 text-gray-500 mr-1.5"
                onClick={() => setShowMap(true)}
              >
                장소 등록하기 +
              </button>
              {!hasRegisteredImage && (
                <ListAddPhoto setshowImageInput={setshowImageInput} />
              )}
            </div>
          )}
        </div>
      )}
    </DndProvider>
  );
}
