module.exports = (sequelize, DataTypes) => {
  const SchoolCalendar = sequelize.define('SchoolCalendar', {
    Data: {
      type: DataTypes.JSON,
      allowNull: false
      // unique: true
    },
    
  });


  return SchoolCalendar;
};