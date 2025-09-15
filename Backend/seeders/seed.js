require('dotenv').config();
const bcrypt = require('bcrypt');
const { sequelize, User, Store } = require('../models');

async function seed(){
  try{
    await sequelize.sync({ force: true });
    const hash = await bcrypt.hash('Admin@123', 10);
    const admin = await User.create({ name: 'This is the default admin user name', email: 'admin@example.com', password: hash, role: 'admin', address: 'Admin address' });
    const ownerHash = await bcrypt.hash('Owner@123', 10);
    const owner = await User.create({ name: 'This is the store owner name 12345', email: 'owner@example.com', password: ownerHash, role: 'owner', address: 'Owner address' });
    const store = await Store.create({ name: 'Seed Store', email: 'store@example.com', address: 'Seed address', ownerId: owner.id });
    console.log('Seed completed, admin id:', admin.id, 'owner id:', owner.id);
    process.exit(0);
  }catch(err){ console.error(err); process.exit(1); }
}
seed();
