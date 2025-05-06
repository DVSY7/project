export default function TitleAndSelectInterest({
    selectInterest,
    selectedInterest,
    setSelectedInterest,
}) {
  return (
    <div className="flex-1 flex items-center justify-between border-b">
      <div className="flex gap-2">
        <img
          src="/images/미니프로필.png"
          alt="미니 프로필"
          className="w-10 h-10"
        />
        <div className="text-2xl flex items-center font-semibold font-sans">
          <input
            type="text"
            placeholder="ex) 암벽등반하기"
            className="focus:outline-none focus:ring-2"
          ></input>
        </div>
      </div>
      <div>
        <select
        value={selectedInterest}
        onChange={(e) => setSelectedInterest(e.target.value)}
        className="flex items-center justify-center w-40 h-8 text-center rounded text-sm">
          <option value="" disabled>
            테마
          </option>

          {/* 테마선택 항목 반복문 */}
          {selectInterest.map((interest, i) => {
            return (
              <option key={i} value={interest}>
                {interest}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
