module.exports = (sequelize, DataTypes) => {
  const Arts = sequelize.define('Arts', {
    Data: {
      type: DataTypes.JSON,
      allowNull: false
      // unique: true
    },
    
  });


  return Arts;
};