//client/src/componant/profile/ui/filterButton.js

export default function FilterButton(props){
    // 컴포넌트에 전달받은 옵션
    const {options,optionKey, filterOptions, setFilterOptions } = props;

    const isClicked = filterOptions[optionKey];
    
    const toggleClick = () => {
        
        setFilterOptions(prev => ({
            ...prev,
            [optionKey]: prev[optionKey] === options[0] ? options[1] : options[0],
        }))
    }
    return (
        <>
            <div
                key={optionKey}
                onClick={toggleClick}
                className={`w-[40px] h-[12px] ${isClicked === options[1] ? "bg-blue-200" : "bg-gray-300"} transition-colors duration-1000 rounded-2xl ml-8 cursor-pointer`}
            >
                <div className={`${isClicked === options[1] ? "clicked-before translate-x-[60%]" : ""} transition-transform duration-500 galleryhover-before`} />
            </div>
            <div className={`${isClicked !== options[1] ? "opacity-100" : "opacity-50"} flex-1 ml-8 transition-opacity duration-500`}>{options[0]}</div>
            <div className={`${isClicked === options[1] ? "opacity-100" : "opacity-50"} flex flex-1 justify-start mr-8 transition-opacity duration-500`}>{options[1]}</div>
        </>
    );
}