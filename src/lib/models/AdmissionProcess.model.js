module.exports = (sequelize, DataTypes) => {
  const AdmissionProcess = sequelize.define('AdmissionProcess', {
    Data: {
      type: DataTypes.JSON,
      allowNull: false
      // unique: true
    },
    
  });


  return AdmissionProcess;
};