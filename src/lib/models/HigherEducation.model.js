module.exports = (sequelize, DataTypes) => {
  const HigherEducation = sequelize.define('HigherEducation', {
    Data: {
      type: DataTypes.JSON,
      allowNull: false
      // unique: true
    },
    
  });


  return HigherEducation;
};