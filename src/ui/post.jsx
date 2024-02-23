import React, { useState, useEffect } from 'react';

const Post = ({ timestamp }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    // Функция для обновления времени с течением времени
    const updateRelativeTime = () => {
      const currentTime = new Date();
      const postTime = new Date(timestamp);
      const timeDifference = currentTime - postTime;

      // Проверяем, прошло ли более месяца с момента публикации
      const millisecondsInMonth = 30 * 24 * 60 * 60 * 1000;
      if (timeDifference >= millisecondsInMonth) {
        setTimeAgo('Более месяца назад');
        return; // Прекращаем обновление времени
      }

      // Преобразование времени в формат "несколько секунд назад", "несколько минут назад" и т. д.
      const seconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      let relativeTime = '';
      if (days > 0) {
        relativeTime = `${days} дней назад`;
      } else if (hours > 0) {
        relativeTime = `${hours} часов назад`;
      } else if (minutes > 0) {
        relativeTime = `${minutes} минут назад`;
      } else {
        relativeTime = `${seconds} секунд назад`;
      }

      setTimeAgo(relativeTime);
    };

    // Обновление времени каждые 10 секунд (вы можете настроить это значение по своему усмотрению)
    const intervalId = setInterval(updateRelativeTime, 10000);

    // Сразу вызываем функцию для первоначальной установки времени
    updateRelativeTime();

    // Очищаем интервал при размонтировании компонента
    return () => clearInterval(intervalId);
  }, [timestamp]);

  return (
    <div>
      <p>{timeAgo}</p>
    </div>
  );
};

export default Post;
