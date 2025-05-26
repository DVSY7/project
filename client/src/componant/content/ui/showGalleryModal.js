export default function ShowGalleryModal(props){
    const { username,setClickedGallery } = props;

    return(
        <>
            <div
            className={`flex justify-center items-center fixed bg-black bg-opacity-50 w-screen h-screen left-0 top-0 z-20`}
            >
                <div className={`w-[80vw] h-[90vh] rounded-2xl bg-white bg-opacity-100`}>
                    {/* 모달 닫기버튼 */}
                    <div 
                    
                    className={`flex justify-end mr-4 text-[1.5rem] h-[10%]`}>
                        <span
                        // 모달닫기 이벤트
                        onClick={() => setClickedGallery(null)}
                        className={`cursor-pointer text-gray-500 hover:text-black transition-colors duration-300`}
                        >X</span></div>
                    {/* 모달 요소 영역 */}
                    <div className={`flex justify-center items-center w-auto h-[90%]`}>{username}</div>
                </div>
            </div>
        </>
    )
}