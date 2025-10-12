// client/src/componant/content/gallery.js

import Masonry from 'react-masonry-css';
import { useEffect, useRef, useState } from 'react';
import GalleryHover from './ui/galleryHover';
import { galleryfetch } from './api/gallery';
import ShowGalleryModal from './ui/showGalleryModal';
import { galleryImageFetch } from './api/galleryImage';
import ProfileModal from '../community/ui/profileModal';
import { fetchList } from '../community/api/fetchListAPI';
import { fetchIsLiked } from './api/likes';
import { useSearchParams } from 'react-router-dom';

export default function Gallery(props) {
  const { src, sort,searchUser,setSearchUser,profileInfo,name,userID} = props;
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [hoverIndex, setHoverIndex] = useState(null);
  const observerRef = useRef(null);
  // 갤러리 클릭 시 갤러리 클릭 상태 관리
  const [clickedGallery, setClickedGallery] = useState(null);
  // 갤러리 클릭 시 갤러리 이미지 상태관리
  const [galleryImage, setGalleryImage] = useState([]);

  // 갤러리 뷰 화면 데이터 상태관리
  const [galleryInfo, setGalleryInfo] = useState([]);

  // 프로필 옵션 선택 상태관리
  const [actionList, setActionList] = useState([]);

  // 친구 리스트
  const [friendList, setFriendList] = useState([]);
  // 차단 리스트
  const [blockedList, setBlockedList] = useState([]);
  // 좋아요 토글관리 스테이트
  const [isliked, setIsLiked] = useState();
  // url에 있는 유저 아이디
  const [searchParams] = useSearchParams();

  const PAGE_SIZE = 15;


  // 갤러리 프로필 이미지 클릭 시 상태관리
  const [clickedProfile, setClickedProfile] = useState({});

  const breakpointColumnsObj = {
    default: src === "profile" ? 3 : 5,
    1536: src === "profile" ? 3 : 5,
    1280: src === "profile" ? 2 : 4,
    1024: src === "profile" ? 1 : 3,
    768: src === "profile" ? 1 : 2,
    640: src === "profile" ? 1 : 1,
  };

  // 데이터 확인을 위한 코드
  useEffect(()=>{
    console.log({profileInfo:profileInfo});
  },[profileInfo]);

  useEffect(()=>{
    if(src === "profile" && searchParams.get("userID")){
      setSearchUser(searchParams.get("userID"));
      console.log("현재 검색중인 유저",searchUser);
    }else if(src === "profile"){
      setSearchUser(profileInfo.name);
    }
  },[profileInfo,searchUser])

  // 정렬 기준이 바뀔 때 상태 초기화
  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
  }, [sort, searchUser]);

  // 페이지 바뀔 때마다 데이터 가져오기
  const loadPage = async () => {
      const newItems = await galleryfetch(page, PAGE_SIZE, sort, searchUser);
      setItems(prev => [...prev, ...newItems]);
      if (newItems.length < PAGE_SIZE) {
        setHasMore(false);
      }
    };
  useEffect(() => {
    if(src==="home"){
      loadPage();
    }else if(src === "profile" && profileInfo.id !== 0){
      loadPage();
      console.log("profile Start");
    }
    console.log("profileUserInfo",profileInfo);
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

  useEffect(()=>{
    const getList = async ()=>{
      try{
        const friendData = await fetchList("friendList",name);
        const blockedData = await fetchList("blockList",name);
        setFriendList(friendData);
        setBlockedList(blockedData);
        console.log("데이터 요청 성공");
      }catch(error){
        console.log("데이터요청 에러:",error);
      }
    }
    getList();
  },[name])

  useEffect(()=>{
    console.log("userName:",blockedList);
    console.log("현재정보",items);
  },[friendList,blockedList]);

  // 좋아요 상태 요청
  useEffect(()=>{
    const fetchAllIsLiked = async ()=>{
      const likedState = await Promise.all(
        items.map((item) =>fetchIsLiked(item.id, userID[0]?.id??0))
      );
      setIsLiked(()=>likedState);
    };
    if(items.length > 0 && userID){
      fetchAllIsLiked();
    }
  },[items, userID]);

  if(Object.keys(items) > 0)return;

  return (
    <div className={`
      h-full w-full sm:overflow-y-auto sm:p-4 sm:pr-8
      ${src === "profile" ? "2xl:w-[65%] w-[800px]" : ""}
    `}>
      {items.length === 0 &&
      <div className={`h-full w-full flex justify-center items-center border-[1px] border-gray-200 rounded-2xl bg-gray-50`}>게시글이 존재하지 않습니다.</div>
      }
      {/* PC Masonry */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="hidden sm:flex gap-5"
        columnClassName="flex flex-col gap-5"
      >
        {items.map((item, idx) =>{
          return(
          <div
            key={`${item}${idx}`}
            onMouseEnter={() => {
              if(clickedProfile !== false){
                setHoverIndex(idx)
              }
            }}
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
              {isliked&& userID &&
              <GalleryHover
                id={item.friend_id}
                galleryID = {item.id}
                userID = {userID[0]?.id??0}
                title={item.title}
                name={name}
                username={item.username}
                profile_image={item.profile_image}
                date={item.date}
                likes={item.likes}
                isliked={isliked}
                setGalleryInfo={setGalleryInfo}
                views={item.views}
                location={item.location}
                clickedGallery={clickedGallery}
                setClickedGallery={setClickedGallery}
                index={idx}
                setGalleryImage={setGalleryImage}
                fetchGalleryImage={fetchGalleryImage}
                setClickedProfile = {setClickedProfile}
              />
              }
            </div>
            {/* 프로필 모달 */}
                    {console.log(item)}
                    <ProfileModal
                    clickedProfile = {clickedProfile}
                    setClickedProfile = {setClickedProfile}
                    friendList = {friendList}
                    blockedList = {blockedList}
                    chattingList = {[item]}
                    userID = {userID[0]?.id??0}
                    setActionList = {setActionList}
                    profile_image = {item.profile_image}
                    MemberKey = {item.id}
                    requestComponent = {"home"}
                    />  
                    {/* {console.log("현재정보:",item)} */}
            {/* 갤러리 클릭 시 모달 띄우기 */}
            {clickedGallery === idx && (
              <ShowGalleryModal
                username={item.name}
                title = {item.title}
                text = {item.text}
                galleryID={item.id}
                userID = {userID[0]?.id??0}
                index = {idx}
                clickedGallery={clickedGallery}
                setClickedGallery={setClickedGallery}
                galleryImage={galleryImage}
                galleryInfo={galleryInfo[idx]}
              />
            )}
            <img
              className="w-full h-full object-cover"
              src={encodeURI(item.thumbnail_url)}
              alt={item.title}
            />
          </div>
        )})}
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
