module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    value: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
  });

  Rating.associate = (models) => {
    Rating.belongsTo(models.User, { foreignKey: 'userId' });
    Rating.belongsTo(models.Store, { foreignKey: 'storeId' });
  };

  return Rating;
};
