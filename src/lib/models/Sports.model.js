module.exports = (sequelize, DataTypes) => {
  const Sports = sequelize.define('Sports', {
    Data: {
      type: DataTypes.JSON,
      allowNull: false
      // unique: true
    },
    
  });


  return Sports;
};