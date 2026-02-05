module.exports = (sequelize, DataTypes) => {
  const PrimarySchool = sequelize.define('PrimarySchool', {
    Data: {
      type: DataTypes.JSON,
      allowNull: false
      // unique: true
    },
  });


  return PrimarySchool;
};
    
