import React from 'react';

const RatingStars = ({ rating=0, onRate }) => {
  return (
    <div>
      {[1,2,3,4,5].map(star => (
        <span key={star} style={{cursor:'pointer', color: star <= rating ? 'gold':'grey'}}
          onClick={() => onRate(star)}>
          ★
        </span>
      ))}
    </div>
  );
};

export default RatingStars;
