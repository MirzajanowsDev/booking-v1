import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const Post = ({ post = new Date().toISOString() }) => {
  const [elapsedTime, setElapsedTime] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Вычисление прошедшего времени
      const postTime = moment(post.date);
      const currentTime = moment();
      const duration = moment.duration(currentTime.diff(postTime));

      // Форматирование прошедшего времени в стиле Instagram
      let formattedTime = '';

      if (duration.asDays() >= 1) {
        formattedTime = moment(post.date).format('MMM D, YYYY');
      } else if (duration.asHours() >= 1) {
        formattedTime = Math.floor(duration.asHours()) + 'h';
      } else if (duration.asMinutes() >= 1) {
        formattedTime = Math.floor(duration.asMinutes()) + 'm';
      } else {
        formattedTime = Math.floor(duration.asSeconds()) + 's';
      }

      setElapsedTime(formattedTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [post.date]);

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>

      <p>Posted {elapsedTime} ago</p>
    </div>
  );
};
export default Post