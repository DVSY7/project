import React from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { ko } from 'date-fns/locale';
import styled from 'styled-components';

const DateRangeStep = ({ dateRange, setDateRange, onNext }) => {
  return (
    <Container>
      <Title>여행 일정을 선택해주세요</Title>
      <DateRangeWrapper>
        <DateRange
          ranges={[dateRange]}
          onChange={(item) => setDateRange(item.selection)}
          months={1}
          direction="horizontal"
          locale={ko}
          minDate={new Date()}
          rangeColors={['#FF385C']}
        />
      </DateRangeWrapper>
      <ButtonWrapper>
        <NextButton 
          onClick={onNext}
          disabled={!dateRange.startDate || !dateRange.endDate}
        >
          다음
        </NextButton>
      </ButtonWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #222222;
`;

const DateRangeWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 20px 0;
  
  .rdrCalendarWrapper {
    width: 100%;
  }
  
  .rdrDateDisplayWrapper {
    background-color: #fff;
  }
  
  .rdrDateDisplayItem {
    border: 1px solid #ddd;
  }
  
  .rdrDateDisplayItemActive {
    border-color: #FF385C;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const NextButton = styled.button`
  padding: 12px 24px;
  background-color: #FF385C;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #E31C5F;
  }

  &:disabled {
    background-color: #DDDDDD;
    cursor: not-allowed;
  }
`;

export default DateRangeStep; 