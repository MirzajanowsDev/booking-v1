import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function RentApartment() {
  const [startDate, setStartDate] = useState(new Date());
  const [paymentType, setPaymentType] = useState('month'); // По умолчанию оплата в месяц

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };

  return (
    <div>   
    
      <h2>Выберите тип оплаты:</h2>
      <select value={paymentType} onChange={handlePaymentTypeChange}>
        <option value="month">В месяц</option>
        <option value="day">В день</option>
      </select>
      <div>
        <p>Дата начала аренды: {startDate.toDateString()}</p>
        <p>Тип оплаты: {paymentType === 'month' ? 'В месяц' : 'В день'}</p>
      </div>
    </div>
  );
}

export default RentApartment;
