import Masonry from 'react-masonry-css';
import { useEffect, useRef, useState } from 'react';

export default function Gallery() {
  const breakpointColumnsObj = {
    default: 5,
    1536: 5,
    1280: 4,
    1024: 3,
    768: 2,
    640: 1,
  };

  const [items, setItems] = useState([...Array(30).keys()]);
  const observerRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const target = observerRef.current; // 💡 여기에 저장
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setItems((prev) =>
            prev.concat(Array.from({ length: 15 }, (_, i) => prev.length + i))
          );
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      }
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target); // ✅ 안정적으로 cleanup
    };
  }, [items, windowWidth]); // ← 이건 유지해도 됨

  return (
    <div className="h-[75%] sm:h-[75%] sm:overflow-y-auto overflow-x-hidden sm:p-4 sm:pr-8">
      {/* ✅ PC화면 무한스크롤 */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="hidden sm:flex gap-5"
        columnClassName="flex flex-col gap-5"
      >
        {items.map((i) => (
          <div
            key={i}
            className={`bg-red-500 rounded-2xl text-white text-center ${
              i % 3 === 1
                ? 'h-[500px]'
                : i % 3 === 2
                ? 'h-[400px]'
                : 'h-[300px]'
            }`}
          >
            <img
              className="w-full h-full object-cover rounded-2xl"
              src={`/images/이미지 (${i + 1}).jpg`}
              alt="이미지"
            ></img>
          </div>
        ))}
        {/* 👇 무한 스크롤 감시 대상 요소 */}
        <div ref={observerRef} className="h-]" />
      </Masonry>

      {/* ✅ 모바일화면 고정 리스트 */}
      <div className="block sm:hidden h-full overflow-y-auto overflow-x-hidden">
        {Array.from({ length: 100 }, (_, i) => (
          <div key={i}>
            <div className="bg-gray-200 h-[500px] w-screen ">
              <img
                className="w-full h-full object-cover"
                src={`/images/이미지 (${i + 1}).jpg`}
                alt="이미지"
              ></img>
            </div>
            <div className=" h-[23vh] w-screen"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
