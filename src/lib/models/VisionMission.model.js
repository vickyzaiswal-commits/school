module.exports = (sequelize, DataTypes) => {
  const VisionMission = sequelize.define('VisionMission', {
    Data: {
      type: DataTypes.JSON,
      allowNull: false
      // unique: true
    },
    
  });


  return VisionMission;
};