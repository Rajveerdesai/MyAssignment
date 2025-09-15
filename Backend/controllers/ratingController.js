const { Rating, Store, User } = require('../models');

async function submitRating(req,res){
  try{
    const user = req.user;
    const { storeId, value } = req.body;
    if(!storeId || !value) return res.status(400).json({ message: 'storeId and value required' });
    if(value < 1 || value > 5) return res.status(400).json({ message: 'Rating must be 1-5' });
    const store = await Store.findByPk(storeId);
    if(!store) return res.status(404).json({ message: 'Store not found' });
    const existing = await Rating.findOne({ where: { storeId, userId: user.id } });
    if(existing){ existing.value = value; await existing.save(); return res.json({ message: 'Rating updated', rating: existing }); }
    const rating = await Rating.create({ storeId, userId: user.id, value });
    res.status(201).json({ message: 'Rating created', rating });
  }catch(err){ console.error(err); res.status(500).json({ message: 'Server error' }); }
}

async function ownerRatings(req,res){
  try{
    const user = req.user;
    const stores = await Store.findAll({ where: { ownerId: user.id }, include: [{ model: Rating, include: [User] }] });
    const data = stores.map(s => {
      const ratings = s.Ratings || [];
      const avg = ratings.length ? (ratings.reduce((a,b)=>a+b.value,0)/ratings.length) : 0;
      return { storeId: s.id, name: s.name, averageRating: Number(avg.toFixed(2)), raters: ratings.map(r=>({ userId: r.userId, value: r.value, name: r.User?.name })) };
    });
    res.json({ stores: data });
  }catch(err){ console.error(err); res.status(500).json({ message: 'Server error' }); }
}

module.exports = { submitRating, ownerRatings };
