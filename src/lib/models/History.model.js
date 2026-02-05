module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define('History', {
    Data: {
      type: DataTypes.JSON,
      allowNull: false
      // unique: true
    },
    
  });


  return History;
};