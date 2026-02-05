module.exports = (sequelize, DataTypes) => {
  const Syllabus = sequelize.define('Syllabus', {
    Data: {
      type: DataTypes.JSON,
      allowNull: false
      // unique: true
    },
    
  });


  return Syllabus;
};