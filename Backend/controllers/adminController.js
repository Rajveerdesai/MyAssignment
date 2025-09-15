const { User, Store, Rating } = require('../models');
const { Op } = require('sequelize');

async function dashboard(req,res){
  try{
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();
    res.json({ totalUsers, totalStores, totalRatings });
  }catch(err){ console.error(err); res.status(500).json({ message: 'Server error' }); }
}

async function listUsers(req,res){
  try{
    const { name, email, address, role } = req.query;
    const where = {};
    if(name) where.name = { [Op.like]: `%${name}%` };
    if(email) where.email = { [Op.like]: `%${email}%` };
    if(address) where.address = { [Op.like]: `%${address}%` };
    if(role) where.role = role;
    const users = await User.findAll({ where, order: [['name','ASC']] });
    const result = await Promise.all(users.map(async u => {
      const obj = { id: u.id, name: u.name, email: u.email, address: u.address, role: u.role };
      if(u.role === 'owner'){
        const stores = await Store.findAll({ where: { ownerId: u.id }, include: [Rating] });
        let all = [];
        stores.forEach(s=>{ if(s.Ratings) all = all.concat(s.Ratings.map(r=>r.value)); });
        obj.rating = all.length ? Number((all.reduce((a,b)=>a+b,0)/all.length).toFixed(2)) : 0;
      }
      return obj;
    }));
    res.json({ users: result });
  }catch(err){ console.error(err); res.status(500).json({ message: 'Server error' }); }
}

module.exports = { dashboard, listUsers };
