//client/src/componant/content/ui/searchModal.js
import { useSearchParams } from "react-router-dom";

export const SearchModal = ({setSearchUser,setSearchValues,searchModalValues,searchValues}) => {
    const visibleModal = searchValues ? "block" : "hidden";
    const [searchParams, setSearchParams] = useSearchParams();
    return (
        <>
            <div className={`${visibleModal} absolute ml-20 top-[65%] bg-white min-w-[330px] max-h-[180px] border-[1px] border-gray-200 shadow-lg z-20 rounded-md overflow-y-scroll cursor-pointer`}>
                {searchModalValues.map((info,idx)=>(
                    <div
                        key={`searchModal${idx}`}
                        data-value={`${info.username}`} 
                        onClick={() => {
                            // 현재의 파라미터에 저장된 값을 가져옴
                            const userID = searchParams.get("userID");
                            // 검색할 값과 파라미터가 동일하면 아무일도 일어나지 않음
                            if(userID !== info.userID){
                                searchParams.set("username",info.name); 
                                searchParams.set("userID",info.userID);
                                setSearchParams(searchParams);
                            }
                            setSearchUser(info.userID);
                            setSearchValues("");
                        }}
                        className={`flex items-center h-[60px] pl-2 hover:bg-gray-200`}>
                        <img className={`w-[40px] h-[40px] rounded-[50%] pointer-events-none`} src={`${info.profile_image}`}/>
                        <span className={`pl-2 pointer-events-none`}>{info.name}({info.username})</span>
                    </div>
                ))}
            </div>
        </>
    )
}
