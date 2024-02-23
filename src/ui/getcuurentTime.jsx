import React from 'react'

const GetCurrentTime = ({action,timestamp}) => {
        const now = new Date();
        const date = new Date(timestamp);
        const diff = now - date;
        const oneDay = 24 * 60 * 60 * 1000;
        
        if (diff < oneDay) {
          return 'сегодня';
        } else if (diff < 2 * oneDay) {
          return 'вчера';
        } else if (diff < 7 * oneDay) {
          return 'эта неделя';
        } else if (date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
          return 'этот месяц';
        } else {
          return date.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });
        }
      
      
      // Проход по всем элементам и вывод относительного времени
      
       
      
  
}

export default GetCurrentTime