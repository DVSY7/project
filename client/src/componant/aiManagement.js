import "../App.css";
import Footer from "./content/footer";
import Header from "./content/header";
import Menu from "./menu";
import { useState,useEffect } from "react";
import MultiStepPlanModal from "./ai/MultiStepPlanModal";
import { checkedToken } from "./function/checkedToken";

export default function AIManagement() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [filter, setFilter] = useState("전체");
  const [planResult, setPlanResult] = useState(null);
  const [planLoading, setPlanLoading] = useState(false);
  const [dayPlaceList, setDayPlaceList] = useState([]); // 일차별 장소 리스트
  const [debugPrompt, setDebugPrompt] = useState("");
  const [debugRawResponse, setDebugRawResponse] = useState("");
  const [selectedDay, setSelectedDay] = useState(0); // 0: 1일차, 1: 2일차, ...
  const [name,setName] = useState("");
  const [userName, setUsername] = useState("");
  // 사용자가 선택한 정보를 저장할 상태 추가
  const [userSelections, setUserSelections] = useState(null);
  // MultiStepPlanModal의 step 상태 추가
  const [step, setStep] = useState(1);
  // 버튼 반복
  const buttons = ["전체", "국내", "해외"];
  const GPTAPIKEY = process.env.REACT_APP_GPT_API_KEY;


  // 토큰으로 유저 정보 요청
  useEffect(()=>{
      const getUserInfo = async()=>{
        try{
          await checkedToken(setUsername, setName);
        }catch(error){
          console.error(error);
        }
      }
      getUserInfo();
    },[])

  const places = [
    {
      engName: "OSAKA",
      korName: "일본 오사카",
      desc: "일본 간사이 지역의 중심지인 오사카는 '먹다가 망한다'는 말이 있을 정도로 다양한 먹거리로 유명한 도시입니다. 도톤보리 거리의 화려한 네온사인과 활기찬 분위기는 여행자들에게 잊지 못할 인상을 남기며, 타코야키와 오코노미야키 같은 길거리 음식은 이곳의 상징이기도 합니다. 역사적인 오사카성과 유니버설 스튜디오 재팬 등 볼거리도 풍부하며, 교토·고베와도 가까워 일본 여행의 거점으로도 제격입니다. 전통과 현대가 어우러진 도시, 오사카에서 특별한 하루를 시작해보세요.",
      image: "/images/osaka.jpg",
      domestic: false,
      isNew: true,
    },
    {
      engName: "TOKYO",
      korName: "일본 도쿄",
      desc: "일본의 수도 도쿄는 전통과 첨단이 공존하는 다채로운 도시입니다. 화려한 네온사인과 초고층 빌딩이 늘어선 시부야, 신주쿠, 롯폰기 같은 번화가부터, 아사쿠사와 메이지 신궁 등 고즈넉한 전통 명소까지 다양한 매력을 품고 있습니다. 세계적인 쇼핑 거리 하라주쿠와 긴자, 애니메이션의 성지 아키하바라 등 도쿄는 취향 따라 즐길 수 있는 테마가 넘쳐나는 도시입니다. 낮과 밤이 모두 다채롭게 빛나는 도쿄에서, 당신만의 여행을 완성해보세요.",
      image: "/images/tokyo.jpg",
      domestic: false,
      isNew: true,
    },
    {
      engName: "FUKUOKA",
      korName: "일본 후쿠오카",
      desc: "규슈 북부에 위치한 후쿠오카는 일본에서도 따뜻한 기후와 온화한 분위기로 사랑받는 도시입니다. 하카타역을 중심으로 펼쳐진 도시에는 쇼핑, 온천, 역사 유적지가 균형 있게 어우러져 있으며, 대표적인 명물인 하카타 라멘과 나카스의 포장마차 거리는 미식가들의 천국입니다. 바다를 품은 도시는 부산과 가까워 페리로도 이동할 수 있으며, 여행 초보자에게도 부담 없이 즐길 수 있는 매력적인 일본 여행지입니다.",
      image: "/images/fukuoka.jpg",
      domestic: false,
      isNew: false,
    },
    {
      engName: "JEJU",
      korName: "대한민국 제주",
      desc: "대한민국의 최남단에 위치한 제주도는 천혜의 자연경관과 고유한 문화를 간직한 아름다운 섬입니다. 사계절 내내 색다른 매력을 선사하며, 유네스코 세계자연유산으로 등재된 한라산을 비롯해 성산일출봉, 협재해변, 우도 등 다양한 명소가 여행객을 맞이합니다. 맑은 공기와 에메랄드빛 바다, 현무암으로 둘러싸인 돌담길은 일상의 스트레스를 잊게 해주며, 흑돼지, 고기국수 같은 지역 음식도 놓칠 수 없는 즐거움입니다. 여유로운 힐링 여행을 원한다면, 제주도는 최고의 선택입니다.",
      image: "/images/jeju.jpg",
      domestic: true,
      isNew: false,
    },
    {
      engName: "BUSAN",
      korName: "대한민국 부산",
      desc: "대한민국 제2의 도시이자 대표적인 해양도시인 부산은 아름다운 해변과 다채로운 문화가 공존하는 곳입니다. 해운대, 광안리, 송정 같은 해변은 여름철 수많은 사람들로 활기를 띠며, 자갈치시장, 국제시장 등에서는 활어회와 길거리 음식으로 여행의 재미를 더합니다. 밤이 되면 광안대교의 야경이 바다 위를 수놓고, 감천문화마을이나 해동용궁사 같은 인생샷 명소도 가득합니다. 역동적인 바다 도시의 매력을 원한다면 부산은 최고의 선택입니다.",
      image: "/images/busan.jpg",
      domestic: true,
      isNew: false,
    },
    {
      engName: "SEOUL",
      korName: "대한민국 서울",
      desc: "대한민국의 수도 서울은 수천 년의 역사를 품은 고궁들과 세계적인 트렌드를 선도하는 현대 도시가 절묘하게 조화를 이루는 곳입니다. 경복궁, 창덕궁 같은 궁궐과 한옥마을에서는 전통의 아름다움을 느낄 수 있고, 홍대, 강남, 성수동에서는 최신 유행과 개성 넘치는 문화를 체험할 수 있습니다. 편리한 대중교통과 무한한 볼거리, 먹거리로 가득한 서울은 한 번 와보면 다시 찾고 싶은 매력을 지닌 도시입니다.",
      image: "/images/seoul.jpg",
      domestic: true,
      isNew: false,
    },
    {
      engName: "PARIS",
      korName: "프랑스 파리",
      desc: "프랑스의 수도 파리는 전 세계 여행자들의 로망이자 유럽 여행의 상징입니다. 에펠탑, 루브르 박물관, 노트르담 대성당 등 세계적인 명소들이 도심 곳곳에 자리하고 있으며, 세느강을 따라 걷는 것만으로도 영화 속 주인공이 된 듯한 기분을 느낄 수 있습니다. 고급스러운 패션과 감성적인 카페 문화, 베이커리 향기까지… 파리는 감각적인 여행을 원하는 이들에게 완벽한 도시입니다. 낭만과 예술을 온몸으로 느끼고 싶다면 파리로 떠나보세요.",
      image: "/images/paris.jpg",
      domestic: false,
      isNew: false,
    },
    {
      engName: "GYEONGJU",
      korName: "대한민국 경주",
      desc: "대한민국 경상북도에 위치한 경주는 '역사 도시'라는 말이 어울리는 곳입니다. 한때 신라의 수도였던 이곳은 도시 전체가 거대한 박물관이라 불릴 만큼 유적이 가득합니다. 불국사와 석굴암, 첨성대, 대릉원과 같은 문화재는 천년의 시간 속으로 여행자를 안내하고, 황리단길에서는 고즈넉한 한옥과 세련된 감성이 어우러진 새로운 분위기를 만날 수 있습니다. 고요함과 깊이를 느끼고 싶다면, 경주는 최고의 선택이 될 것입니다.",
      image: "/images/gyeongju.jpg",
      domestic: true,
      isNew: false,
    },
    {
      engName: "LONDON",
      korName: "영국 런던",
      desc: "영국의 수도 런던은 수백 년의 역사를 품은 건축물과 세계적인 트렌드를 이끄는 현대 문화가 공존하는 도시입니다. 버킹엄 궁전, 런던 타워, 웨스트민스터 사원은 고풍스러운 영국의 정수를 보여주며, 대영박물관과 내셔널갤러리 같은 미술관은 무료로 세계의 예술을 만날 수 있는 기회를 제공합니다. 트렌디한 쇼디치 거리, 템즈강을 따라 펼쳐진 야경, 그리고 잊지 못할 뮤지컬 공연까지—런던은 매 순간이 감동으로 채워지는 도시입니다.",
      image: "/images/london.jpg",
      domestic: false,
      isNew: false,
    },
    {
      engName: "GANGNEUNG",
      korName: "대한민국 강릉",
      desc: "동해안의 대표 여행지 강릉은 아름다운 해변과 깊은 자연이 어우러진 도시입니다. 정동진과 경포대, 안목 해변은 해돋이 명소로 유명하며, 바다를 바라보며 마시는 커피는 그 자체로 힐링입니다. 또한 오죽헌, 선교장 같은 전통 문화유산과 강릉단오제 같은 지역 축제도 강릉만의 매력을 더합니다. 사계절 내내 다른 매력을 보여주는 강릉은 짧은 여행에도 마음을 채워주는 특별한 도시입니",
      image: "/images/gangneung.jpg",
      domestic: true,
      isNew: false,
    },
  ];

  const filteredPlaces = places.filter((place) => {
    if (filter === "전체") return true;
    if (filter === "국내") return place.domestic === true;
    if (filter === "해외") return place.domestic === false;
  });

  // 카카오맵 키워드 검색 함수
  async function searchKakaoPlace(keyword) {
    const res = await fetch(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(
        keyword
      )}`,
      {
        headers: {
          Authorization: "KakaoAK e3edda565841b375880733ac67c7e2f8",
        },
      }
    );
    const data = await res.json();
    return data.documents[0]; // 가장 첫번째 결과 반환
  }

  // AI 추천 결과 enrich + 일차별 분배
  async function handleAIResultToDays(aiRecommendations, startDate, endDate) {
    // 여행 일수 계산
    const daysCount = Math.max(
      1,
      Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1
    );
    // 카카오맵 enrich
    const enriched = [];
    for (const rec of aiRecommendations) {
      const kakaoInfo = await searchKakaoPlace(rec.name);
      if (kakaoInfo) {
        enriched.push({
          ...rec,
          address: kakaoInfo.road_address_name || kakaoInfo.address_name,
          phone: kakaoInfo.phone,
          category: kakaoInfo.category_name,
          image: kakaoInfo.place_url,
        });
      } else {
        enriched.push(rec);
      }
    }
    // 일차별 분배
    const result = Array.from({ length: daysCount }, () => []);
    enriched.forEach((item, idx) => {
      result[idx % daysCount].push(item);
    });
    setDayPlaceList(result);
    
    // 첫 번째로 장소가 있는 일차를 자동으로 선택
    const firstDayWithPlaces = result.findIndex(dayPlaces => dayPlaces.length > 0);
    if (firstDayWithPlaces !== -1) {
      setSelectedDay(firstDayWithPlaces);
    }
  }

  // 여행계획 완료 시 ChatGPT 호출
  const handlePlanComplete = async (userSelections) => {
    // 사용자 선택 정보 저장
    setUserSelections(userSelections);
    
    setPlanLoading(true);
    setPlanResult(null);
    setDayPlaceList([]);
    try {
      const prompt = `사용자가 다음과 같이 여행을 계획했습니다.\n- 여행지: ${
        userSelections.place?.korName
      }\n- 동행자: ${
        userSelections.companion
      }\n- 여행 기간: ${userSelections.date?.startDate?.toLocaleDateString()} ~ ${userSelections.date?.endDate?.toLocaleDateString()}\n- 일정 스타일: ${(
        userSelections.prefer || []
      ).join(", ")}
      ${
        userSelections.style?.includes("빼곡한 일정")
          ? "- 사용자는 하루에 여러 장소(최소 3곳 이상)를 방문하고 다양한 활동을 경험하는 **빼곡한 일정**을 선호합니다. 각 날짜별로 최소 5곳 이상 추천해주세요."
          : userSelections.style?.includes("널널한 일정")
          ? "- 사용자는 여유로운 여행을 선호하며, 하루에 1~2곳 정도의 장소를 방문하고 충분한 휴식 시간을 가지는 **널널한 일정**을 원합니다. 각 날짜별로 1~2곳 정도로 추천해주세요. 너무 적게 추천하지 마세요."
          : ""
      }
      \n\n위 조건에 맞는 여행 일정(장소, 추천 활동 등)을 JSON 형식으로 추천해주세요. 여행 일수에 맞춰 충분한 수의 장소를 추천해주세요. 예를 들어 3일 여행이면 최소 6-9곳, 5일 여행이면 최소 10-15곳을 추천해주세요. 이전과 다른 새로운 장소들을 추천해주세요.\n응답 예시:\n{\n  \"recommendations\": [\n    {\n      \"name\": \"장소명\",\n      \"description\": \"설명\",\n      \"address\": \"주소\",\n      \"activity\": \"추천 활동\"\n    }\n  ]\n}`;

      setDebugPrompt(prompt); // 프롬프트 저장
      setStep(1);

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${GPTAPIKEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
          }),
        }
      );
      const data = await response.json();
      const content = data.choices[0].message.content;
      setDebugRawResponse(content); // 원본 응답 저장
      let aiList = [];
      console.log(debugRawResponse);
      try {
        const parsed = JSON.parse(content);
        aiList = parsed.recommendations || [];
        setPlanResult(aiList);
      } catch (e) {
        setPlanResult([]);
        alert("AI 결과 파싱 오류!");
      }
      // 카카오맵 enrich + 일차별 분배
      if (
        aiList.length > 0 &&
        userSelections.date?.startDate &&
        userSelections.date?.endDate
      ) {
        await handleAIResultToDays(
          aiList,
          new Date(userSelections.date.startDate),
          new Date(userSelections.date.endDate)
        );
      }
    } catch (e) {
      setPlanResult([]);
      alert("AI 추천 호출 오류!");
    } finally {
      setPlanLoading(false);
    }
  };

  // 다시 생성하기 기능
  const handleRegenerate = async () => {
    if (!userSelections) {
      alert("재생성할 정보가 없습니다.");
      return;
    }
    
    setPlanLoading(true);
    setPlanResult(null);
    setDayPlaceList([]);
    
    // 여행 일수 계산
    const daysCount = Math.max(
      1,
      Math.ceil((new Date(userSelections.date.endDate) - new Date(userSelections.date.startDate)) / (1000 * 60 * 60 * 24)) + 1
    );
    
    // 일수에 따른 최소 추천 장소 수 계산
    const minPlaces = daysCount * 2; // 최소 하루 2곳
    const maxPlaces = daysCount * 3; // 최대 하루 3곳
    
    try {
      const prompt = `사용자가 다음과 같이 여행을 계획했습니다.\n- 여행지: ${
        userSelections.place?.korName
      }\n- 동행자: ${
        userSelections.companion
      }\n- 여행 기간: ${userSelections.date?.startDate?.toLocaleDateString()} ~ ${userSelections.date?.endDate?.toLocaleDateString()} (${daysCount}일)\n- 일정 스타일: ${(
        userSelections.prefer || []
      ).join(", ")}
      ${
        userSelections.style?.includes("빼곡한 일정")
          ? "- 사용자는 하루에 여러 장소(최소 3곳 이상)를 방문하고 다양한 활동을 경험하는 **빼곡한 일정**을 선호합니다. 각 날짜별로 최소 5곳 이상 추천해주세요."
          : userSelections.style?.includes("널널한 일정")
          ? "- 사용자는 여유로운 여행을 선호하며, 하루에 1~2곳 정도의 장소를 방문하고 충분한 휴식 시간을 가지는 **널널한 일정**을 원합니다. 각 날짜별로 1~2곳 정도로 추천해주세요. 너무 적게 추천하지 마세요."
          : ""
      }
      \n\n위 조건에 맞는 여행 일정(장소, 추천 활동 등)을 JSON 형식으로 추천해주세요. ${daysCount}일 여행이므로 최소 ${minPlaces}곳에서 ${maxPlaces}곳 정도의 장소를 추천해주세요. 이전과 다른 새로운 장소들을 추천해주세요.\n응답 예시:\n{\n  \"recommendations\": [\n    {\n      \"name\": \"장소명\",\n      \"description\": \"설명\",\n      \"address\": \"주소\",\n      \"activity\": \"추천 활동\"\n    }\n  ]\n}`;

      setDebugPrompt(prompt); // 프롬프트 저장
      setStep(1);

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${GPTAPIKEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.8, // 더 다양한 결과를 위해 temperature를 높임
          }),
        }
      );
      const data = await response.json();
      const content = data.choices[0].message.content;
      setDebugRawResponse(content); // 원본 응답 저장
      let aiList = [];
      try {
        const parsed = JSON.parse(content);
        aiList = parsed.recommendations || [];
        setPlanResult(aiList);
      } catch (e) {
        setPlanResult([]);
        alert("AI 결과 파싱 오류!");
      }
      // 카카오맵 enrich + 일차별 분배
      if (
        aiList.length > 0 &&
        userSelections.date?.startDate &&
        userSelections.date?.endDate
      ) {
        await handleAIResultToDays(
          aiList,
          new Date(userSelections.date.startDate),
          new Date(userSelections.date.endDate)
        );
      }
    } catch (e) {
      setPlanResult([]);
      alert("AI 추천 재생성 오류!");
    } finally {
      setPlanLoading(false);
    }
  };

  // AI 추천 결과를 리스트에 적용하는 기능
  const handleApplyToCreateList = () => {
    if (!dayPlaceList || dayPlaceList.length === 0) {
      alert("적용할 AI 추천 결과가 없습니다.");
      return;
    }

    // dayPlaceList를 리스트 형식으로 변환
    const convertedItems = {};
    
    dayPlaceList.forEach((dayPlaces, dayIndex) => {
      if (dayPlaces.length > 0) {
        const dayKey = `${dayIndex + 1}일차`;
        convertedItems[dayKey] = dayPlaces.map((place, placeIndex) => ({
          description: place.name,
          type: "place",
          address: place.address || "",
          category: place.category || "",
          placeId: place.id || "",
          phone: place.phone || "",
          placeUrl: place.place_url || place.image || "",
          x: place.x || "",
          y: place.y || "",
          id: Date.now() + placeIndex, // 고유 ID 생성
          activity: place.activity || ""
        }));
      }
    });

    // localStorage에 저장하여 리스트 생성 페이지에서 사용할 수 있도록 함
    localStorage.setItem('aiRecommendedItems', JSON.stringify(convertedItems));
    localStorage.setItem('aiRecommendedTitle', `${userSelections.place?.korName} AI 추천 여행`);
    localStorage.setItem('aiRecommendedDescription', `${userSelections.place?.korName}에서 ${userSelections.companion}와 함께하는 ${userSelections.style?.join(', ') || ''} 여행`);
    
    // 리스트 생성 페이지로 이동
    window.location.href = '/createList';
  };

  return (
    <>
      {/*가장 바깥영역 화면의 최대로 설정*/}
      <div className="grid grid-cols-1 grid-rows-9 sm:grid-rows-1 sm:grid-cols-sm-minmax sm:grid-cols-9 h-screen overflow-x-hidden">
        {/* 왼쪽: 가로 1 비율 (1/9) */}
        <Menu current_src={3} />
        {/* 오른쪽: 가로 8 비율 (8/9) */}
        <div className=" flex flex-col flex-wrap row-span-9 sm:col-span-8 ">
          <Header src={3} name={name} username={userName}/>

          <div className={`w-full h-[75%] p-4`}>
            {/* 버튼 배치 */}
            {buttons.map((button, index) => (
              <button
                key={index}
                className={` w-[8%] h-[5%] ${
                  filter === button ? "border-b-4 border-b-blue-500" : ""
                }`}
                onClick={() => setFilter(button)}
              >
                {button}
              </button>
            ))}
            {/* 여행지 나열 */}
            <div className="w-full h-[95%] grid grid-cols-5 gap-8 py-4">
              {filteredPlaces.map((place, index) => (
                <div
                  key={index}
                  className="relative bg-white rounded-xl shadow-lg h-64 transition-transform duration-200 hover:scale-105"
                  onClick={() => setSelectedPlace(place)}
                >
                  <img
                    src={place.image}
                    className="object-cover w-full h-[75%] rounded-t-lg"
                  />
                  {place.isNew && (
                    <span className="absolute top-2 -right-1 bg-red-500 text-white px-2 py-1 rounded">
                      NEW
                    </span>
                  )}
                  <div className="px-4 py-2">
                    <div>{place.engName}</div>
                    <div>{place.korName}</div>
                  </div>
                </div>
              ))}
              <MultiStepPlanModal
                open={!!selectedPlace}
                onClose={() => setSelectedPlace(null)}
                place={selectedPlace}
                onComplete={handlePlanComplete}
                step={step}
                setStep={setStep}
              />
            </div>
          </div>
          <Footer />
        </div>
      </div>
      {/* AI 추천 결과 팝업 */}
      {planLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-xl font-bold">
            AI 여행 일정 생성 중...
          </div>
        </div>
      )}

      {/* {planResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[600px] max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">AI 추천 여행 일정</h3>
            <div className="space-y-4">
              {planResult.length === 0 ? (
                <div>추천 결과가 없습니다.</div>
              ) : (
                planResult.map((item, idx) => (
                  <div key={idx} className="border rounded p-4">
                    <h4 className="font-bold text-lg">{item.name}</h4>
                    <p className="mt-2">{item.description}</p>
                    <p className="text-sm text-gray-500 mt-1">{item.address}</p>
                    <div className="mt-2 text-sm">{item.activity}</div>
                  </div>
                ))
              )}

            </div>
            <button
              onClick={() => setPlanResult(null)}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              닫기
            </button>
          </div>
        </div>
      )} */}

      {dayPlaceList.length > 0 && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-[44%] h-[78%] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            {/* 제목 */}
            <div className="px-8 pt-8 pb-2 flex justify-between items-start">
              <h2 className="text-2xl font-bold text-gray-800">AI 여행 추천 일정</h2>
              {/* 닫기 버튼 */}
              <button
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
                onClick={() => {
                  setDayPlaceList([]);
                  setUserSelections(null);
                  setPlanResult(null);
                }}
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {/* 일차별 탭 */}
            <div className="flex gap-2 px-8 pb-4 bg-white sticky top-0 z-10">
              {dayPlaceList.map((dayPlaces, idx) => 
                // 장소가 있는 일차만 탭으로 표시
                dayPlaces.length > 0 ? (
                  <button
                    key={idx}
                    className={`px-5 py-2 rounded-full font-semibold transition-colors duration-200
                      ${selectedDay === idx
                        ? "bg-[#357ae8] text-white shadow"
                        : "bg-gray-100 text-gray-700 hover:bg-blue-100"}`}
                    onClick={() => setSelectedDay(idx)}
                  >
                    {idx + 1}일차
                  </button>
                ) : null
              )}
            </div>
            {/* 선택된 일차의 장소 리스트 */}
            <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar">
              {!dayPlaceList[selectedDay] || dayPlaceList[selectedDay].length === 0 ? (
                <div className="text-gray-400 text-center py-20">추천 장소 없음</div>
              ) : (
                <div className="space-y-4">
                  {dayPlaceList[selectedDay].map((place, pidx) => (
                    <div
                      key={pidx}
                      className="flex items-center gap-5 bg-[#f7fafd] rounded-xl shadow-sm p-4 hover:shadow-lg transition-shadow"
                    >
                      <img
                        src={"/images/장소준비중.png"}
                        alt="등록된 이미지"
                        className="w-20 h-20 object-cover rounded-lg border"
                      />
                      {console.log(place.image)}
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-lg truncate">{place.name}</div>
                        <div className="text-gray-600 text-sm truncate">{place.address}</div>
                        <div className="text-gray-500 text-xs">{place.category}</div>
                        <div className="text-blue-800 text-xs">{place.phone}</div>
                        <div className="text-xs mt-1 line-clamp-2">{place.description}</div>
                        {(place.id || place.place_url) && (
                          <a
                            href={place.id ? `https://place.map.kakao.com/${place.id}` : place.place_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline text-xs mt-1 inline-block"
                          >
                            상세보기
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* 오른쪽 하단 버튼 영역 */}
            <div className="flex justify-end gap-3 px-8 pb-6">
              <button
                className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                  userSelections 
                    ? "bg-gray-200 text-gray-700 hover:bg-gray-300" 
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
                onClick={handleRegenerate}
                disabled={!userSelections}
              >
                다시 생성하기
              </button>
              <button
                className="bg-[#6ea8fd] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#357ae8] transition-colors duration-200"
                onClick={handleApplyToCreateList}
              >
                적용하기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
