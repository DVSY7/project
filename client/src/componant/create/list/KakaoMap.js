import { useEffect, useRef, useState } from "react";
import exImage from "./images/cafe_ex.jpg";
import exImage2 from "./images/cafe_ex2.jpg";
import exImage3 from "./images/noodle_ex.jpg";


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
    // 1. <script> 태그를 새로 만들어서 카카오맵 API를 비동기로 불러옴
    const script = document.createElement("script");
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=7560f2c1be7d20d787a9ec19a4433e75&libraries=services&autoload=false";
    // 비동기 로딩
    script.async = true; 
    // head 태그 내부에 script를 추가하여 실행
    document.head.appendChild(script);
    
    // 2. 스크립트가 로드 완료되면 호출되는 함수
    script.onload = () => {
      // 카카오맵 API의 'load'함수 실행
      // 이 안에 지도를 생성하는 코드를 넣어야 카카오맵 API가 완전히 준비된 후 실행됨
      window.kakao.maps.load(() => {
        // 3. 지도 옵션 객체 생성
        const options = {
          // 지도 중심 좌표 설정
          center: editingPlace
          ? new window.kakao.maps.LatLng(editingPlace.y || 37.566826, editingPlace.x || 126.978656) : new window.kakao.maps.LatLng(37.566826, 126.978656),
          // 확대 레벨 설정( 숫자가 작을수록 확대)
          level: 3, 
        };

         // 4. 실제 지도 생성
         // mapContainer.current: 지도 html요소를 가리키는 ref
        const mapInstance = new window.kakao.maps.Map(
          mapContainer.current,
          options
        );
        // 5. 생성한 지도 인스턴스를 state에 저장( 다른 컴포넌트에세 사용하거나 업데이트를 위해 )
        setMap(mapInstance); 

        // 6. 지도 위에 표시할 마커 생성
        const newMarker = new window.kakao.maps.Marker({
          // 마커 위치는 지도 중신과 동일하게
          position: options.center,
        });
        // 마커 객체를 state에 저장
        setMarker(newMarker);

        // 7. 인포윈도우 생성 (말풍선 같은 정보 함)
        const newInfowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
        // 마커 객체를 state에 저장
        setInfowindow(newInfowindow);

        // 8. 수저 모드라면 (기조 장소가 있으면) 기존 장소를 검색 및 표시
        if (editingPlace) {
          searchPlaces(); // 기존 장소를 지도에 표시하는 함수 호출
        }
      });
    };
  }, [editingPlace]);

  // 장소 검색
  const searchPlaces = () => {
    // 1. map이 아직 생성이 안되었거나 keyword가 비어있으면 함수 종료
    if (!map || !keyword.trim()) return;

    // 2. 카카오 장소 검색 서비스 객체 생성
    // 이 객체로 keywordSearch 같은 메서드를 사용할 수 있음
    const ps = new window.kakao.maps.services.Places();

    // 3. 사용자가 입력한 keyword로 장소를 검색, 결과는 data에 , 검색 상태는 status에 반환
    ps.keywordSearch(keyword, (data, status) => {
      // 4. 검색 경과가 성공일 때 
      if (status === window.kakao.maps.services.Status.OK) {
        // 5. 검색된 장소 목록을 state에 저장

        setPlaces(data); 

        // 6. 검색 결과 중 첫 번째 장소를 가져옴
        const firstPlace = data[0];

        // 7. 위도(y), 경도(x)를 기반으로 지도 좌표 객체 생성
        const moveLatLon = new window.kakao.maps.LatLng(
          firstPlace.y, // 위도
          firstPlace.x // 경도
        );

        // 8. 지도 중심을 첫번째 검색 결과의 위치로 이동
        map.setCenter(moveLatLon);

        // 9. 마커 위치를 해당 장소로 이동
        marker.setPosition(moveLatLon);

        // 10. 머커 지도에 표시 (안보일 경우를 대비)
        marker.setMap(map);

        // 11. 인포윈도우 (말풍선)에 표시할 html 설정
        infowindow.setContent(
          `<div style="padding:5px;font-size:12px;">${firstPlace.place_name}</div>`
        );
        // 12. 해당 마커 위치에 인포윈도우 표시
        infowindow.open(map, marker);
      } else {
        // 13. 검색 실패일 경우 places 초기화 (화면에서 지움)
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

  // 사용자가 클릭한 장소 정보를 받아서 마커 이동 및 인포윈도우를 보여주는 함수
  const moveMakerAndShowInfo = (place) => {
    // 하나라도 없으면 실행 중단 (에러방지용)
    if(!map || !marker || !infowindow) return;

    // 선택한 장소의 위도, 경도 값을 LatLng 객체로 변환
    const moveLatLon = new window.kakao.maps.LatLng(place.y, place.x);
  
    // 지도 중심 좌표를 moveLatLon 기준으로 x/y 방향으로 이동한 좌표를 구함
    // getOffsetLatLng(map, 기준좌표, y오프셋, x오프셋)
    const offsetCenter = getOffsetLatLng(map, moveLatLon, 150, 0);

    // 지도 중심을 offsetCener로 이동시킴
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

  // 장소 등록하는 로직, 비동기 함수 선언
  const registerPlace = async (place) => {
    if (!place) {
      alert("장소를 선택해주세요");
      return;
    }

    try{
      setIsLoading(true);
      console.log("선택된 장소: ", place);

      // 최종적으로 등록할 데이터 형식을 가공한 객체 - newItem
      const newItem = {
        description: place.place_name, // 장소 이름
        type: "place", // 항목 구분 place 고정
        address: place.address_name, // 주소
        category: place.category_name, // 장소 분류
        placeId: place.id, // 카카오 장소 ID
        phone: place.phone, // 전화번호
        placeUrl: `https://place.map.kakao.com/${place.id}`, // 경도 위도
        x: place.x,
        y: place.y
      };

      console.log("등록할 아이템", newItem);

      // 장소 검색 결과 리스트 초기화 -> 등록 후 화면 정리용
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
    }
    // 성공이든 실패든 로딩 상태 종료
    finally{
      setIsLoading(false);
    }
  };
  
  // 등록 버튼
  const handlePlaceClick = (place) => {
    registerPlace(place);
  }

  return (
    <div className="relative border rounded-xl z-10 h-[650px]">
      {/* 검색창 */}
      <div className="absolute left-0 right-0 w-[35%] h-full flex flex-col mb-4 bg-white z-10" >
        <div className="flex p-2 justify-between">
          <input
            type="text"
            value={keyword} // 입력창 안의 글자는 항상 keyword state와 동기화됨
            onChange={(e) => setKeyword(e.target.value)} // 실시간으로 keyword 값이 업데이트 됨
            onKeyDown={(e) => e.key === "Enter" && searchPlaces()} // 눌린 키가 enter 이면 searchPlaces() 함수를 실행
            placeholder="장소를 검색하세요"
            className="p-2 border-2 border-blue-500 rounded focus:outline-none w-full"
          />
          {/* <button
            onClick={searchPlaces}
            className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? '처리 중...' : '검색'}
          </button> */}
        </div>
        <div className="relative w-full h-full">
         {/* 검색 결과 리스트 */}
        {places.length > 0 ? (
          <div className="absolute bg-white w-full h-full overflow-y-auto border-t border-gray-200 shadow-md">
            {places.map((place) => (
              <div
                key={place.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b"
                // 해당 장소를 클릭하면 해당 장소로 마커 이동, 인포윈도우 표시
                onClick={() => moveMakerAndShowInfo(place)}
              >
                <div className="font-medium">{place.place_name}</div>
                <div className="text-sm text-gray-500">{place.address_name}</div>
                <div className="text-sm mt-1 relative">
                  <a
                    href={`https://place.map.kakao.com/${place.id}`}
                    target="_blank" // 새 창으로 열기기
                    rel="noopener noreferrer" // 보안 속성
                    onClick={(e) => e.stopPropagation()}
                    className="text-blue-600 hover:underline"
                  >
                    상세보기
                  </a>
                  <span className="absolute right-0 text-red-600 hover:underline" onClick={() => handlePlaceClick(selectedPlace)}>등록</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="absolute w-full h-full overflow-y-auto border-t border-gray-200 shadow-md flex flex-col p-2">
            <div className="border-b border-gray-100 pt-1 pb-3 text-xl font-semibold">북구 운암3동</div>
            
            {examples.map((ex, index) => (
              <div className="flex flex-col h-[300px] my-3" key={index}>
              <div className="h-[200px]">
                <img src={ex.placeImg} alt="카페 예시 이미지" className="w-full h-full" />
              </div>
              <div className="h-[100px]">
                <div className="text-xl pt-3 text-blue-600 font-semibold">{ex.placeName}<span className="text-gray-500 text-base ml-2">{ex.placeCategory}</span></div>
                <div className="text-lg pt-1">{ex.placeExplain}</div>
                <div className="text-lg">리뷰 100/ 평균 5,000원</div>
              </div>
            </div>
            )

            )}
                
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

const examples = [
  {
    placeName : "미담카페",
    placeCategory : "디저트",
    placeExplain: "다양한 맛의 곤약 젤리와 맛있는 음료",
    placeImg: exImage,
  },
  {
    placeName : "스위티베이커리",
    placeCategory : "베이커리",
    placeExplain: "맛있는 빵과 친절한 서비스의 조화",
    placeImg: exImage2,
  },
  {
    placeName : "평창메밀",
    placeCategory : "한식",
    placeExplain: "맛있는 반찬과 쫄깃한 고소한 면의 조화",
    placeImg: exImage3,
  }
]