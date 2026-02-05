module.exports = (sequelize, DataTypes) => {
  const Competitions = sequelize.define('Competitions', {
    Data: {
      type: DataTypes.JSON,
      allowNull: false
      // unique: true
    },
    
  });


  return Competitions;
};