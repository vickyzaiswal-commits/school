module.exports = (sequelize, DataTypes) => {
  const Events = sequelize.define('Events', {
    Data: {
      type: DataTypes.JSON,
      allowNull: false
      // unique: true
    },
    
  });


  return Events;
};