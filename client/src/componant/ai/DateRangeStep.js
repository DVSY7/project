import React from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { ko } from 'date-fns/locale';
import { addYears } from 'date-fns';

const DateRangeStep = ({ dateRange, setDateRange, onNext }) => {
  const today = new Date();
  const maxDate = addYears(today, 1); // 1년 후까지 선택 가능

  return (
    <div className="flex flex-col items-center p-5 w-full">
      <h2 className="text-2xl font-semibold mb-5 text-gray-800">
        여행 일정을 선택해주세요
      </h2>
      
      <div className="w-full max-w-[600px] my-5">
        <DateRange
          ranges={[dateRange]}
          onChange={(item) => setDateRange(item.selection)}
          months={2}
          direction="horizontal"
          locale={ko}
          minDate={today}
          maxDate={maxDate}
          rangeColors={['#FF385C']}
          className="w-full"
        />
      </div>

      <div className="w-full max-w-[600px] flex justify-end mt-5">
        <button
          onClick={onNext}
          disabled={!dateRange.startDate || !dateRange.endDate}
          className={`
            px-6 py-3 rounded-lg text-white font-medium text-base
            transition-colors duration-200
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
  );
};

export default DateRangeStep;
