module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define('Store', {
    name: { type: DataTypes.STRING(60), allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING(400), allowNull: false },
    ownerId: { type: DataTypes.INTEGER, allowNull: true }, // <-- change here to true
  });

  Store.associate = (models) => {
    Store.belongsTo(models.User, { foreignKey: 'ownerId', as: 'owner', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    Store.hasMany(models.Rating, { foreignKey: 'storeId' });
  };

  return Store;
};
