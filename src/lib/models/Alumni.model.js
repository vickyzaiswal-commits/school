module.exports = (sequelize, DataTypes) => {
  const Alumni = sequelize.define('Alumni', {
    Data: {
      type: DataTypes.JSON,
      allowNull: false
      // unique: true
    },
    
  });


  return Alumni;
};