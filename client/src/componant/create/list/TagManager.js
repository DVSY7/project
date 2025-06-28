export default function TagManager({
  tags,
  setTags,
  showInput,
  setShowInput,
  currentTag,
  setCurrentTag,
  editingIndex,
  setEditingIndex,
  editingTag,
  setEditingTag,
  handleAddTag,
  handleEditTag,
  handleDeleteTag,
  handleKeyPress,
}) {
  return (
    <div className="text-lg text-gray-500 flex items-center gap-2 flex-wrap">
      {/* 기존 태그 표시 */}
      {tags.map((tag, i) => (
        <div key={i} className="relative flex items-center gap-2">
          {editingIndex === i ? (
            // 수정 중인 태그 입력 필드
            <input
              type="text"
              className="border rounded px-2 py-1"
              value={editingTag}
              onChange={(e) => setEditingTag(e.target.value)}
              onKeyPress={handleKeyPress}
              onBlur={handleEditTag} // 입력 필드 외부 클릭 시 수정 완료
              autoFocus
            />
          ) : (
            // 태그 표시
            <span
              className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full cursor-pointer"
              onClick={() => {
                setEditingIndex(i); // 수정 중인 태그 인덱스 설정
                setEditingTag(tag); // 수정 중인 태그 값 설정
              }}
            >
              {tag}
            </span>
          )}
          {/* 삭제 버튼 */}
          <button
            className="absolute -top-0.5 right-0 text-white text-[10px] font-thin font-sans bg-red-500 rounded-full w-3.5 h-3.5 flex items-center justify-center leading-none"
            onClick={() => handleDeleteTag(i)}
          >
            x
          </button>
        </div>
      ))}

      {/* 새 태그 입력 필드 */}
      {showInput ? (
        <input
          type="text"
          className="border rounded px-2 py-1 focus:outline-none"
          placeholder="#태그 입력"
          value={currentTag}
          onChange={(e) => setCurrentTag(e.target.value)}
          onKeyPress={handleKeyPress}
          onBlur={() => {
            if(currentTag.trim() !== ""){
              handleAddTag();
            } else{
              setShowInput(false);
            }
          }} // 입력 필드 외부 클릭 시 태그 추가
          autoFocus
        />
      ) : (
        // + 버튼
        <button
          className="text-gray-400 border rounded-full w-8 h-8 flex items-center justify-center"
          onClick={() => setShowInput(true)}
        >
          +
        </button>
      )}
    </div>
  );
}
