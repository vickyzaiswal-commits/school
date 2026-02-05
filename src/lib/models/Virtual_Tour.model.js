module.exports = (sequelize, DataTypes) => {
  const Virtual_Tour = sequelize.define('Virtual_Tour', {
    Data: {
      type: DataTypes.JSON,
      allowNull: false
      // unique: true
    },
    
  });


  return Virtual_Tour;
};