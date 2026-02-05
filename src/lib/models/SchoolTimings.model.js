module.exports = (sequelize, DataTypes) => {
  const SchoolTimings = sequelize.define('SchoolTimings', {
    Data: {
      type: DataTypes.JSON,
      allowNull: false
      // unique: true
    },
  });


  return SchoolTimings;
};
    
