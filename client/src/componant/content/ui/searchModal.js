//client/src/componant/content/ui/searchModal.js


export const SearchModal = ({setSearchUser,setSearchValues,searchModalValues,searchValues}) => {
    const visibleModal = searchValues ? "block" : "hidden";
    return (
        <>
            <div className={`${visibleModal} absolute ml-20 top-[65%] bg-white min-w-[330px] max-h-[180px] border-[1px] border-gray-200 shadow-lg z-20 rounded-md overflow-y-scroll cursor-pointer`}>
                {searchModalValues.map((info,idx)=>(
                    <div
                        key={`searchModal${idx}`}
                        data-value={`${info.username}`} 
                        onClick={(e) => {setSearchUser(info.username); setSearchValues(""); console.log(e.target.dataset.value)}}
                        className={`flex items-center h-[60px] pl-2 hover:bg-gray-200`}>
                        <img className={`w-[40px] h-[40px] rounded-[50%] pointer-events-none`} src={`${info.profile_image}`}/>
                        <span className={`pl-2 pointer-events-none`}>{info.name}({info.username})</span>
                    </div>
                ))}
            </div>
        </>
    )
}
