module.exports = (sequelize, DataTypes) => {
  const Careers = sequelize.define('Careers', {
    Data: {
      type: DataTypes.JSON,
      allowNull: false
      // unique: true
    },
    
  });


  return Careers;
};