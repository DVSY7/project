// 장소 검색 결과 렌더링 및 클릭 처리

export default function PlaceResults({ results, onSelect }) {
    if (!results.length) return null;
  
    return (
      <div className="bg-white border shadow-md max-h-60 overflow-y-auto">
        {results.map((place) => (
          <div
            key={place.id}
            className="px-4 py-2 border-b hover:bg-gray-100 cursor-pointer"
            onClick={() => onSelect(place)}
          >
            <div className="font-semibold">{place.place_name}</div>
            <div className="text-sm text-gray-500">{place.address_name}</div>
          </div>
        ))}
      </div>
    );
  }
  