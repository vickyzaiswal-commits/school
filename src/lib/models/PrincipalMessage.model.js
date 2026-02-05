module.exports = (sequelize, DataTypes) => {
  const PrincipalMessage = sequelize.define('PrincipalMessage', {
    Data: {
      type: DataTypes.JSON,
      allowNull: false
      // unique: true
    },
  });


  return PrincipalMessage;
};
    
