import BucketList from "../profile/bucketlist";
import Miniprofile from "../profile/miniprofile";
import Footer from "./footer";
import Gallery from "./gallery";
import Header from "./header";
import {useState,useEffect} from "react";

export default function Contents(props) {
    // 콘텐츠를 마운트한 페이지의 src,username
    const { src,name,username,userID } = props;
    // 선택된 정렬기준
    const [sort, setSort] = useState("최신순");
    // 검색된 유저
    const [searchUser, setSearchUser] = useState("");
    // 프로필 페이지 유저정보 상태관리
    const [profileInfo, setProfileInfo] = useState({name:name, id:userID[0].id});
    // 북마크 상태관리 스테이트
    const [clickedBookmark, setClickedBookmark] = useState([]);

    useEffect(()=>{
        console.log(sort+1);
    },[sort]);

    return (
        <>
            {/* 검색창 */}
            <Header 
                src = {window.location.pathname}
                username = {username}
                name = {name}
                setSort={setSort}
                setSearchUser={setSearchUser}
            />
            {/* 콘텐츠 */}
            <div className="flex h-[75%]">

                {/* 프로필 페이지로 접근 시 */}
                <div className={`${src === "profile" ? "sm:flex" : "sm:hidden"} sm:flex-col hidden sm:w-[35%]`}>
                    <div className={`h-[35%] 2xl:w-full w-[400px] flex justify-center`}>
                        <Miniprofile 
                            name={name} 
                            id={userID} 
                            setSearchUser={setSearchUser}
                            setProfileInfo={setProfileInfo}
                            clickedBookmark={clickedBookmark}
                        />
                    </div>
                    <div className={`flex justify-center items-end h-[65%] 2xl:w-full w-[400px]`}>
                        {userID&&
                            <BucketList
                            currentUserID={userID}
                            clickedBookmark={clickedBookmark}
                            setClickedBookmark={setClickedBookmark}
                        />
                        }
                    </div>
                </div>
                <Gallery 
                src={src}
                sort={sort}
                searchUser={searchUser}
                setSearchUser={setSearchUser}
                profileInfo = {profileInfo}
                name = {name}
                userID = {userID}
                />
            </div>
            {/* 풋터 */}
            <Footer />
            {/* (모바일)이미지 호버 */}
            {/* <div className={"sm:hidden flex-grow-4 bg-green-700"}>4</div> */}
        </>
    )
}