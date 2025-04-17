import {useState} from "react";
import Menu from "./menu.js";

export default function CreateList() {
  const [isPlanned, setIsPlanned] = useState(true); // 계획형인지 여부
  const [Group, setGroup] = useState(true); 
  const [Offline, setOffline] = useState(true); // 대면인지 여부
  
  return (
    <>
      {/*가장 바깥영역 화면의 최대로 설정*/}
      <div className="grid grid-cols-1 grid-rows-9 sm:grid-rows-1 sm:grid-cols-sm-minmax sm:grid-cols-9 h-screen overflow-x-hidden">
        {/* 왼쪽: 가로 1 비율 (1/9) */}
        <Menu current_src={5} />
        {/* 오른쪽: 가로 8 비율 (8/9) */}
        <div className=" flex flex-col flex-wrap bg-green-200 row-span-9 sm:col-span-8 ">
          <div className="flex items-center justify-center w-full h-full">
            <div
              className={`w-[95%] h-[93%] rounded-3xl grid grid-cols-[3fr_2fr]  bg-white`}
            >
              {/* 왼쪽쪽 영역 */}
              <div className="grid grid-rows-[1fr_6.5fr_0.5fr] p-4 pl-10">
                {/* 상단 영역 */}
                <div className="flex grid grid-rows-[0.5fr_1fr]">
                  <div className="flex-1 flex items-center justify-between">
                    <div className="sm:text-xl text-lg">20xx.MM.DD</div>
                    <div>
                      <button className="mr-2 border px-4 py-0.5 rounded" onClick={() => setIsPlanned(!isPlanned)}>
                        {isPlanned ? "계획형" : "자유형"}
                      </button>
                      <button className="mr-2 border px-4 py-0.5 rounded" onClick={() => setGroup(!Group)}>
                        {Group ? "같이하기" : "혼자하기"}
                      </button>
                      {/*Group이 true일 때만 인원 셀렉트 박스 렌더링*/}
                      {Group && (
                      <select className="mr-2 h-[30px] w-16 rounded border">
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                      )}
                      <button className="border px-4 py-0.5 rounded" onClick={() => setOffline(!Offline)}>
                        {Offline ? "대면" : "비대면"}
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center justify-between">
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
                      <select className="flex items-center justify-center W-40 h-8 text-center rounded text-sm">
                        <option value="" disabled>
                          테마
                        </option>
                        <option value="여행 & 탐험">여행 & 탐험</option>
                        <option value="도전 & 어드벤처">도전 & 어드벤처</option>
                        <option value="자기계발 & 교육">자기계발 & 교육</option>
                        <option value="건강 & 운동">건강 & 운동</option>
                        <option value="문화 & 예술">문화 & 예술</option>
                        <option value="요리 & 미식">요리 & 미식</option>
                        <option value="봉사 & 나눔">봉사 & 나눔</option>
                        <option value="취미 & 라이프">취미 & 라이프</option>
                      </select>
                    </div>
                  </div>
                </div>
                {/* 중간 영역 */}
                <div className="grid grid-rows-[1fr_10fr]">
                  <div className="flex text-gray-300 font-semibold border-t">
                    <button>일차 추가 +</button>
                  </div>
                  <div>
                    <button className="bg-white border rounded py-1 px-4 text-gray-500 mr-1.5">
                      장소 등록하기 +
                    </button>
                    <button className="bg-white border rounded py-1 px-4 text-gray-500 mr-1.5">
                      사진 첨부하기 +
                    </button>
                    <button className="bg-white border rounded py-1 px-4 text-gray-500 mr-1.5">
                      메모 하기 +
                    </button>
                  </div>
                </div>
                {/* 하단 영역 */}
                <div>
                  <div className="text-lg text-gray-500">#태그 +</div>
                </div>
              </div>
              {/* 오른쪽 영역 */}
              <div className="border-l grid grid-rows-[2.5fr_3fr_0.5fr]  overflow-hidden">
                {/* 상단 영역: 지도영역 */}
                <div className="bg-red-200">
                  지도
                </div>
                {/* 중간 영역: 텍스트 입력란 */}
                <div className=" flex items-center justify-center">
                  <textarea className="w-[90%] h-[90%] border rounded p-2 resize-none"
                  placeholder="소개 글을 자유롭게 입력하세요">
                    
                  </textarea>
                </div>
                {/* 끝 영역: 텍스트 입력란 */}
                <div className="flex justify-end items-center">
                      <button className="bg-blue-500 text-white h-10 mr-8 px-3 rounded-xl">등록하기</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
