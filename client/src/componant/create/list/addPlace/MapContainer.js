// 지도 렌더링 및 준비 완료 시 콜백 호출
import { useEffect, useRef } from "react";

export default function MapContainer({ onMapReady }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=API_KEY&libraries=services&autoload=false";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const center = new window.kakao.maps.LatLng(37.566826, 126.978656);
        const map = new window.kakao.maps.Map(mapRef.current, {
          center,
          level: 3,
        });
        onMapReady(map);
      });
    };
  }, [onMapReady]);

  return <div ref={mapRef} className="w-full h-[500px]" />;
}
