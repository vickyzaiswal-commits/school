module.exports = (sequelize, DataTypes) => {
  const Curriculum = sequelize.define('Curriculum', {
    Data: {
      type: DataTypes.JSON,
      allowNull: false
      // unique: true
    },
    
  });


  return Curriculum;
};