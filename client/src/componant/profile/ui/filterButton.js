export default function FilterButton(props){
    const {options} = props;
    return(
            <>
                <div className={`w-[70px] h-[20px] bg-gray-300 rounded-2xl ml-8 `}></div>
                <div className={`flex-1 ml-8`}>{options[0]}</div>
                <div className={`flex flex-1 justify-start mr-8`}>{options[1]}</div>
            </>
    )
}