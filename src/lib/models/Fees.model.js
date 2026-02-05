module.exports = (sequelize, DataTypes) => {
  const Fees = sequelize.define('Fees', {
    Data: {
      type: DataTypes.JSON,
      allowNull: false
      // unique: true
    },
    
  });


  return Fees;
};