import React from 'react';
import './Hotel.css'; // Подключаем стили

function Hotel() {
  return (
    <div className="hotel-container">
      <div className="hotel-block">
        <h2>Начальная оплата 50% </h2>
        <p>Можно с картами Mbank,VISA</p>

        <p></p>

      </div>
      <div className="hotel-block">
        <h2>Бесплатный wifi<i class="fa-solid fa-wifi mx-2"></i></h2>
      </div>
      <div className="hotel-block">
        <h2>Вид на горы <i class="fa-solid fa-mountain-sun"></i></h2>
        <p>Удобства: сауна, кафе, кинозал</p>
      </div>
    </div>
  );
}

export default Hotel;
