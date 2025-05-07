import { useEffect, useRef, useState } from "react";

export default function KakaoMap() {
  const mapContainer = useRef(null);
  const [keyword, setKeyword] = useState("");
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [infowindow, setInfowindow] = useState(null);
  const [places, setPlaces] = useState([]);

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

  // 결과 클릭 시 지도 이동
  const handlePlaceClick = (place) => {
    const moveLatLon = new window.kakao.maps.LatLng(place.y, place.x);
    map.setCenter(moveLatLon);
    marker.setPosition(moveLatLon);
    marker.setMap(map);
    infowindow.setContent(
      `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`
    );
    infowindow.open(map, marker);
  };

  return (
    <div className="w-full h-full relative">
      {/* 검색창 */}
      <div className="w-full p-2 flex gap-2 absolute top-0 z-10 bg-white shadow-md">
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
        >
          검색
        </button>
      </div>

      {/* 검색 결과 리스트 */}
      {places.length > 0 && (
        <div className="absolute top-[60px] left-0 right-0 z-10 bg-white max-h-60 overflow-y-auto border-t border-gray-200 shadow-md">
          {places.map((place) => (
            <div
              key={place.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b"
              onClick={() => handlePlaceClick(place)}
            >
              <div className="font-medium">{place.place_name}</div>
              <div className="text-sm text-gray-500">{place.address_name}</div>
            </div>
          ))}
        </div>
      )}

      {/* 지도 영역 */}
      <div ref={mapContainer} className="w-full min-h-[500px]" />
    </div>
  );
}
