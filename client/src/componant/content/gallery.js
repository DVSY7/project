// client/src/componant/content/gallery.js

import Masonry from 'react-masonry-css';
import { useEffect, useRef, useState } from 'react';
import GalleryHover from './ui/galleryHover';
import { galleryfetch } from './api/gallery';
import ShowGalleryModal from './ui/showGalleryModal';
import { galleryImageFetch } from './api/galleryImage';

export default function Gallery(props) {
  const { src, sort,searchUser } = props;
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [hoverIndex, setHoverIndex] = useState(null);
  const observerRef = useRef(null);
  // 갤러리 클릭 시 갤러리 클릭 상태 관리
  const [clickedGallery, setClickedGallery] = useState(null);
  // 갤러리 클릭 시 갤러리 이미지 상태관리
  const [galleryImage, setGalleryImage] = useState([]);

  const PAGE_SIZE = 15;

  const breakpointColumnsObj = {
    default: src === "profile" ? 3 : 5,
    1536: src === "profile" ? 3 : 5,
    1280: src === "profile" ? 2 : 4,
    1024: src === "profile" ? 1 : 3,
    768: src === "profile" ? 1 : 2,
    640: src === "profile" ? 1 : 1,
  };


  // 정렬 기준이 바뀔 때 상태 초기화
  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
  }, [sort, searchUser]);

  // 페이지 바뀔 때마다 데이터 가져오기
  useEffect(() => {
    const loadPage = async () => {
      const newItems = await galleryfetch(page, PAGE_SIZE, sort, searchUser);
      setItems(prev => [...prev, ...newItems]);
      if (newItems.length < PAGE_SIZE) {
        setHasMore(false);
      }
    };
    loadPage();
    console.log(items);
  }, [page,sort,searchUser]);

  // 무한스크롤: observer가 보이고, 더 가져올 게 있으면 page++
  useEffect(() => {
    if (!hasMore) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPage(p => p + 1);
      }
    }, { threshold: 1.0 });
    if (observerRef.current) obs.observe(observerRef.current);
    return () => obs.disconnect();
  }, [hasMore]);

  // 갤러리 클릭 시 데이터 가져오기
  const fetchGalleryImage = async (galleryID) => {
      return await galleryImageFetch(galleryID);
  }

  return (
    <div className={`
      h-full w-full sm:overflow-y-auto sm:p-4 sm:pr-8
      ${src === "profile" ? "2xl:w-[65%] w-[800px]" : ""}
    `}>
      {/* PC Masonry */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="hidden sm:flex gap-5"
        columnClassName="flex flex-col gap-5"
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            onMouseEnter={() => setHoverIndex(idx)}
            onMouseLeave={() => setHoverIndex(null)}
            className={`relative rounded-2xl overflow-hidden
              ${idx % 3 === 1 ? 'h-[500px]' : idx % 3 === 2 ? 'h-[400px]' : 'h-[300px]'}
            `}
          >
            <div className={`
              absolute inset-0 bg-black bg-opacity-50 z-10 text-white
              ${hoverIndex === idx ? 'opacity-100' : 'opacity-0'}
              transition-opacity duration-300
            `}>
              <GalleryHover
                id={item.id}
                title={item.title}
                username={item.username}
                profile_image={item.profile_image}
                date={item.date}
                likes={item.likes}
                views={item.views}
                location={item.location}
                clickedGallery={clickedGallery}
                setClickedGallery={setClickedGallery}
                index={idx}
                setGalleryImage={setGalleryImage}
                fetchGalleryImage={fetchGalleryImage}
              />  
            </div>
            {/* 갤러리 클릭 시 모달 띄우기 */}
            {clickedGallery === idx && (
              <ShowGalleryModal
                username={item.username}
                id={item.id}
                index = {idx}
                clickedGallery={clickedGallery}
                setClickedGallery={setClickedGallery}
                galleryImage={galleryImage}
              />
            )}
            
            <img
              className="w-full h-full object-cover"
              src={encodeURI(item.thumbnail_url)}
              alt={item.title}
            />
          </div>
        ))}
        {/* 무한스크롤 관찰 div */}
      </Masonry>
      {hasMore && <div ref={observerRef} className="h-1" />}

      {/* Mobile 뷰 */}
      <div className="block sm:hidden overflow-y-auto h-full">
        {items.map((item, idx) => (
          <div key={idx}>
            <div key={idx} className="mb-4">
              <img
                className="w-full h-[60vh] object-cover"
                src={encodeURI(item.thumbnail_url)}
                alt={item.title}
              />
            </div>
            <div className={`h-[23vh] w-screen`}></div>
          </div>

        ))}
      </div>
    </div>
  );
}
