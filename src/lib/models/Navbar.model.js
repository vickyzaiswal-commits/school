module.exports = (sequelize, DataTypes) => {
  const Navbar = sequelize.define('Navbar', {
    Data: {
      type: DataTypes.JSON,
      allowNull: false
      // unique: true
    },
  });


  return Navbar;
};
    
