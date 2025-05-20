import { useEffect, useRef, useState } from "react";


export default function KakaoMap({showMap, setShowMap, handlePlaceSelect}) {
  const mapContainer = useRef(null);
  const [keyword, setKeyword] = useState("");
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [infowindow, setInfowindow] = useState(null);
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 지도 초기화
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=7560f2c1be7d20d787a9ec19a4433e75&libraries=services&autoload=false";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(37.566826, 126.978656),
          level: 3,
        };
        const mapInstance = new window.kakao.maps.Map(
          mapContainer.current,
          options
        );
        setMap(mapInstance);

        const newMarker = new window.kakao.maps.Marker({
          position: options.center,
        });
        setMarker(newMarker);

        const newInfowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
        setInfowindow(newInfowindow);
      });
    };
  }, []);

  // 장소의 상세 정보를 가져오는 함수
  const getPlaceDetail = async (placeId) => {
    return new Promise((resolve, reject) => {
      const ps = new window.kakao.maps.services.Places();
      ps.getDetails({ placeId }, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          console.log('장소 상세 정보:', result[0]);
          resolve(result[0]);
        } else {
          console.error('장소 상세 정보 가져오기 실패:', status);
          reject(new Error('Failed to get place details'));
        }
      });
    });
  };

  // 장소 검색
  const searchPlaces = () => {
    if (!map || !keyword.trim()) return;

    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(keyword, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setPlaces(data);

        const firstPlace = data[0];
        const moveLatLon = new window.kakao.maps.LatLng(
          firstPlace.y,
          firstPlace.x
        );

        map.setCenter(moveLatLon);
        marker.setPosition(moveLatLon);
        marker.setMap(map);

        infowindow.setContent(
          `<div style="padding:5px;font-size:12px;">${firstPlace.place_name}</div>`
        );
        infowindow.open(map, marker);
      } else {
        setPlaces([]);
      }
    });
  };

  // 장소 클릭 시 지도 이동 + 아이템 등록
  const handlePlaceClick = async (place) => {
    try {
      setIsLoading(true);
      console.log('선택된 장소:', place);

      const moveLatLon = new window.kakao.maps.LatLng(place.y, place.x);
      map.setCenter(moveLatLon);
      marker.setPosition(moveLatLon);
      marker.setMap(map);

      infowindow.setContent(
        `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`
      );
      infowindow.open(map, marker);

      // 장소 상세 정보 가져오기
      const placeDetail = await getPlaceDetail(place.id);
      console.log('상세 정보:', placeDetail);
      
      // 아이템 등록 (상세 정보 포함)
      const newItem = {
        image: `https://via.placeholder.com/200x200?text=${encodeURIComponent(place.place_name)}`,
        description: place.place_name,
        type: 'place',
        address: place.address_name,
        category: place.category_name,
        placeId: place.id,
        phone: place.phone,
        placeUrl: `https://place.map.kakao.com/${place.id}`
      };

      console.log('등록할 아이템:', newItem);

      // 검색 결과 숨기기
      setPlaces([]);

      // 부모 컴포넌트로 전달
      handlePlaceSelect(newItem);
      setShowMap(false);
    } catch (error) {
      console.error('장소 등록 실패:', error);
      // 에러 발생 시 기본 정보만으로 등록
      const newItem = {
        image: `https://via.placeholder.com/200x200?text=${encodeURIComponent(place.place_name)}`,
        description: place.place_name,
        type: 'place',
        address: place.address_name,
        category: place.category_name,
        placeId: place.id,
        phone: place.phone,
        placeUrl: `https://place.map.kakao.com/${place.id}`
      };
      handlePlaceSelect(newItem);
      setShowMap(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-100 border rounded-xl z-10 h-[610px]">
      {/* 검색창 */}
      <div className="w-full p-2 flex gap-2 mb-4">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && searchPlaces()}
          placeholder="장소를 검색하세요"
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={searchPlaces}
          className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? '처리 중...' : '검색'}
        </button>
      </div>

      <div className="relative h-[500px]">
        {/* 검색 결과 리스트 */}
        {places.length > 0 && (
          <div className="absolute left-0 right-0 z-10 bg-white max-h-60 overflow-y-auto border-t border-gray-200 shadow-md">
            {places.map((place) => (
              <div
                key={place.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b"
                onClick={() => handlePlaceClick(place)}
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
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 지도 영역 */}
        <div ref={mapContainer} className="w-full h-full rounded-lg" />
      </div>

    </div>
  );
}
