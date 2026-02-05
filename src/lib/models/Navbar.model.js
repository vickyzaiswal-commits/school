module.exports = (sequelize, DataTypes) => {
  const Navbar = sequelize.define(
    'Navbar',
    {
      Data: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      tableName: 'navbars',
      freezeTableName: true,
      timestamps: false,
    }
  );

  return Navbar;
};
    
