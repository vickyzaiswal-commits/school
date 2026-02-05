module.exports = (sequelize, DataTypes) => {
  const Home = sequelize.define('Home', {
    Data: {
      type: DataTypes.JSON,
      allowNull: false
      // unique: true
    },
    
  });


  return Home;
};