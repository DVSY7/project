import { useParams } from "react-router-dom";


export default function DayDetails() {
    //URL에서 날짜 가져오기
    const { day } = useParams();

    return (<div><h1>{day}의 상세페이지</h1></div>);
}