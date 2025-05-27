import React from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";   //react-date-range 라이브러리에서 제공하는 기본 스타일(CSS)을 불러옵니다
import "react-date-range/dist/theme/default.css";  //react-date-range의 기본 테마 스타일을 불러옵니다
import { ko } from 'date-fns/locale'; //날짜 관련 라이브러리인 **date-fns**에서 한국어(ko) 로케일을 불러옵니다.\

export default function DateRangeStep({ dateRange, setDateRange, onNext }) {
    return (
        <div className="flex flex-col items-center p-5 w-full">
            <h2>여행 일정을 선택해주세요</h2>
            <div>
                <DateRange 
                ranges={[dateRange]} //선택된 날짜의 범위 설정
                onChange={(item) => setDateRange(item.selection)}
                months={1}  //한번에 보여주는 달의 개수
                direction="horizontal" //달력을 수평방향으로
                locale={ko} //한국어 설정
                minDate={new Date} //오늘 이전의 날짜 선택 불가
                rangeColors={['#FF385C']} //선택된 날짜의 색상 설정
                />
            </div>

            <div>
                <button onClick={onNext}>다음</button>
            </div>
        </div>
    )

}
