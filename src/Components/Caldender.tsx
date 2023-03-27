import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; //custom
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { pickedDate } from '../atom';

function Calender(){
  const [value, onChange] = useRecoilState(pickedDate);//Thu Mar 30 2023 00:00:00 GMT+0900 형식
  const date = moment(value).format("YYYY년 MM월 DD일");
  return (
    <>
    <CaldendarContainer>
      <Calendar 
        className="react-calendar"
        onChange={onChange} value={value}
        formatDay={(locale, date) => moment(date).format("DD")}
        showNeighboringMonth={false}
        />
    </CaldendarContainer>
    </>
  )
}
export default Calender;
const CaldendarContainer = styled.div`
  margin: 15px 0px;
  @import url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2210-EF@1.0/EF_watermelonSalad.woff2');
  .react-calendar { 
    border: none;
    width: 300px;
    max-width: 100%;
    background-color: #fff;
    color: #222;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    font-family: 'EF_watermelonSalad';
    font-family: 'Noto Sans KR', sans-serif;
    line-height: 1.125em;
    //오늘표시 변경하기
    .react-calendar__tile--now {
    background: #EF9F9F; //오늘 표시 색
    border-radius: 50%;
    abbr {
      color: #fff;
    }
    }
    .react-calendar__tile--now:enabled:hover,
    .react-calendar__tile--now:enabled:focus {
      color: #fff;
    }
    //년월표시 
    .react-calendar__navigation__label > span {
    font-size:  15px;
    font-weight: 700;
    color: #EF9F9F;
    }
    //day 타일모양
    .react-calendar__tile {
    height: 40px;
      abbr {
        @import url('https://fonts.googleapis.com/css2?family=Commissioner:wght@500&display=swap');
        color: ${(props) => props.theme.textColor};
        font-family: 'Commissioner', sans-serif;
        font-weight: 500;
      }
    }
    //day hover시
    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus {
    background-color: #DAE2B6;
    border-radius: 50%;
    abbr {
      color: #fff;
    }
  }
  //day 선택시
  .react-calendar__tile--active {
    background-color: #F47C7C;
    border-radius: 50% ;
    abbr {
      color: #fff;
      font-weight: 700;
    }
  }
  .react-calendar__month-view__weekdays {
    background: #323435;
    abbr { /*월,화,수... 글자 부분*/
      color: ${(props) => props.theme.textColor};
      font-size: 1rem;
      font-weight: 800;
      text-decoration: none;
    }
  }
  //네이게이션버튼
  .react-calendar__navigation {
    margin: 0;
  }
  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
    color: #F47C7C;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: transparent;
  }
  }
`;