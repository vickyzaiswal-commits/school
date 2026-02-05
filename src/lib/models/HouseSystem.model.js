module.exports = (sequelize, DataTypes) => {
  const HouseSystem = sequelize.define('HouseSystem', {
    Data: {
      type: DataTypes.JSON,
      allowNull: false
      // unique: true
    },
    
  });


  return HouseSystem;
};