import ListAddPhoto from "./ListAddPhoto"


export default function AddButtons({ showExample, setShowExample }) {
    return (
        <div className="relative">
            <button className="bg-white border rounded py-1 px-4 text-gray-500 mr-1.5">
                장소 등록하기 +
            </button>
            <ListAddPhoto
                showExample={showExample}
                setShowExample={setShowExample}
            />
            <button className="bg-white border rounded py-1 px-4 text-gray-500 mr-1.5">
                메모 하기 +
            </button>

        </div>
    )

}