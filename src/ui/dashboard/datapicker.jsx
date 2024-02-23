import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DatePickerComponent = ({dateRange,setDateRange,state}) => {
  console.log(state);
  const rentPerNight = state.price
  const calculateTotalCost = () => {
    const startDate = dateRange[0];
    const endDate = dateRange[1];
    
    if (!startDate || !endDate) return 0; // Если даты не выбраны, вернем ноль
    
    const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)); // Вычисляем количество полных дней между датами
    const totalCost = totalDays * rentPerNight; // Рассчитываем общую стоимость
    
    return totalCost;
  };
  
  
  const handleDateChange = date => {
    setDateRange(date);
  };

  return (
    <div>
      <h2>Выберите даты пребывания:</h2>
      <Calendar
        
        selectRange={true}
        onChange={handleDateChange}
        value={dateRange}
        minDate={new Date()}
      />
          <h6 className=' text-body-tertiary'>Общая стоимость проживания: ${calculateTotalCost()}</h6>

    </div>
  );
};

export default DatePickerComponent;
