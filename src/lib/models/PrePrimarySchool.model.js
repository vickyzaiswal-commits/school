module.exports = (sequelize, DataTypes) => {
  const PrePrimarySchool = sequelize.define('PrePrimarySchool', {
    Data: {
      type: DataTypes.JSON,
      allowNull: false
      // unique: true
    },
  });


  return PrePrimarySchool;
};
    
