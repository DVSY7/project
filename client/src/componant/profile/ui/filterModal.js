import FilterButton from "./filterButton";

export default function FilterModal() {
    const selectedOption = {
        option1: ["대면", "비대면"],
        option2: ["같이하기", "혼자하기"],
        option3: ["계획성", "비계획성"],
    };

    return (
        <div className="bg-red-300 w-[300px] h-[200px] absolute z-20 translate-x-[-250px]">
            {Object.entries(selectedOption).map(([key, options]) => (
                        <div key={key} className={`flex justify-between w-full mt-5 `}><FilterButton options={options}/></div>
            ))}
        </div>
    );
}
