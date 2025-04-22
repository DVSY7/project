import Masonry from 'react-masonry-css';
import { useEffect, useRef, useState } from 'react';
import GalleryHover from './utilities/galleryHover';

export default function Gallery(props) {

  // 갤러리를 마운트한 페이지의 src
  const { src } = props;

  const breakpointColumnsObj = {
    default: src === "profile" ? 3 : 5,
    1536: src === "profile" ? 3 : 5,
    1280: src === "profile" ? 2 : 4,
    1024: src === "profile" ? 1 : 3,
    768: src === "profile" ? 1 : 2,
    640: src === "profile" ? 1 : 1,
  };

  //갤러리 호버 상태관리 스테이트
  const [hoverIndex, setHoverIndex] = useState(null);

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
    <>
      <div className={` h-[100%] sm:h-[100%] sm:overflow-y-auto 2xl:overflow-x-hidden overflow-x-auto sm:p-4 sm:pr-8 ${src === "profile" ? "2xl:w-[65%] w-[800px]" : ""}`}>
        {/* ✅ PC화면 무한스크롤 */}
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="hidden sm:flex gap-5"
          columnClassName="flex flex-col gap-5"
        >
          {/* 갤러리 요소 영역 */}
          {items.map((i) => (
            <div
              key={i}
              onMouseLeave={() => { setHoverIndex(null) }}
              onMouseOver={() => { setHoverIndex(i) }}
              className={`relative bg-red-500 rounded-2xl text-white text-center overflow-hidden ${i % 3 === 1
                ? 'h-[500px]'
                : i % 3 === 2
                  ? 'h-[400px]'
                  : 'h-[300px]'
                }`}
            >
              {/* 갤러리 호버 요소 */}
                <div className={`absolute inset-0 z-10 bg-black bg-opacity-50 ${hoverIndex === i ? "opacity-100":" opacity-0" } transition-opacity duration-500`}>
                  <GalleryHover />
                </div>
              {/* 갤러리 이미지 요소 */}
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
    </>
  );
}
