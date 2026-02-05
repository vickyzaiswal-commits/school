module.exports = (sequelize, DataTypes) => {
  const Policies = sequelize.define('Policies', {
    Data: {
      type: DataTypes.JSON,
      allowNull: false
      // unique: true
    },
  });


  return Policies;
};
    
