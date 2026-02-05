module.exports = (sequelize, DataTypes) => {
  const Canteen = sequelize.define('Canteen', {
    Data: {
      type: DataTypes.JSON,
      allowNull: false
      // unique: true
    },
    
  });


  return Canteen;
};