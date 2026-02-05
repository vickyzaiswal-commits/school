module.exports = (sequelize, DataTypes) => {
  const Achievements = sequelize.define('Achievements', {
    Data: {
      type: DataTypes.JSON,
      allowNull: false
      // unique: true
    },
    
  });


  return Achievements;
};