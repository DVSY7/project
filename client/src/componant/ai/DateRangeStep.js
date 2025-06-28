//client/src/componant/ai/DateRangeStep.js

import { useState } from "react";
import React from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { ko } from "date-fns/locale";
import { addMonths, addDays } from "date-fns";

const DateRangeStep = ({
  dateRange,
  setDateRange,
  onNext,
  onBack,
  onClose,
}) => {
  const today = new Date();
  const maxDate = addMonths(today, 6); // 1년 후까지 선택 가능

  const getMaxDate = () => {
    if (dateRange.startDate) {
      return addDays(dateRange.startDate, 9);
    }
    return maxDate;
  };

  const handleNext = () => {
    onNext(dateRange);
  };

  return (
    <div className="bg-white rounded-lg w-[45%] h-[80%] max-w-full relative flex items-center justify-center">
      <div className="absolute flex flex-col items-center w-[87%] h-full py-16 justify-between">
        <div className="basis-1/8 w-full flex flex-col items-center">
          <div className="flex justify-between w-full">
            <button onClick={onBack} className="text-2xl">
              ←
            </button>
            {/* x닫기 버튼 */}
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
              onClick={onClose}
            >
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="basis-3/8 w-full flex flex-col items-center">
          <div className="text-3xl text-gray-800">
            여행 기간이 어떻게 되시나요?
          </div>
          <span className="text-center py-3 text-gray-500">
            여행 일자는 최대 10일까지 설정 가능합니다.
            <br />
            현지 여행 기간(여행지 도착 날짜, 여행지 출발 날짜)으로 입력해 주세요.
          </span>
        </div>
        
        <div className="basis-3/8 w-full flex justify-center">
          <div className="w-full h-full max-w-[800px]">
            <DateRange
              ranges={[dateRange]}
              onChange={(item) => setDateRange(item.selection)}
              months={2}
              direction="horizontal"
              locale={ko}
              minDate={today}
              maxDate={getMaxDate()}
              rangeColors={["#6ea8fd"]}
              className="w-full h-full"
              monthDisplayFormat="yyyy년 M월"
              maxDateRange={10}
            />
          </div>
        </div>

        <div className="basis-1/8 w-full flex flex-col justify-end">
          <button
            onClick={handleNext}
            disabled={!dateRange.startDate || !dateRange.endDate}
            className={`
            px-6 py-3 rounded-lg text-white font-medium text-base
            transition-colors duration-200 w-full
            ${
              !dateRange.startDate || !dateRange.endDate
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#6ea8fd] hover:bg-[#357ae8]"
            }
          `}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateRangeStep;
