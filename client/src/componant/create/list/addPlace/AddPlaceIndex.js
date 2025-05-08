// 상태 관리와 전체 조합
import { useState } from "react";
import MapContainer from "./MapContainer";
import PlaceSearch from "./PlaceSearch";
import PlaceResults from "./PlaceResults";
import PlaceRegisterList from "./PlaceRegisterList";

export default function AddPlaceIndex() {
  const [map, setMap] = useState(null);
  const [places, setPlaces] = useState([]);
  const [registered, setRegistered] = useState([]);

  const searchPlaces = (keyword) => {
    if (!map) return;
    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(keyword, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setPlaces(data);
      } else {
        setPlaces([]);
      }
    });
  };

  const handleSelectPlace = (place) => {
    const latlng = new window.kakao.maps.LatLng(place.y, place.x);
    map.setCenter(latlng);

    setRegistered((prev) => [
      ...prev,
      {
        image: `https://via.placeholder.com/200x130?text=${encodeURIComponent(place.place_name)}`,
        description: place.place_name,
      },
    ]);
    setPlaces([]); // 검색 결과 숨김
  };

  return (
    <div>
      <PlaceSearch onSearch={searchPlaces} />
      <PlaceResults results={places} onSelect={handleSelectPlace} />
      <MapContainer onMapReady={setMap} />
      <PlaceRegisterList items={registered} />
    </div>
  );
}
