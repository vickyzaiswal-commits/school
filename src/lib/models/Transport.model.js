module.exports = (sequelize, DataTypes) => {
  const Transport = sequelize.define('Transport', {
    Data: {
      type: DataTypes.JSON,
      allowNull: false
      // unique: true
    },
    
  });


  return Transport;
};