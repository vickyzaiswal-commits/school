module.exports = (sequelize, DataTypes) => {
  const Notice = sequelize.define('Notice', {
    Data: {
      type: DataTypes.JSON,
      allowNull: false
      // unique: true
    },
  });


  return Notice;
};
    
