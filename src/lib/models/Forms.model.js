module.exports = (sequelize, DataTypes) => {
  const Forms = sequelize.define('Forms', {
    Data: {
      type: DataTypes.JSON,
      allowNull: false
      // unique: true
    },
    
  });


  return Forms;
};