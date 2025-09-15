import React, { useEffect, useState } from 'react';
import API from '../api/api';

const OwnerDashboard = () => {
  const [ratings, setRatings] = useState([]);
  const [avg, setAvg] = useState(0);

  useEffect(() => {
    const fetchRatings = async () => {
      const res = await API.get('/owner/ratings');
      setRatings(res.data.ratings);
      setAvg(res.data.average);
    }
    fetchRatings();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Owner Dashboard</h2>
      <p>Average Rating: {avg.toFixed(2)}</p>
      <ul className="list-group">
        {ratings.map(r => (
          <li key={r.id} className="list-group-item">{r.userName} rated {r.rating}</li>
        ))}
      </ul>
    </div>
  );
};

export default OwnerDashboard;
