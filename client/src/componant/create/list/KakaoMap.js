import { useEffect, useRef, useState } from "react";


export default function KakaoMap({setShowMap, handlePlaceSelect, editingPlace}) {
  const mapContainer = useRef(null);
  const [keyword, setKeyword] = useState(""); // 검색어
  const [map, setMap] = useState(null); 
  const [marker, setMarker] = useState(null);
  const [infowindow, setInfowindow] = useState(null);
  const [places, setPlaces] = useState([]); // 검색 결과
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [selectedPlace, setSelectedPlace] = useState(null); 

  // 수정 모드일 때 초기화 - 검색어 세팅
  useEffect(() => {
    if (editingPlace) {
      setKeyword(editingPlace.description);

      if(map && marker && infowindow) {
        const moveLatLon = new window.kakao.maps.LatLng(
          editingPlace.y || 37.566826,
          editingPlace.x || 126.978656
        );
        map.setCenter(moveLatLon);
        marker.setPosition(moveLatLon);
        marker.setMap(map);
        infowindow.setContent(
          `<div style="padding:5px;font-size:12px; background-color:pink">${editingPlace.description}</div>`
        );
        infowindow.open(map,marker);
      }
    }
  }, [editingPlace, map, marker, infowindow]);

  
  // 지도 초기화
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=7560f2c1be7d20d787a9ec19a4433e75&libraries=services&autoload=false";
    script.async = true; // 비동기 로딩
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const options = {
          center: editingPlace
          ? new window.kakao.maps.LatLng(editingPlace.y || 37.566826, editingPlace.x || 126.978656) : new window.kakao.maps.LatLng(37.566826, 126.978656),
          // 지도 확대 수준
          level: 3, 
        };

         // 실제 지도 생성
        const mapInstance = new window.kakao.maps.Map(
          mapContainer.current,
          options
        );
        // 이 지도를 state에 저장
        setMap(mapInstance); 

        // 마커 생성 및 저장
        const newMarker = new window.kakao.maps.Marker({
          position: options.center,
        });
        setMarker(newMarker);
        // 인포윈도우 생성 및 저장
        const newInfowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
        setInfowindow(newInfowindow);

        // 수정 모드일 때 기존 장소 표시
        if (editingPlace) {
          searchPlaces();
        }
      });
    };
  }, [editingPlace]);

  // 장소 검색
  const searchPlaces = () => {
    if (!map || !keyword.trim()) return;

    //장소 검색 객체 생성 - 키워드 검색
    const ps = new window.kakao.maps.services.Places();

    
    // 사용자가 입력한 keyword로 장소를 검색, 결과는 data에 , 검색 상태는 status에 반환
    ps.keywordSearch(keyword, (data, status) => {
      // 검색 경과가 성공일 때 
      if (status === window.kakao.maps.services.Status.OK) {
        // 검색 결과 저장
        setPlaces(data); 

        // 첫번째 검색 결과의 위도, 경도 계산
        const firstPlace = data[0];
        const moveLatLon = new window.kakao.maps.LatLng(
          firstPlace.y,
          firstPlace.x
        );

        // 지도 중심을 첫번째 검색 결과의 위도, 경도로 이동
        map.setCenter(moveLatLon);
        // 마커 위치 업데이트
        marker.setPosition(moveLatLon);
        // 머커 지도위에 표기
        marker.setMap(map);

        // 인포윈도우 (말풍선)
        infowindow.setContent(
          `<div style="padding:5px;font-size:12px;">${firstPlace.place_name}</div>`
        );
        // 지정한 마커 위치에 인포윈도우 표시
        infowindow.open(map, marker);
      } else {
        // 검색 실패일 경우 places 초기화
        setPlaces([]);
      }
    });
  };
  
  // 지도 이동
  function getOffsetLatLng(map, latlng,offsetX, offsetY){
    // 현재 지도의 투영 정보 가져오기
    const proj = map.getProjection();
    // 위도 경도를 화면 픽셀 좌표로 변환
    const point = proj.pointFromCoords(latlng);
    // 픽셀 좌표에서 오프셋만큼 이동
    const movedpoint = new window.kakao.maps.Point(point.x - offsetX, point.y - offsetY);
    // 이동한 픽셀 좌표를 다시 위도/경도로 변환
    return proj.coordsFromPoint(movedpoint);
  }

  const moveMakerAndShowInfo = (place) => {
    // 하나라도 없으면 실행 중단 (에러방지용)
    if(!map || !marker || !infowindow) return;

    // 선택한 장소의 위도, 경도 
    const moveLatLon = new window.kakao.maps.LatLng(place.y, place.x);
  
    const offsetCenter = getOffsetLatLng(map, moveLatLon, 150, 0);

    map.setCenter(offsetCenter);

    // 마커 위치 해당 장소로 이동
    marker.setPosition(moveLatLon);
    // 마커를 지도에 표시
    marker.setMap(map);
    // 인포 윈도우에 표시할  html설정
    infowindow.setContent(
      `<div style="">${place.place_name}</div>`
    );
    // 마커 위에 인포윈도우 표시
    infowindow.open(map,marker);

    setSelectedPlace(place);
  }

  // 장소 등록하는 로직
  const registerPlace = async (place) => {
    if (!place) {
      alert("장소를 선택해주세요");
      return;
    }

    try{
      setIsLoading(true);
      console.log("선택된 장소: ", place);

      const newItem = {
        description: place.place_name,
        type: "place",
        address: place.address_name,
        category: place.category_name,
        placeId: place.id,
        phone: place.phone,
        placeUrl: `https://place.map.kakao.com/${place.id}`,
        x: place.x,
        y: place.y
      };

      console.log("등록할 아이템", newItem);

      // 검색 결과 숨기기
      setPlaces([]);
      // 부모로 전달
      handlePlaceSelect(newItem);
      // 지도 닫기
      setShowMap(false);

    }catch(error){
      console.log("장소등록 실패", error);

      const fallbackItem = {
        description: place.place_name,
        type: "place",
        address: place.address_name,
        category: place.category_name,
        placeId: place.id,
        phone: place.phone,
        placeUrl: `https://place.map.kakao.com/${place.id}`,
        x: place.x,
        y: place.y
      }

      handlePlaceSelect(fallbackItem);
      setShowMap(false);
    }finally{
      setIsLoading(false);
    }
  };
  
  const handlePlaceClick = (place) => {
    registerPlace(place);
  }

  return (
    <div className="relative border rounded-xl z-10 h-[610px]">
      {/* 검색창 */}
      <div className="absolute left-0 right-0 w-[35%] h-full flex flex-col mb-4 bg-white z-10" >
        <div className="flex p-2 bg-blue-500 justify-between">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && searchPlaces()}
            placeholder="장소를 검색하세요"
            className="p-2 border rounded focus:outline-none"
          />
          <button
            onClick={searchPlaces}
            className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? '처리 중...' : '검색'}
          </button>
        </div>
        <div className="relative w-full h-full">
         {/* 검색 결과 리스트 */}
        {places.length > 0 ? (
          <div className="absolute bg-white w-full h-full overflow-y-auto border-t border-gray-200 shadow-md">
            {places.map((place) => (
              <div
                key={place.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b"
                onClick={() => moveMakerAndShowInfo(place)}
              >
                <div className="font-medium">{place.place_name}</div>
                <div className="text-sm text-gray-500">{place.address_name}</div>
                <div className="text-sm mt-1">
                  <a
                    href={`https://place.map.kakao.com/${place.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-blue-600 hover:underline"
                  >
                    상세보기
                  </a>
                  <span className="px-16 text-red-600 hover:underline" onClick={() => handlePlaceClick(selectedPlace)}>등록</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="absolute w-full h-full overflow-y-auto border-t border-gray-200 shadow-md flex flex-col p-2">
            <div className="border-b border-gray-100 pt-1 pb-3 text-xl">북구 운암3동</div>
              <div className="bg-red-400 flex flex-col h-60">
                <div className="bg-red-300 basis-3/5">이미지</div>
                <div className="basis-2/5">
                  <div className="bg-blue-200 text-xl pt-3 text-blue-600 font-semibold">미담카페<span className="text-gray-500 text-base ml-2">디저트</span></div>
                  <div className="bg-blue-200 text-lg pt-1">다양한 맛의 곤약 젤리와 맛있는 음료</div>
                  <div className="bg-blue-200 text-lg">리뷰 100/ 평균 5,000원</div>
                </div>
              </div>
          </div>
        )

        }
       </div>
      </div>
      <div className=" absolute left-0 right-0 h-full ">
        {/* 지도 영역 */}
        <div ref={mapContainer} className="w-full h-full rounded-lg" />
      </div>
    </div>
  );
}
