module.exports = (sequelize, DataTypes) => {
  const SeniorSchool = sequelize.define('SeniorSchool', {
    Data: {
      type: DataTypes.JSON,
      allowNull: false
      // unique: true
    },
  });


  return SeniorSchool;
};
    
