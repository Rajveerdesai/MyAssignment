const { Store, Rating } = require('../models');
const { Op } = require('sequelize');

async function createStore(req,res){
  try{
    const { name, email, address, ownerId } = req.body;
    if(!name || !email) return res.status(400).json({ message: 'Name and email required' });
    const exists = await Store.findOne({ where: { email } });
    if(exists) return res.status(400).json({ message: 'Store email exists' });
    const store = await Store.create({ name, email, address, ownerId: ownerId || null });
    res.status(201).json({ message: 'Store created', store });
  }catch(err){ console.error(err); res.status(500).json({ message: 'Server error' }); }
}

async function listStores(req,res){
  try{
    const { q, page=1, limit=20, sortBy='name', sortDir='ASC' } = req.query;
    const where = {};
    if(q) where[Op.or] = [{ name: { [Op.like]: `%${q}%` } }, { address: { [Op.like]: `%${q}%` } }];
    const stores = await Store.findAll({ where, order: [[sortBy, sortDir]], limit: parseInt(limit), offset: (page-1)*limit, include: [Rating] });
    const result = stores.map(s => {
      const ratings = s.Ratings || [];
      const avg = ratings.length ? (ratings.reduce((a,b)=>a+b.value,0)/ratings.length) : 0;
      return { id: s.id, name: s.name, email: s.email, address: s.address, overallRating: Number(avg.toFixed(2)) };
    });
    res.json({ stores: result });
  }catch(err){ console.error(err); res.status(500).json({ message: 'Server error' }); }
}

module.exports = { createStore, listStores };
