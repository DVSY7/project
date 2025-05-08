// 등록된 장소 목록 출력

export default function PlaceRegisterList({ items }) {
    return (
      <div className="mt-4 max-h-[600px] overflow-y-auto">
        {items.map((item, idx) => (
          <div key={idx} className="flex mb-4 bg-gray-200 rounded-lg h-36">
            <img
              src={item.image}
              alt=""
              className="ml-2 w-48 h-32 object-cover rounded"
            />
            <div className="p-4">{item.description}</div>
          </div>
        ))}
      </div>
    );
  }
  