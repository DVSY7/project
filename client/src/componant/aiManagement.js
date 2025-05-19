import '../App.css';
import Footer from './content/footer';
import Header from './content/header';
import Menu from './menu';

export default function AIManagement() {
  // 버튼 반복
  const buttons = ['전체','국내','해외']
  
  const places = [
    {
      name:"OSAKA",
      country:"일본 오사카",
      image:"osaka.jpg",
      isNew: true,
    },
    {
      name:"TOKYO",
      country:"일본 도쿄",
      image:"tokyo.jpg",
      isNew: true,
    },
    {
      name:"FUKUOKA",
      country:"일본 후쿠오카",
      image:"fukuoka.jpg",
      isNew: false,
    },
    {
      name:"JEJU",
      country:"대한민국 제주",
      image:"jeju.img",
      isNew:"false",
    },
    {
      name:"JEJU",
      country:"대한민국 제주",
      image:"jeju.img",
      isNew:"false",
    },
    {
      name:"JEJU",
      country:"대한민국 제주",
      image:"jeju.img",
      isNew:"false",
    },
    {
      name:"JEJU",
      country:"대한민국 제주",
      image:"jeju.img",
      isNew:"false",
    },
    {
      name:"JEJU",
      country:"대한민국 제주",
      image:"jeju.img",
      isNew:"false",
    },
    {
      name:"JEJU",
      country:"대한민국 제주",
      image:"jeju.img",
      isNew:"false",
    },
    {
      name:"JEJU",
      country:"대한민국 제주",
      image:"jeju.img",
      isNew:"false",
    },
  ]

  return (
    <>
      {/*가장 바깥영역 화면의 최대로 설정*/}
      <div className="grid grid-cols-1 grid-rows-9 sm:grid-rows-1 sm:grid-cols-sm-minmax sm:grid-cols-9 h-screen overflow-x-hidden">
        {/* 왼쪽: 가로 1 비율 (1/9) */}
        <Menu current_src={3}/>
        {/* 오른쪽: 가로 8 비율 (8/9) */}
        <div className=" flex flex-col flex-wrap row-span-9 sm:col-span-8 ">
            <Header/>
            
            <div className={`w-full h-[75%] bg-blue-300 p-4`}>
              {/* 버튼 배치 */}
              {buttons.map((button, index) => (
                <button key={index} className={`bg-white w-[8%] h-[5%]`}>
                  {button}
                </button>
              ))}
              {/* 여행지 나열 */}
              <div className='w-full h-[95%] grid grid-cols-5 bg-gray-300 gap-8 py-4'>
                {places.map((place, index) => (
                  <div key={index} className='relative bg-white rounded-xl shadow-lg h-60'>
                    <img src={place.image} className='object-cover w-full' />
                    {place.isNew && (
                      <span className='absolute top-2 -right-1 bg-red-500 text-white px-2 py-1 rounded'>NEW</span>
                    )}
                    <div className='p-4'>
                      <div>{place.name}</div>
                      <div>{place.country}</div>
                    </div>
                  </div>
                  
                ))}
               
              </div>
            </div>
            <Footer/>
        </div>
      </div>
    </>
  );
}