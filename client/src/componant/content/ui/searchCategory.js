// client/src/componant/content/ui/searchCategory.js

export default function SearchCategory({ onSelect }) {
  const options = ['최신순', '지난순', '조회순', '인기순'];

  return (
    <>
      <div
        className={`flex flex-col justify-around items-center absolute w-[100px] h-[200px] bg-white z-20 translate-x-[-50px] translate-y-[20px] rounded-xl border-[1px] border-solid border-gray-500 font-sans font-bold text-xl`}
      >
        {options.map((option, idx) => (
          <div
            key={idx}
            data-value={option}
            onClick={(e) => onSelect(e.target.dataset.value)}
            className={`hover:bg-gray-200 w-full h-full flex justify-center items-center ${
              idx === 0
                ? 'rounded-xl'
                : idx === options.length - 1
                ? 'rounded-xl'
                : ''
            } `}
          >{option}</div>
        ))}
      </div>
    </>
  );
}
