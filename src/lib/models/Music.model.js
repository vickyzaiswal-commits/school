module.exports = (sequelize, DataTypes) => {
  const Music = sequelize.define('Music', {
    Data: {
      type: DataTypes.JSON,
      allowNull: false
      // unique: true
    },
  });


  return Music;
};
    
