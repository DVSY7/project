import '../App.css';
import Footer from './content/footer';
import Header from './content/header';
import Menu from './menu';
import AIPlaceModal from './ai/AIPlaceModal';
import {useState} from 'react';

export default function AIManagement() {

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [filter, setFilter] = useState("전체");
  // 버튼 반복
  const buttons = ['전체','국내','해외']
  
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
          desc: "대한민국 경상북도에 위치한 경주는 ‘역사 도시’라는 말이 어울리는 곳입니다. 한때 신라의 수도였던 이곳은 도시 전체가 거대한 박물관이라 불릴 만큼 유적이 가득합니다. 불국사와 석굴암, 첨성대, 대릉원과 같은 문화재는 천년의 시간 속으로 여행자를 안내하고, 황리단길에서는 고즈넉한 한옥과 세련된 감성이 어우러진 새로운 분위기를 만날 수 있습니다. 고요함과 깊이를 느끼고 싶다면, 경주는 최고의 선택이 될 것입니다.",
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
  ]

  const filteredPlaces = places.filter(place => {
    if(filter === "전체") return true;
    if(filter === "국내") return place.domestic === true;
    if(filter === "해외") return place.domestic === false;
  })

  return (
    <>
      {/*가장 바깥영역 화면의 최대로 설정*/}
      <div className="grid grid-cols-1 grid-rows-9 sm:grid-rows-1 sm:grid-cols-sm-minmax sm:grid-cols-9 h-screen overflow-x-hidden">
        {/* 왼쪽: 가로 1 비율 (1/9) */}
        <Menu current_src={3}/>
        {/* 오른쪽: 가로 8 비율 (8/9) */}
        <div className=" flex flex-col flex-wrap row-span-9 sm:col-span-8 ">
            <Header/>
            
            <div className={`w-full h-[75%] p-4`}>
              {/* 버튼 배치 */}
              {buttons.map((button, index) => (
                <button key={index} className={` w-[8%] h-[5%] ${filter === button ? 'border-b-4 border-b-blue-500': ''}`}
                onClick={() => setFilter(button)}>
                  {button}
                </button>
              ))}
              {/* 여행지 나열 */}
              <div className='w-full h-[95%] grid grid-cols-5 gap-8 py-4'>
                {filteredPlaces.map((place, index) => (
                  <div key={index} className='relative bg-white rounded-xl shadow-lg h-60 transition-transform duration-200 hover:scale-105' onClick={()=>setSelectedPlace(place)}>
                    <img src={place.image} className='object-cover w-full h-[70%] rounded-t-lg' />
                    {place.isNew && (
                      <span className='absolute top-2 -right-1 bg-red-500 text-white px-2 py-1 rounded'>NEW</span>
                    )}
                    <div className='p-4'>
                      <div>{place.engName}</div>
                      <div>{place.korName}</div>
                    </div>
                  </div>
                  
                ))}
               <AIPlaceModal 
               open={!!selectedPlace}
               onClose={()=>setSelectedPlace(null)}
               place={selectedPlace}/>
              </div>
            </div>
            <Footer/>
        </div>
      </div>
    </>
  );
}