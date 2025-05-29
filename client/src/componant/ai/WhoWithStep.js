import { useState } from "react";

export default function WhoWithStep({onNext, onBack}){

    const options = ["혼자", "친구와", "연인과", "배우자와", "아이와", "부모님과", "기타"];
    const [selected, setSelected] = useState(null);


    return(
        <div className="bg-white rounded-lg w-[45%] h-[80%] max-w-full relative flex items-center justify-center bg-blue-400">
        <div className="absolute flex flex-col items-center w-[87%] h-full py-16">

</div>
</div>
    );
};
