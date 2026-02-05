module.exports = (sequelize, DataTypes) => {
  const Gallery = sequelize.define('Gallery', {
    Data: {
      type: DataTypes.JSON,
      allowNull: false
      // unique: true
    },
    
  });


  return Gallery;
};