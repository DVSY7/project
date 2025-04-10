import Footer from "./footer";
import Gallery from "./gallery";
import Header from "./header";

export default function Contents(){

    return (
        <>  
            {/* 검색창 */}
            <Header/>
            {/* 콘텐츠 */}
            <Gallery/>
            {/* 풋터 */}
            <Footer/>
            {/* (모바일)이미지 호버 */}
            {/* <div className={"sm:hidden flex-grow-4 bg-green-700"}>4</div> */}
        </>
    )
}