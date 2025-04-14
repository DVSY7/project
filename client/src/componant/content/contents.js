import Footer from "./footer";
import Gallery from "./gallery";
import Header from "./header";

export default function Contents(props) {
    // 콘텐츠를 마운트한 페이지의 src
    const { src } = props;

    return (
        <>
            {/* 검색창 */}
            <Header />
            {/* 콘텐츠 */}
            <div className="flex h-[75%]">
                <div className={`${src === "profile" ? "sm:flex" : "sm:hidden"} hidden w-[50%] bg-red-300`}>fdsf</div>
                <Gallery src={src} />
            </div>
            {/* 풋터 */}
            <Footer />
            {/* (모바일)이미지 호버 */}
            {/* <div className={"sm:hidden flex-grow-4 bg-green-700"}>4</div> */}
        </>
    )
}