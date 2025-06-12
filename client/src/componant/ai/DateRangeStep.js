//client/src/componant/ai/DateRangeStep.js

import { useState } from 'react';
import React from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { ko } from 'date-fns/locale';
import { addMonths, addDays} from 'date-fns';

const DateRangeStep = ({ dateRange, setDateRange, onNext, onBack }) => {
  const today = new Date();
  const maxDate = addMonths(today, 6); // 1년 후까지 선택 가능

  const getMaxDate = () => {
    if(dateRange.startDate) {
      return addDays(dateRange.startDate, 9);
    }
    return maxDate;
  }  

  const handleNext = () => {
    onNext(dateRange);
  }

  return (
    <div className="bg-white rounded-lg w-[45%] h-[80%] max-w-full relative flex items-center justify-center">
    <div className="absolute flex flex-col items-center w-[87%] h-full py-16">
      <div className="flex items-center w-full relative">
        <button onClick={onBack} className='text-2xl py-4'>←</button>
        <h1 className="text-3xl  text-gray-800 absolute left-1/2 -translate-x-1/2">
          여행 기간이 어떻게 되시나요? 
        </h1>
      </div>
      <span className='text-center py-3 text-gray-500'>여행 일자는 최대 10일까지 설정 가능합니다.<br/>
      현지 여행 기간(여행지 도착 날짜, 여행지 출발 날짜)으로 입력해 주세요.</span>


      <div className="w-full h-full max-w-[800px]">
        <DateRange
          ranges={[dateRange]}
          onChange={(item) => setDateRange(item.selection)}
          months={2}
          direction="horizontal"
          locale={ko}
          minDate={today}
          maxDate={getMaxDate()}
          rangeColors={['#FF385C']}
          className="w-full h-full"
          monthDisplayFormat='yyyy년 M월'
          maxDateRange={10}
        />
      </div>

      <div className="w-full max-w-[800px] flex justify-end">
        <button
          onClick={handleNext}
          disabled={!dateRange.startDate || !dateRange.endDate}
          className={`
            px-6 py-3 rounded-lg text-white font-medium text-base
            transition-colors duration-200 w-full
            ${!dateRange.startDate || !dateRange.endDate
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-[#FF385C] hover:bg-[#E31C5F]'
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
