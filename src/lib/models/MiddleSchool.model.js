module.exports = (sequelize, DataTypes) => {
  const MiddleSchool = sequelize.define('MiddleSchool', {
    Data: {
      type: DataTypes.JSON,
      allowNull: false
      // unique: true
    },
  });


  return MiddleSchool;
};
    
