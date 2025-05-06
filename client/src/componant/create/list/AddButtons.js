import ListAddPhoto from "./ListAddPhoto"

<<<<<<< HEAD

export default function AddButtons({
    showExample,
    setShowExample,
}) {

=======
export default function AddButtons({ showExample, setShowExample }) {
>>>>>>> cfbaadb88114d38586a22a92aab7caec85349ab4
    return (
        <div>
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
<<<<<<< HEAD
        </div>
    )
=======
        </div>)
>>>>>>> cfbaadb88114d38586a22a92aab7caec85349ab4
}