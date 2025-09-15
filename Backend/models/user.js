module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: { type: DataTypes.STRING(60), allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    address: { type: DataTypes.STRING(400), allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('admin','user','storeowner'), allowNull: false },
  });

  User.associate = (models) => {
    User.hasMany(models.Rating, { foreignKey: 'userId' });
  };

  return User;
};
