import React, { useEffect, useState } from 'react';
import API from '../api/api';
import RatingStars from '../components/RatingStars';

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState({}); // { storeId: userRating }

  useEffect(() => {
    const fetchStores = async () => {
      const res = await API.get('/stores');
      setStores(res.data);
    }
    fetchStores();
  }, []);

  const handleRate = async (storeId, rating) => {
    await API.post(`/rating/${storeId}`, { rating });
    setRatings({...ratings, [storeId]: rating});
  }

  return (
    <div className="container mt-5">
      <h2>Stores</h2>
      {stores.map(store => (
        <div key={store.id} className="card p-3 mb-3">
          <h5>{store.name}</h5>
          <p>{store.address}</p>
          <p>Overall Rating: {store.averageRating || 0}</p>
          <p>Your Rating:</p>
          <RatingStars rating={ratings[store.id] || 0} onRate={(r) => handleRate(store.id, r)} />
        </div>
      ))}
    </div>
  );
};

export default StoreList;
