module.exports = (sequelize, DataTypes) => {
  const Council = sequelize.define('Council', {
    Data: {
      type: DataTypes.JSON,
      allowNull: false
      // unique: true
    },
    
  });


  return Council;
};