import BucketList from "../profile/bucketlist";
import Miniprofile from "../profile/miniprofile";
import Footer from "./footer";
import Gallery from "./gallery";
import Header from "./header";

export default function Contents(props) {
    // 콘텐츠를 마운트한 페이지의 src
    const { src,username } = props;

    return (
        <>
            {/* 검색창 */}
            <Header 
                username = {username}
            />
            {/* 콘텐츠 */}
            <div className="flex h-[75%]">

                {/* 프로필 페이지로 접근 시 */}
                <div className={`${src === "profile" ? "sm:flex" : "sm:hidden"} sm:flex-col hidden sm:w-[35%]`}>
                    <div className={`h-[35%] 2xl:w-full w-[400px] flex justify-center`}><Miniprofile/></div>
                    <div className={`flex justify-center items-end h-[65%] 2xl:w-full w-[400px]`}><BucketList/></div>
                </div>
                <Gallery src={src} />
            </div>
            {/* 풋터 */}
            <Footer />
            {/* (모바일)이미지 호버 */}
            {/* <div className={"sm:hidden flex-grow-4 bg-green-700"}>4</div> */}
        </>
    )
}