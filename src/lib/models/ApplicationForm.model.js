module.exports = (sequelize, DataTypes) => {
  const ApplicationForm = sequelize.define('ApplicationForm', {
    Data: {
      type: DataTypes.JSON,
      allowNull: false
      // unique: true
    },
    
  });


  return ApplicationForm;
};