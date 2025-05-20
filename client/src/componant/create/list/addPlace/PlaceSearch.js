// 검색 입력과 실행

import { useState } from "react";

export default function PlaceSearch({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    if (keyword.trim()) onSearch(keyword);
  };

  return (
    <div className="flex gap-2 p-2 bg-white shadow-md">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="flex-1 p-2 border rounded"
        placeholder="장소를 검색하세요"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 rounded"
      >
        검색
      </button>
    </div>
  );
}
