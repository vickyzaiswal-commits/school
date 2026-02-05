module.exports = (sequelize, DataTypes) => {
  const Clubs = sequelize.define('Clubs', {
    Data: {
      type: DataTypes.JSON,
      allowNull: false
      // unique: true
    },
    
  });


  return Clubs;
};