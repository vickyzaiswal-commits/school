module.exports = (sequelize, DataTypes) => {
  const FeeStructure = sequelize.define('FeeStructure', {
    Data: {
      type: DataTypes.JSON,
      allowNull: false
      // unique: true
    },
    
  });


  return FeeStructure;
};