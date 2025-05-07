// components/create/list/ListAddPlace.js
import { useState } from "react";
import KakaoMap from "./KakaoMap"; // 이미 분리된 카카오맵 컴포넌트

export default function ListAddPlace() {
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="mt-2">

      {/* 카카오맵 영역 */}
      {showMap && (
        <div className="mt-4 w-full h-full border rounded overflow-hidden">
          <KakaoMap />
        </div>
      )}
      {/* 장소 등록 버튼 */}
      <button
        className="bg-white border rounded py-1 px-4 text-gray-500"
        onClick={() => setShowMap(!showMap)}
      >
        장소 등록하기 +
      </button>
    </div>
  );
}
