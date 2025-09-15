const sequelize = require('../config/db');
const User = require('./user')(sequelize, require('sequelize').DataTypes);
const Store = require('./store')(sequelize, require('sequelize').DataTypes);
const Rating = require('./rating')(sequelize, require('sequelize').DataTypes);

// associations
User.hasMany(Rating, { foreignKey: 'userId', onDelete: 'CASCADE' });
Rating.belongsTo(User, { foreignKey: 'userId' });

Store.hasMany(Rating, { foreignKey: 'storeId', onDelete: 'CASCADE' });
Rating.belongsTo(Store, { foreignKey: 'storeId' });

Store.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });

module.exports = { sequelize, User, Store, Rating };
